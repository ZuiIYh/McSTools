use std::path::{Path, PathBuf};
use std::process::Command;

use serde_json::Value;
use tauri::path::BaseDirectory;
use tauri::{AppHandle, Manager};

/// PATH 兜底时使用的可执行文件名
const DEFAULT_NODE: &str = if cfg!(windows) { "node.exe" } else { "node" };

/// 解析脚本目录。
///
/// `../scripts/**` 是 src-tauri **目录外**的资源，打包器会给它加 `_up_` 前缀，
/// 所以安装版落在 `<resource>/_up_/scripts/`，而**不是** `<resource>/scripts/`。
/// 以前只探测后者，探不到就退化到 `env!("CARGO_MANIFEST_DIR")`（编译期常量，
/// 指向构建机上的仓库路径，在用户机器上必然不存在）—— 面板于是报
/// 「找不到装载器脚本：D:\a\<repo>\<repo>\src-tauri\..\scripts\mod-list.mjs」。
fn scripts_dir(app: &AppHandle) -> Result<PathBuf, String> {
    /// 一个基准目录下的两种可能布局：`<base>/scripts` 与 `<base>/_up_/scripts`。
    ///
    /// ⚠️ `_up_` 必须**拆成两段** join —— `PathBuf::join("_up_/scripts")` 不会把 `/` 当分隔符，
    /// 而 Windows 的 verbatim(`\\?\`) 路径下 `/` 不被识别，会让 is_file() 假失败
    /// → 表现就是「读不出已装模组、也无法解析导入」（两个功能共用这条查找链路）。
    fn push_layouts(out: &mut Vec<PathBuf>, base: &Path) {
        out.push(base.join("scripts"));
        out.push(base.join("_up_").join("scripts"));
    }

    let mut candidates: Vec<PathBuf> = Vec::new();

    // ★ 每个来源都先 simplify_path 抹掉 Windows 的 `\\?\` 前缀：
    //   否则把 verbatim 路径交给 node 时，脚本里的 isMain 判定会失败 → 静默不执行、stdout 为空
    //   → 上层报「装载器脚本未返回 RESULT_JSON」（本次实测的真凶，见 simplify_path 注释）。
    if let Ok(directory) = app.path().resolve("scripts", BaseDirectory::Resource) {
        candidates.push(super::simplify_path(directory));
    }
    if let Ok(directory) = app.path().resolve("_up_", BaseDirectory::Resource) {
        candidates.push(super::simplify_path(directory).join("scripts"));
    }
    if let Ok(resource_dir) = app.path().resource_dir() {
        push_layouts(&mut candidates, &super::simplify_path(resource_dir));
    }
    // 少数打包布局会把资源放到可执行文件旁边
    if let Ok(exe) = std::env::current_exe() {
        if let Some(dir) = exe.parent() {
            push_layouts(&mut candidates, &super::simplify_path(dir.to_path_buf()));
        }
    }
    candidates.push(PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../scripts"));

    // 用哨兵文件确认目录里真有脚本，而不是恰好同名的空目录
    for candidate in &candidates {
        if candidate.join("mod-list.mjs").is_file() {
            return Ok(candidate.clone());
        }
    }

    Err(format!(
        "找不到装载器脚本目录（安装可能不完整，建议卸载后重新安装）。已尝试：{}",
        candidates
            .iter()
            .map(|candidate| candidate.display().to_string())
            .collect::<Vec<_>>()
            .join("、")
    ))
}

/// 解析 Node 可执行文件。
///
/// 顺序：`MCSTOOLS_NODE` 环境变量 → 随包分发的运行时 → 常见安装目录 → PATH 里的 `node`。
/// 之所以要探测常见安装目录：GUI 进程只继承父进程（资源管理器）的 PATH，
/// 用户刚装完 Node 但没重启资源管理器时，PATH 里可能还没有 node。
fn node_binary(app: &AppHandle) -> PathBuf {
    if let Some(explicit) = std::env::var_os("MCSTOOLS_NODE") {
        let candidate = PathBuf::from(explicit);
        if candidate.is_file() {
            return candidate;
        }
    }

    let mut candidates: Vec<PathBuf> = Vec::new();
    if let Ok(directory) = app.path().resource_dir() {
        let directory = super::simplify_path(directory);
        for name in ["node.exe", "node"] {
            candidates.push(directory.join("binaries").join(name));
            candidates.push(directory.join("_up_").join("binaries").join(name));
        }
    }
    for key in ["ProgramFiles", "ProgramFiles(x86)"] {
        if let Some(directory) = std::env::var_os(key) {
            candidates.push(PathBuf::from(directory).join("nodejs").join("node.exe"));
        }
    }
    if let Some(directory) = std::env::var_os("LOCALAPPDATA") {
        candidates.push(
            PathBuf::from(directory)
                .join("Programs")
                .join("nodejs")
                .join("node.exe"),
        );
    }
    for candidate in &candidates {
        if candidate.is_file() {
            return candidate.clone();
        }
    }

    PathBuf::from(DEFAULT_NODE)
}

/// 解析脚本 stdout 里最后一行 `RESULT_JSON=<json>`
fn parse_result_json(stdout: &str) -> Result<Value, String> {
    let line = stdout
        .lines()
        .rev()
        .find(|line| line.trim_start().starts_with("RESULT_JSON="))
        .ok_or_else(|| format!("装载器脚本未返回 RESULT_JSON：\n{stdout}"))?;
    let raw = line
        .trim_start()
        .strip_prefix("RESULT_JSON=")
        .unwrap_or(line);

    serde_json::from_str::<Value>(raw)
        .map_err(|e| format!("解析装载器返回结果失败：{e}\n原文：{raw}"))
}

/// 启动 `node <script> <args>`，从 stdout 中解析最后一行 `RESULT_JSON=` 作为结构化结果。
fn run_script(script: &str, args: &[String], app: &AppHandle) -> Result<Value, String> {
    let dir = scripts_dir(app)?;
    let script_path = dir.join(script);
    if !script_path.is_file() {
        return Err(format!("找不到装载器脚本：{}", script_path.display()));
    }

    let node = node_binary(app);
    let mut cmd = Command::new(&node);
    cmd.arg(&script_path);
    for a in args {
        cmd.arg(a);
    }
    // 把 Rust 侧已经解析好的路径喂给脚本：脚本自己按目录相对关系去猜，
    // 很容易在打包布局（`_up_`）下猜错（详情见 scripts/mod-shared.mjs 的注释）。
    cmd.env("MCSTOOLS_SCRIPTS_DIR", &dir);
    if let Ok(data_root) = super::resolve_data_root(app) {
        cmd.env("MCSTOOLS_DATA_ROOT", data_root);
    }

    let output = cmd.output().map_err(|e| {
        format!(
            "无法启动 Node.js（{}）：{e}\n模组装载依赖 Node.js 运行时，请安装 Node.js 18+ 并确保其在 PATH 中，\
             或设置环境变量 MCSTOOLS_NODE 指向 node 可执行文件。",
            node.display()
        )
    })?;

    let stdout = String::from_utf8_lossy(&output.stdout);
    let parsed = parse_result_json(&stdout);

    if !output.status.success() {
        // 脚本的失败原因通常以 `RESULT_JSON={"ok":false,"reason":...}` 打在 **stdout**。
        // 以前 exit != 0 时整段 stdout 被丢弃、只看 stderr，于是用户看到的是
        // 「装载器脚本 X 执行失败：」后面空空如也。这里优先提取结构化原因。
        if let Ok(value) = &parsed {
            if let Some(reason) = value
                .get("reason")
                .or_else(|| value.get("error"))
                .and_then(|v| v.as_str())
            {
                return Err(reason.to_string());
            }
        }
        let stderr = String::from_utf8_lossy(&output.stderr);
        let detail = if stderr.trim().is_empty() {
            stdout.trim().to_string()
        } else {
            stderr.trim().to_string()
        };
        return Err(format!("装载器脚本 {script} 执行失败：\n{detail}"));
    }

    parsed
}

/// 解析 jar/zip 而不写入（预览用）。返回方块列表、缺贴图列表与预估 modid。
#[tauri::command]
pub async fn preview_mod_pack(app: AppHandle, path: String) -> Result<Value, String> {
    let args = vec!["--jar".to_string(), path, "--dry-run".to_string()];
    tauri::async_runtime::spawn_blocking(move || run_script("mod-loader.mjs", &args, &app))
        .await
        .map_err(|e| e.to_string())?
}

/// 安装模组：解包 jar/zip，把方块注册进编辑器方块库并拷贝贴图。
#[tauri::command]
pub async fn install_mod_pack(app: AppHandle, path: String) -> Result<Value, String> {
    let args = vec!["--jar".to_string(), path, "--apply".to_string()];
    tauri::async_runtime::spawn_blocking(move || run_script("mod-loader.mjs", &args, &app))
        .await
        .map_err(|e| e.to_string())?
}

/// 列出所有已装载模组（含启用状态、方块数）。
#[tauri::command]
pub async fn list_mod_packs(app: AppHandle) -> Result<Value, String> {
    tauri::async_runtime::spawn_blocking(move || run_script("mod-list.mjs", &[], &app))
        .await
        .map_err(|e| e.to_string())?
}

/// 启用已安装但被禁用的模组（基于缓存，无需重新给 jar）。
#[tauri::command]
pub async fn enable_mod_pack(app: AppHandle, modid: String) -> Result<Value, String> {
    let args = vec![modid];
    tauri::async_runtime::spawn_blocking(move || run_script("mod-enable.mjs", &args, &app))
        .await
        .map_err(|e| e.to_string())?
}

/// 禁用模组：从编辑器方块库移除其方块，但保留缓存与清单（可随时重新启用）。
#[tauri::command]
pub async fn disable_mod_pack(app: AppHandle, modid: String) -> Result<Value, String> {
    let args = vec![modid];
    tauri::async_runtime::spawn_blocking(move || run_script("mod-disable.mjs", &args, &app))
        .await
        .map_err(|e| e.to_string())?
}

/// 卸载模组：彻底移除方块、缓存与清单，需重新 install 才能恢复。
#[tauri::command]
pub async fn uninstall_mod_pack(app: AppHandle, modid: String) -> Result<Value, String> {
    let args = vec![modid];
    tauri::async_runtime::spawn_blocking(move || run_script("mod-uninstall.mjs", &args, &app))
        .await
        .map_err(|e| e.to_string())?
}

/// 重新生成某个已装载模组的渲染数据（几何 + 图集 + 渲染判定 + 自检）。
/// 不需要重新提供 jar —— 直接用安装时缓存的资产重刷，秒级完成。
/// 用途：升级了生成逻辑、换过编辑器镜像、或发现方块渲染异常时原地修复。
#[tauri::command]
pub async fn refresh_mod_pack(app: AppHandle, modid: String) -> Result<Value, String> {
    let args = vec![modid];
    tauri::async_runtime::spawn_blocking(move || run_script("mod-rebuild.mjs", &args, &app))
        .await
        .map_err(|e| e.to_string())?
}

/// 重新生成**全部**已装载模组的渲染数据。换镜像 / 升级生成逻辑后一键全量重刷。
#[tauri::command]
pub async fn refresh_all_mod_packs(app: AppHandle) -> Result<Value, String> {
    let args = vec!["--all".to_string()];
    tauri::async_runtime::spawn_blocking(move || run_script("mod-rebuild.mjs", &args, &app))
        .await
        .map_err(|e| e.to_string())?
}

/// 基线镜像刷新后，在后台重套用所有「已启用」模组（从 `import/mods` 缓存重建，无需重新给 jar）。
///
/// `editor::ensure_user_data` 刷新用户层时，会把模组的网页覆盖层用基线覆盖掉；
/// 这里用缓存重放一遍补回来。放后台线程、失败只记日志，避免拖慢启动。
pub(crate) fn reapply_installed_mods(app: &AppHandle) {
    let app = app.clone();
    std::thread::spawn(move || {
        let dir = match scripts_dir(&app) {
            Ok(dir) => dir,
            Err(error) => {
                eprintln!("[mods] 刷新后重套用模组：{error}");
                return;
            }
        };
        let script = dir.join("apply-installed-mods.mjs");
        if !script.is_file() {
            eprintln!("[mods] 刷新后重套用模组：找不到 {}", script.display());
            return;
        }
        let mut cmd = Command::new(node_binary(&app));
        cmd.arg(&script);
        cmd.env("MCSTOOLS_SCRIPTS_DIR", &dir);
        if let Ok(root) = super::resolve_data_root(&app) {
            cmd.env("MCSTOOLS_DATA_ROOT", root);
        }
        match cmd.output() {
            Ok(output) => {
                let stdout = String::from_utf8_lossy(&output.stdout);
                let tail = stdout.lines().last().unwrap_or("").trim().to_string();
                eprintln!("[mods] 刷新后重套用模组完成：{tail}");
            }
            Err(error) => eprintln!("[mods] 刷新后重套用模组失败：{error}"),
        }
    });
}
