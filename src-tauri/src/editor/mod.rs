pub mod offline_server;
pub mod mods;

use std::fs;
use std::path::{Path, PathBuf};
use std::sync::Mutex;

use crate::data_files::files::FileManager;
use crate::database::db_apis::schematics_api::{find_schematic, list_previewable_schematics};
use crate::database::db_control::DatabaseState;
use offline_server::{Library, LibraryEntry, OfflineServer};
use tauri::path::BaseDirectory;
use tauri::{AppHandle, Manager, WebviewUrl, WebviewWindowBuilder};

pub const EDITOR_WINDOW_LABEL: &str = "editor";

pub struct EditorState {
    server: Mutex<Option<OfflineServer>>,
}

impl EditorState {
    pub fn new() -> Self {
        Self {
            server: Mutex::new(None),
        }
    }

    pub fn ensure_started(&self, app: &AppHandle) -> Result<String, String> {
        Ok(self.ensure_server(app)?.base_url())
    }

    pub fn ensure_server(&self, app: &AppHandle) -> Result<OfflineServer, String> {
        let mut guard = self.server.lock().unwrap_or_else(|error| error.into_inner());
        if let Some(server) = guard.as_ref() {
            return Ok(server.clone());
        }

        let root = resolve_web_root(app)?;
        let server = OfflineServer::start_with_library(root, Some(build_library(app)))
            .map_err(|error| format!("启动投影编辑器本地服务失败：{error}"))?;
        *guard = Some(server.clone());
        Ok(server)
    }
}

fn build_library(app: &AppHandle) -> Library {
    let list_handle = app.clone();
    let load_handle = app.clone();
    let save_handle = app.clone();

    Library::new(
        move || {
            let db = list_handle.state::<DatabaseState>();
            let Ok(mut conn) = db.0.get() else {
                return Vec::new();
            };
            list_previewable_schematics(&mut conn)
                .unwrap_or_default()
                .into_iter()
                .filter_map(|schematic| {
                    let extension = editor_extension(schematic.schematic_type)?;
                    Some(LibraryEntry {
                        id: schematic.id,
                        name: schematic.name,
                        extension: extension.to_string(),
                        size: format_size(&schematic.sizes),
                        updated_at: format_updated_at(&schematic.updated_at),
                    })
                })
                .collect()
        },
        move |id| {
            let source = schematic_source(&load_handle, id)?;
            let data = fs::read(&source.path).map_err(|error| {
                format!("读取蓝图文件失败（{}）：{error}", source.path.display())
            })?;
            Ok((source.file_name(), data))
        },
        move |id, data: &[u8]| {
            let source = schematic_source(&save_handle, id)?;
            write_schematic_file(&source.path, data)
        },
    )
}

struct SchematicSource {
    name: String,
    extension: &'static str,
    path: PathBuf,
}

impl SchematicSource {
    fn file_name(&self) -> String {
        format!("{}.{}", self.name, self.extension)
    }
}

fn schematic_source(app: &AppHandle, id: i64) -> Result<SchematicSource, String> {
    let db = app.state::<DatabaseState>();
    let file_manager = app.state::<FileManager>();

    let (name, version, sub_version, v_type) = {
        let mut conn = db.0.get().map_err(|error| error.to_string())?;
        let schematic = find_schematic(&mut conn, id).map_err(|error| error.to_string())?;
        (
            schematic.name,
            schematic.version,
            schematic.sub_type,
            schematic.schematic_type,
        )
    };

    let extension = editor_extension(v_type).ok_or_else(|| {
        String::from("投影编辑器只认 .schem / .litematic 两种格式，这份蓝图先转成其中一种再预览。")
    })?;

    let path = file_manager
        .schematic_dir(id)
        .map_err(|error| error.to_string())?
        .join(format!(
            "schematic_{version}.{sub_version}.{v_type}.{extension}"
        ));

    Ok(SchematicSource {
        name,
        extension,
        path,
    })
}

fn write_schematic_file(path: &Path, data: &[u8]) -> Result<String, String> {
    let backup = PathBuf::from(format!("{}.bak", path.display()));
    if path.is_file() {
        fs::copy(path, &backup)
            .map_err(|error| format!("备份原文件失败（{}）：{error}", backup.display()))?;
    }

    let temp = PathBuf::from(format!("{}.saving", path.display()));
    if let Err(error) = fs::write(&temp, data) {
        let _ = fs::remove_file(&temp);
        return Err(format!("写入蓝图文件失败（{}）：{error}", temp.display()));
    }
    if let Err(error) = fs::rename(&temp, path) {
        let _ = fs::remove_file(&temp);
        return Err(format!("替换蓝图文件失败（{}）：{error}", path.display()));
    }

    Ok(path.display().to_string())
}


fn format_size(sizes: &str) -> String {
    let parts = sizes.split(',').map(str::trim).collect::<Vec<_>>();
    if parts.len() == 3 && parts.iter().all(|part| part.parse::<i64>().is_ok()) {
        return format!("{} × {} × {}", parts[0], parts[1], parts[2]);
    }
    sizes.trim().to_string()
}


fn format_updated_at(value: &str) -> String {
    value.trim().replace('T', " ").chars().take(16).collect()
}

impl Default for EditorState {
    fn default() -> Self {
        Self::new()
    }
}


/// 打包**基线**数据目录（`data/`）—— 随安装包分发，只读。
///
/// 打包后 `data/**` 的位置取决于它是「src-tauri 目录内」还是「目录外」资源：
///   * 目录内资源 → `<resource>/data/...`
///   * 目录外资源（glob 以 `../` 开头）→ 打包器统一加 `_up_` 前缀，落在 `<resource>/_up_/data/...`
/// 所以两种布局都必须探测，并用哨兵文件确认目录真的可用（而不是恰好同名的空目录）。
pub fn base_data_root(app: &AppHandle) -> Result<PathBuf, String> {
    let mut candidates: Vec<PathBuf> = Vec::new();

    if let Ok(directory) = app.path().resolve("data", BaseDirectory::Resource) {
        candidates.push(directory);
    }
    if let Ok(directory) = app.path().resource_dir() {
        candidates.push(directory.join("data"));
        candidates.push(directory.join("_up_/data"));
    }
    candidates.push(PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("data"));

    for candidate in &candidates {
        if candidate.join("editor/web/index.html").is_file() {
            return Ok(candidate.clone());
        }
    }

    Err(format!(
        "找不到投影编辑器的数据目录（data/），已尝试：{}",
        candidates
            .iter()
            .map(|candidate| candidate.display().to_string())
            .collect::<Vec<_>>()
            .join("、")
    ))
}

/// **用户数据层**根目录（可写、升级保留）= `%APPDATA%/mcSchematic/data`。
///
/// 与 `db_control`、`files.rs` 用的是同一个基目录（`app_data_dir()/data`），
/// 只是多放一个 `editor/` 子树。模组与编辑器覆盖层全部写这里、不再写安装目录 ——
/// 既避免「升级重装丢用户模组」，也让只读挂载（如 Linux AppImage）下能正常工作，
/// 并且不再要求安装目录可写。
pub fn user_data_root(app: &AppHandle) -> Result<PathBuf, String> {
    app.path()
        .app_data_dir()
        .map(|dir| dir.join("data"))
        .map_err(|e| format!("无法获取用户数据目录：{e}"))
}

/// 递归复制（覆盖同名文件；**不删除**目标里多出来的文件 —— 用户模组缓存因此得以保留）。
fn copy_tree(src: &Path, dst: &Path) -> std::io::Result<()> {
    if !src.is_dir() {
        return Ok(());
    }
    fs::create_dir_all(dst)?;
    for entry in fs::read_dir(src)? {
        let entry = entry?;
        let from = entry.path();
        let to = dst.join(entry.file_name());
        if entry.file_type()?.is_dir() {
            copy_tree(&from, &to)?;
        } else {
            fs::copy(&from, &to)?;
        }
    }
    Ok(())
}

fn read_base_id(dir: &Path) -> String {
    fs::read_to_string(dir.join("base-id.txt"))
        .unwrap_or_default()
        .trim()
        .to_string()
}

/// 用户层里是否存在「非内置」的模组清单 —— 用于决定播种后是否需要重套用。
///
/// 内置的 `create` 已随基线应用过，不算；其余都要重放一遍才能回到 DB/图集里。
fn has_user_mods(user_editor: &Path) -> bool {
    let Ok(entries) = fs::read_dir(user_editor.join("import/mods")) else {
        return false;
    };
    entries.flatten().any(|entry| {
        let name = entry.file_name().to_string_lossy().to_string();
        name.ends_with(".manifest.json") && name != "create.manifest.json"
    })
}

/// 确保用户数据层可用：首启从基线**播种**；基线镜像指纹变化时**刷新**并后台重套用已启用模组。
///
/// 启动期调用一次即可（见 `lib.rs` 的 `setup`）。失败不致命，返回错误交给调用方记日志。
pub fn ensure_user_data(app: &AppHandle) -> Result<PathBuf, String> {
    let base = base_data_root(app)?;
    let user = user_data_root(app)?;
    let base_editor = base.join("editor");
    let user_editor = user.join("editor");

    if !user_editor.join("web/index.html").is_file() {
        // 首次运行：整棵 editor/ 播种到用户层（含 base-id.txt）
        copy_tree(&base_editor, &user_editor).map_err(|e| {
            format!(
                "播种编辑器数据到用户目录失败（{}）：{e}",
                user_editor.display()
            )
        })?;
        // 过渡场景：旧版把模组写在安装目录。NSIS/wiX 卸载只删「清单内」文件，
        // 删不到用户自装的 import/mods/<modid>，于是升级后它们仍在基线里 → 已被播种进用户层。
        // 但方块尚未进 DB/图集，这里补一次重套用把它们恢复回来。
        if has_user_mods(&user_editor) {
            mods::reapply_installed_mods(app);
        }
        return Ok(user);
    }

    // 已播种：仅当基线镜像指纹变化时才刷新。
    // 若每次小版本升级都刷新，会白拷 51MB/8700 文件、并把模组的网页覆盖层重置掉。
    let base_id = read_base_id(&base_editor);
    let user_id = read_base_id(&user_editor);
    if !base_id.is_empty() && base_id != user_id {
        copy_tree(&base_editor, &user_editor).map_err(|e| format!("刷新编辑器镜像失败：{e}"))?;
        // 刷新会覆盖用户模组的网页覆盖层，但 import/mods 缓存仍在 → 后台重套用（不阻塞启动）
        mods::reapply_installed_mods(app);
    }
    Ok(user)
}

/// 编辑器数据目录（读写）：优先**用户层**；用户层尚未播种时退回基线（只读兜底）。
pub fn resolve_data_root(app: &AppHandle) -> Result<PathBuf, String> {
    if let Ok(user) = user_data_root(app) {
        if user.join("editor/web/index.html").is_file() {
            return Ok(user);
        }
    }
    base_data_root(app)
}

fn resolve_web_root(app: &AppHandle) -> Result<PathBuf, String> {
    resolve_data_root(app).map(|root| root.join("editor/web"))
}


#[tauri::command]
pub async fn editor_url(
    app: AppHandle,
    state: tauri::State<'_, EditorState>,
) -> Result<String, String> {
    state.ensure_started(&app)
}











fn open_editor_window(app: &AppHandle, url: &str) -> Result<(), String> {
    let parsed = tauri::Url::parse(url).map_err(|error| format!("编辑器地址解析失败：{error}"))?;

    if let Some(window) = app.get_webview_window(EDITOR_WINDOW_LABEL) {
        let _ = window.navigate(parsed);
        let _ = window.unminimize();
        let _ = window.show();
        let _ = window.set_focus();
        return Ok(());
    }

    WebviewWindowBuilder::new(app, EDITOR_WINDOW_LABEL, WebviewUrl::External(parsed))
        .title("McSTools 投影编辑器")
        .inner_size(1440.0, 880.0)
        .min_inner_size(960.0, 620.0)
        .center()
        .build()
        .map_err(|error| format!("打开编辑器窗口失败：{error}"))?;

    Ok(())
}


#[tauri::command]
pub async fn open_editor(
    app: AppHandle,
    state: tauri::State<'_, EditorState>,
) -> Result<String, String> {
    let url = state.ensure_started(&app)?;
    open_editor_window(&app, &url)?;
    Ok(url)
}





#[tauri::command]
pub async fn open_editor_for_schematic(
    app: AppHandle,
    state: tauri::State<'_, EditorState>,
    id: i64,
) -> Result<String, String> {
    let url = projection_url(&app, state.inner(), id)?;
    open_editor_window(&app, &url)?;
    Ok(url)
}





fn editor_extension(v_type: i32) -> Option<&'static str> {
    match v_type {
        2 => Some("litematic"),
        3 => Some("schem"),
        _ => None,
    }
}






#[tauri::command]
pub async fn editor_url_for_schematic(
    app: AppHandle,
    state: tauri::State<'_, EditorState>,
    id: i64,
) -> Result<String, String> {
    projection_url(&app, state.inner(), id)
}




fn projection_url(app: &AppHandle, state: &EditorState, id: i64) -> Result<String, String> {
    let source = schematic_source(app, id)?;
    let data = fs::read(&source.path)
        .map_err(|error| format!("读取蓝图文件失败（{}）：{error}", source.path.display()))?;

    let server = state.ensure_server(app)?;
    
    let key = server.register_projection_for_schematic(&source.file_name(), data, id)?;
    Ok(server.open_url(&key, &source.name))
}

#[cfg(test)]
mod tests {
    use super::{copy_tree, read_base_id, write_schematic_file};
    use std::fs;

    
    #[test]
    fn backs_up_the_old_file_before_overwriting_it() {
        let dir = std::env::temp_dir().join(format!(
            "mcstools-editor-save-{}",
            std::process::id()
        ));
        let _ = fs::remove_dir_all(&dir);
        fs::create_dir_all(&dir).expect("建临时目录");

        let path = dir.join("schematic_1.0.2.litematic");
        fs::write(&path, b"old-bytes").expect("写原文件");

        let written = write_schematic_file(&path, b"new-bytes").expect("写回源文件");
        assert_eq!(written, path.display().to_string());
        assert_eq!(fs::read(&path).expect("读新文件"), b"new-bytes");
        assert_eq!(
            fs::read(dir.join("schematic_1.0.2.litematic.bak")).expect("读备份"),
            b"old-bytes",
            "覆盖前必须把原内容留成 .bak"
        );
        assert!(
            !dir.join("schematic_1.0.2.litematic.saving").exists(),
            "临时文件要收干净"
        );

        
        let fresh = dir.join("schematic_1.0.3.schem");
        assert!(write_schematic_file(&fresh, b"brand-new").is_ok());
        assert_eq!(fs::read(&fresh).expect("读新文件"), b"brand-new");

        let _ = fs::remove_dir_all(&dir);
    }

    #[test]
    fn seeding_overwrites_base_files_but_keeps_user_mods() {
        let root = std::env::temp_dir().join(format!("mcstools-seed-{}", std::process::id()));
        let _ = fs::remove_dir_all(&root);
        let base = root.join("base/editor");
        let user = root.join("user/editor");

        fs::create_dir_all(base.join("web")).expect("建基线");
        fs::write(base.join("web/index.html"), b"base-index").expect("写基线页");
        fs::write(base.join("base-id.txt"), b"v2").expect("写基线指纹");

        // 用户层：一个自定义模组缓存（基线里没有）+ 一份被模组改过的 index
        fs::create_dir_all(user.join("import/mods/mymod")).expect("建用户模组");
        fs::write(user.join("import/mods/mymod/cache.bin"), b"user-cache").expect("写用户缓存");
        fs::create_dir_all(user.join("web")).expect("建用户 web");
        fs::write(user.join("web/index.html"), b"modified-by-mod").expect("写被改页");
        fs::write(user.join("base-id.txt"), b"v1").expect("写旧指纹");

        // 模拟「指纹变化 → 刷新」：整棵 editor 覆盖过去
        copy_tree(&base, &user).expect("刷新复制");

        assert_eq!(
            fs::read(user.join("web/index.html")).expect("读 index"),
            b"base-index",
            "基线文件必须被覆盖回最新"
        );
        assert_eq!(
            fs::read(user.join("import/mods/mymod/cache.bin")).expect("读用户缓存"),
            b"user-cache",
            "用户模组缓存不能被删（刷新是覆盖式、不删多余文件）"
        );
        assert_eq!(read_base_id(&user), "v2", "指纹要跟进基线，下轮不再重复刷新");

        let _ = fs::remove_dir_all(&root);
    }
}
