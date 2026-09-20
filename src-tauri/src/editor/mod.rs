pub mod offline_server;

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


fn resolve_web_root(app: &AppHandle) -> Result<PathBuf, String> {
    let mut candidates: Vec<PathBuf> = Vec::new();

    if let Ok(directory) = app
        .path()
        .resolve("data/editor/web", BaseDirectory::Resource)
    {
        candidates.push(directory);
    }
    if let Ok(directory) = app.path().resource_dir() {
        candidates.push(directory.join("data/editor/web"));
        candidates.push(directory.join("_up_/data/editor/web"));
    }
    candidates.push(PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("data/editor/web"));

    for candidate in &candidates {
        if candidate.join("index.html").is_file() {
            return Ok(candidate.clone());
        }
    }

    Err(format!(
        "找不到投影编辑器的站点资源，已尝试：{}",
        candidates
            .iter()
            .map(|candidate| candidate.display().to_string())
            .collect::<Vec<_>>()
            .join("、")
    ))
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
    use super::write_schematic_file;
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
}
