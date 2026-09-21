use std::path::PathBuf;
use std::process::Command;

use serde_json::Value;
use tauri::{AppHandle, Manager};

/// 解析脚本目录：开发期在 CARGO_MANIFEST_DIR/../scripts，打包后落在资源目录的 scripts/ 下。
fn scripts_dir(app: &AppHandle) -> PathBuf {
    if let Ok(resource_dir) = app.path().resource_dir() {
        let cand = resource_dir.join("scripts");
        if cand.is_dir() {
            return cand;
        }
    }
    PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../scripts")
}

/// 启动 `node <script> <args>`，从 stdout 中解析最后一行 `RESULT_JSON=` 作为结构化结果。
fn run_script(script: &str, args: &[String], app: &AppHandle) -> Result<Value, String> {
    let dir = scripts_dir(app);
    let script_path = dir.join(script);
    if !script_path.is_file() {
        return Err(format!("找不到装载器脚本：{}", script_path.display()));
    }

    let mut cmd = Command::new("node");
    cmd.arg(&script_path);
    for a in args {
        cmd.arg(a);
    }

    let output = cmd
        .output()
        .map_err(|e| format!("无法启动 Node.js：{e}（请确认系统已安装 Node.js 并位于 PATH 中）"))?;

    if !output.status.success() {
        return Err(format!(
            "装载器脚本 {script} 执行失败：\n{}",
            String::from_utf8_lossy(&output.stderr)
        ));
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    let json_line = stdout
        .lines()
        .rev()
        .find(|line| line.trim_start().starts_with("RESULT_JSON="))
        .ok_or_else(|| format!("装载器脚本未返回 RESULT_JSON：\n{stdout}"))?;
    let json_str = json_line
        .trim_start()
        .strip_prefix("RESULT_JSON=")
        .unwrap_or(json_line);

    serde_json::from_str::<Value>(json_str)
        .map_err(|e| format!("解析装载器返回结果失败：{e}\n原文：{json_str}"))
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
