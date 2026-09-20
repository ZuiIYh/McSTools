use std::collections::HashMap;
use std::fs;
use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::path::{Path, PathBuf};
use std::sync::{Arc, Mutex};
use std::time::{Duration, SystemTime, UNIX_EPOCH};

const MAX_HEAD_BYTES: usize = 128 * 1024;
const MAX_BODY_BYTES: usize = 200 * 1024 * 1024;
const READ_TIMEOUT: Duration = Duration::from_secs(15);
const WRITE_TIMEOUT: Duration = Duration::from_secs(30);
const WORKER_THREADS: usize = 16;
const QUEUE_CAPACITY: usize = 128;

#[derive(Clone)]
pub struct OfflineServer {
    port: u16,
    shared: Arc<Shared>,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct LibraryEntry {
    pub id: i64,
    pub name: String,
    pub extension: String,
    pub size: String,
    pub updated_at: String,
}

#[derive(Clone)]
pub struct Library {
    list: Arc<dyn Fn() -> Vec<LibraryEntry> + Send + Sync>,
    load: Arc<dyn Fn(i64) -> Result<(String, Vec<u8>), String> + Send + Sync>,
    save: Arc<dyn Fn(i64, &[u8]) -> Result<String, String> + Send + Sync>,
}

impl Library {
    pub fn new(
        list: impl Fn() -> Vec<LibraryEntry> + Send + Sync + 'static,
        load: impl Fn(i64) -> Result<(String, Vec<u8>), String> + Send + Sync + 'static,
        save: impl Fn(i64, &[u8]) -> Result<String, String> + Send + Sync + 'static,
    ) -> Self {
        Self {
            list: Arc::new(list),
            load: Arc::new(load),
            save: Arc::new(save),
        }
    }

    fn entries(&self) -> Vec<LibraryEntry> {
        (self.list)()
    }

    fn read(&self, id: i64) -> Result<(String, Vec<u8>), String> {
        (self.load)(id)
    }

    fn write(&self, id: i64, data: &[u8]) -> Result<String, String> {
        (self.save)(id, data)
    }
}

struct Shared {
    root: PathBuf,
    uploads: Mutex<HashMap<String, Uploaded>>,
    last_origin_key: Mutex<Option<String>>,
    library: Option<Library>,
}

struct Uploaded {
    data: Vec<u8>,
    extension: String,
    file_name: String,
    origin: Option<i64>,
}

struct Request {
    method: String,
    target: String,
    headers: HashMap<String, String>,
    body: Vec<u8>,
}

impl OfflineServer {
    pub fn start_with_library(
        root: impl Into<PathBuf>,
        library: Option<Library>,
    ) -> std::io::Result<Self> {
        let root = root.into();
        let listener = TcpListener::bind(("127.0.0.1", 0))?;
        let port = listener.local_addr()?.port();

        let shared = Arc::new(Shared {
            root: root.clone(),
            uploads: Mutex::new(HashMap::new()),
            last_origin_key: Mutex::new(None),
            library,
        });

        
        
        let (sender, receiver) = std::sync::mpsc::sync_channel::<TcpStream>(QUEUE_CAPACITY);
        let receiver = Arc::new(Mutex::new(receiver));

        for index in 0..WORKER_THREADS {
            let shared = Arc::clone(&shared);
            let receiver = Arc::clone(&receiver);
            std::thread::Builder::new()
                .name(format!("editor-offline-worker-{index}"))
                .spawn(move || loop {
                    
                    let next = {
                        let guard = receiver.lock().unwrap_or_else(|error| error.into_inner());
                        guard.recv()
                    };
                    match next {
                        Ok(stream) => {
                            if let Err(error) = serve_client(stream, &shared) {
                                log_line(&format!("connection error: {error}"));
                            }
                        }
                        
                        Err(_) => break,
                    }
                })?;
        }

        std::thread::Builder::new()
            .name("editor-offline-accept".to_string())
            .spawn(move || {
                for incoming in listener.incoming() {
                    match incoming {
                        Ok(stream) => {
                            if sender.send(stream).is_err() {
                                break;
                            }
                        }
                        Err(error) => {
                            log_line(&format!("accept error: {error}"));
                            std::thread::sleep(Duration::from_millis(20));
                        }
                    }
                }
            })?;

        log_line(&format!("listening on http://127.0.0.1:{port}/"));
        Ok(Self { port, shared })
    }

    #[cfg(test)]
    pub fn port(&self) -> u16 {
        self.port
    }

    pub fn base_url(&self) -> String {
        format!("http://127.0.0.1:{}/", self.port)
    }

    
    
    
    
    
    
    
    
    #[cfg(test)]
    pub fn register_projection(&self, file_name: &str, data: Vec<u8>) -> Result<String, String> {
        store_upload(&self.shared, file_name, data, None)
    }

    pub fn register_projection_for_schematic(
        &self,
        file_name: &str,
        data: Vec<u8>,
        id: i64,
    ) -> Result<String, String> {
        store_upload(&self.shared, file_name, data, Some(id))
    }

    pub fn open_url(&self, key: &str, display_name: &str) -> String {
        format!(
            "{}/local/open?key={}&name={}",
            self.base_url().trim_end_matches('/'),
            escape_data_string(key),
            escape_data_string(display_name)
        )
    }
}

fn store_upload(
    shared: &Shared,
    file_name: &str,
    data: Vec<u8>,
    origin: Option<i64>,
) -> Result<String, String> {
    let prepared = prepare_upload(file_name, data)?;
    let key = prepared.key.clone();
    let mut uploads = shared.uploads.lock().unwrap_or_else(|error| error.into_inner());
    uploads.insert(
        key.clone(),
        Uploaded {
            data: prepared.data,
            extension: prepared.extension,
            file_name: prepared.file_name,
            origin,
        },
    );
    Ok(key)
}

fn store_last_origin_key(shared: &Shared, key: &str) {
    let mut guard = shared
        .last_origin_key
        .lock()
        .unwrap_or_else(|error| error.into_inner());
    *guard = Some(key.to_string());
}

fn serve_client(mut stream: TcpStream, shared: &Shared) -> std::io::Result<()> {
    let _ = stream.set_nodelay(true);
    let _ = stream.set_read_timeout(Some(READ_TIMEOUT));
    let _ = stream.set_write_timeout(Some(WRITE_TIMEOUT));

    let request = match read_request(&mut stream)? {
        Some(request) => request,
        None => {
            log_line("empty/aborted request");
            return Ok(());
        }
    };

    log_line(&format!("{} {}", request.method, request.target));
    respond(&mut stream, shared, &request)
}

fn read_request(stream: &mut TcpStream) -> std::io::Result<Option<Request>> {
    let mut buffer: Vec<u8> = Vec::with_capacity(8192);
    let mut chunk = [0u8; 4096];

    let head_end = loop {
        if let Some(position) = find_subsequence(&buffer, b"\r\n\r\n") {
            break position + 4;
        }
        if buffer.len() > MAX_HEAD_BYTES {
            return Ok(None);
        }
        let read = stream.read(&mut chunk)?;
        if read == 0 {
            return Ok(None);
        }
        buffer.extend_from_slice(&chunk[..read]);
    };

    let head_text = String::from_utf8_lossy(&buffer[..head_end - 4]).into_owned();
    let mut lines = head_text.split("\r\n");
    let request_line = match lines.next() {
        Some(line) if !line.is_empty() => line,
        _ => return Ok(None),
    };

    let mut parts = request_line.split(' ');
    let (method, target) = match (parts.next(), parts.next()) {
        (Some(method), Some(target)) if !method.is_empty() && !target.is_empty() => (method, target),
        _ => return Ok(None),
    };

    let mut headers: HashMap<String, String> = HashMap::new();
    for line in lines {
        if let Some(colon) = line.find(':') {
            let key = line[..colon].trim().to_ascii_lowercase();
            let value = line[colon + 1..].trim().to_string();
            if !key.is_empty() {
                headers.entry(key).or_insert(value);
            }
        }
    }

    let content_length = headers
        .get("content-length")
        .and_then(|value| value.parse::<usize>().ok())
        .unwrap_or(0);
    if content_length > MAX_BODY_BYTES {
        return Ok(None);
    }

    let mut body = buffer[head_end..].to_vec();
    while body.len() < content_length {
        let mut rest = [0u8; 8192];
        let read = stream.read(&mut rest)?;
        if read == 0 {
            return Ok(None);
        }
        body.extend_from_slice(&rest[..read]);
    }
    body.truncate(content_length);

    Ok(Some(Request {
        method: method.to_ascii_uppercase(),
        target: target.to_string(),
        headers,
        body,
    }))
}

fn respond(stream: &mut TcpStream, shared: &Shared, request: &Request) -> std::io::Result<()> {
    let (raw_path, query) = split_target(&request.target);
    let path = percent_decode(&raw_path);
    let head_only = request.method == "HEAD";

    if request.method == "POST" && path.eq_ignore_ascii_case("/local/upload") {
        return handle_upload(stream, &query, &request.body, shared);
    }

    if path.eq_ignore_ascii_case("/local/open") {
        return handle_local_open(stream, &query, shared, head_only);
    }

    if path.eq_ignore_ascii_case("/local/schematics") {
        return handle_library_list(stream, shared, head_only);
    }

    if path.eq_ignore_ascii_case("/local/open-schematic") {
        return handle_library_open(stream, &query, shared, head_only);
    }

    if path.eq_ignore_ascii_case("/local/save-target") {
        return handle_save_target(stream, &query, shared, head_only);
    }
    if starts_with_ignore_ascii_case(&path, "/api/studio/works").is_some() {
        return handle_works(
            stream,
            &request.method,
            &path,
            &query,
            &request.body,
            shared,
            head_only,
        );
    }

    if starts_with_ignore_ascii_case(&path, "/api/").is_some() {
        let (status, payload) = api_stub(&path);
        return write_response(
            stream,
            status,
            payload.as_bytes(),
            "application/json; charset=utf-8",
            head_only,
            &[],
        );
    }

    if request.method != "GET" && request.method != "HEAD" {
        return write_response(
            stream,
            405,
            b"{\"success\":false}",
            "application/json; charset=utf-8",
            false,
            &[],
        );
    }

    if is_rsc_request(&request.headers, &query) {
        return write_response(
            stream,
            500,
            b"",
            "text/x-component; charset=utf-8",
            head_only,
            &[],
        );
    }

    if is_studio_landing(&path) {
        return serve_entry_page(stream, shared, head_only);
    }

    if let Some(name) = starts_with_ignore_ascii_case(&path, "/local-files/") {
        let uploaded = {
            let uploads = shared.uploads.lock().unwrap_or_else(|error| error.into_inner());
            uploads
                .get(name)
                .map(|item| (item.data.clone(), item.extension.clone(), item.origin))
        };
        return match uploaded {
            Some((data, extension, origin)) => {
                if origin.is_some() {
                    store_last_origin_key(shared, name);
                }
                let content_type = content_type_for(name, &data);
                write_response(
                    stream,
                    200,
                    &data,
                    content_type,
                    head_only,
                    &[("X-File-Extension", extension)],
                )
            }
            None => write_response(
                stream,
                404,
                b"{\"success\":false}",
                "application/json; charset=utf-8",
                head_only,
                &[],
            ),
        };
    }

    let key = path.trim_start_matches('/');
    let resolved = resolve_file(&shared.root, key);
    match resolved {
        Some((file_path, resolved_key)) => match fs::read(&file_path) {
            Ok(data) => {
                let content_type = content_type_for(&resolved_key, &data);
                if content_type.starts_with("text/html") {
                    let html = inject_offline_patch(&String::from_utf8_lossy(&data));
                    return write_response(
                        stream,
                        200,
                        html.as_bytes(),
                        content_type,
                        head_only,
                        &[],
                    );
                }
                write_response(stream, 200, &data, content_type, head_only, &[])
            }
            Err(error) => {
                log_line(&format!("read {} failed: {error}", file_path.display()));
                let page = offline_page(&path);
                write_response(
                    stream,
                    404,
                    page.as_bytes(),
                    "text/html; charset=utf-8",
                    head_only,
                    &[],
                )
            }
        },
        None => {
            let page = offline_page(&path);
            write_response(
                stream,
                404,
                page.as_bytes(),
                "text/html; charset=utf-8",
                head_only,
                &[],
            )
        }
    }
}






fn handle_local_open(
    stream: &mut TcpStream,
    query: &str,
    shared: &Shared,
    head_only: bool,
) -> std::io::Result<()> {
    let mut key = String::new();
    let mut display_name = String::new();
    for pair in query.split('&') {
        let Some(equals) = pair.find('=') else {
            continue;
        };
        let name = &pair[..equals];
        let value = percent_decode(&pair[equals + 1..]);
        if name.eq_ignore_ascii_case("key") {
            key = value;
        } else if name.eq_ignore_ascii_case("name") {
            display_name = value;
        }
    }

    let exists = {
        let uploads = shared.uploads.lock().unwrap_or_else(|error| error.into_inner());
        uploads.contains_key(&key)
    };

    if !exists {
        return write_error_page(
            stream,
            "这份投影已经不在本地服务里了（服务重启过，或者蓝图已被删除），请重新打开一次预览。",
            head_only,
        );
    }

    let page = open_shim_page(&key, &display_name);
    write_response(
        stream,
        200,
        page.as_bytes(),
        "text/html; charset=utf-8",
        head_only,
        &[],
    )
}

fn handle_library_list(
    stream: &mut TcpStream,
    shared: &Shared,
    head_only: bool,
) -> std::io::Result<()> {
    let payload = match shared.library.as_ref() {
        Some(library) => {
            let items = library
                .entries()
                .iter()
                .map(|entry| {
                    format!(
                        "{{\"id\":{},\"name\":{},\"extension\":{},\"size\":{},\"updatedAt\":{}}}",
                        entry.id,
                        json_string(&entry.name),
                        json_string(&entry.extension),
                        json_string(&entry.size),
                        json_string(&entry.updated_at),
                    )
                })
                .collect::<Vec<_>>()
                .join(",");
            format!("{{\"success\":true,\"data\":[{items}]}}")
        }
        None => String::from("{\"success\":false,\"error\":\"本地蓝图库不可用\"}"),
    };

    write_response(
        stream,
        200,
        payload.as_bytes(),
        "application/json; charset=utf-8",
        head_only,
        &[],
    )
}

fn handle_library_open(
    stream: &mut TcpStream,
    query: &str,
    shared: &Shared,
    head_only: bool,
) -> std::io::Result<()> {
    let mut raw_id = String::new();
    for pair in query.split('&') {
        let Some(equals) = pair.find('=') else {
            continue;
        };
        if pair[..equals].eq_ignore_ascii_case("id") {
            raw_id = percent_decode(&pair[equals + 1..]);
            break;
        }
    }

    let Some(library) = shared.library.as_ref() else {
        return write_error_page(
            stream,
            "本地蓝图库不可用：这个离线服务是独立启动的，没接上 McSTools 的蓝图库。",
            head_only,
        );
    };

    let Ok(id) = raw_id.trim().parse::<i64>() else {
        return write_error_page(stream, "蓝图编号不对，请回到导入页重新选一份。", head_only);
    };

    let (file_name, data) = match library.read(id) {
        Ok(read) => read,
        Err(message) => return write_error_page(stream, &message, head_only),
    };

    let display_name = file_name
        .rsplit_once('.')
        .map(|(stem, _)| stem.to_string())
        .unwrap_or_else(|| file_name.clone());

    let key = match store_upload(shared, &file_name, data, Some(id)) {
        Ok(key) => key,
        Err(message) => return write_error_page(stream, &message, head_only),
    };

    let page = open_shim_page(&key, &display_name);
    write_response(
        stream,
        200,
        page.as_bytes(),
        "text/html; charset=utf-8",
        head_only,
        &[],
    )
}

fn is_studio_landing(path: &str) -> bool {
    let trimmed = path.trim_end_matches('/');
    trimmed.eq_ignore_ascii_case("/studio") || trimmed.eq_ignore_ascii_case("/studio/index.html")
}

fn serve_entry_page(
    stream: &mut TcpStream,
    shared: &Shared,
    head_only: bool,
) -> std::io::Result<()> {
    let entry = shared.root.join("index.html");
    match fs::read(&entry) {
        Ok(data) => {
            let html = inject_offline_patch(&String::from_utf8_lossy(&data));
            write_response(
                stream,
                200,
                html.as_bytes(),
                "text/html; charset=utf-8",
                head_only,
                &[],
            )
        }
        Err(error) => {
            log_line(&format!("read {} failed: {error}", entry.display()));
            let page = offline_page("/studio");
            write_response(
                stream,
                404,
                page.as_bytes(),
                "text/html; charset=utf-8",
                head_only,
                &[],
            )
        }
    }
}









fn scrub_analytics_ids(html: &str) -> String {
    
    
    const GA_ID_PREFIXES: [&str; 2] = [r#"\"gaId\":\""#, "\"gaId\":\""];
    const NOOP_QUERY: &str = "__offline-noop.js?id=";

    let mut out = blank_value_after(html, &GA_ID_PREFIXES);
    out = blank_value_after(&out, &[NOOP_QUERY]);
    out
}





fn blank_value_after(html: &str, prefixes: &[&str]) -> String {
    let mut out = String::with_capacity(html.len());
    let mut rest = html;
    loop {
        let hit = prefixes
            .iter()
            .filter_map(|prefix| rest.find(prefix).map(|index| (index, *prefix)))
            .min_by_key(|entry| entry.0);
        let Some((index, prefix)) = hit else { break };

        let mut cut = index + prefix.len();
        if prefix.ends_with("?id=") {
            cut -= "?id=".len();
        }
        out.push_str(&rest[..cut]);

        let tail = &rest[cut..];
        match tail.find('"') {
            Some(close) => {
                
                
                let quote_start = if close > 0 && tail.as_bytes()[close - 1] == b'\\' {
                    close - 1
                } else {
                    close
                };
                out.push_str(&tail[quote_start..close + 1]);
                rest = &tail[close + 1..];
            }
            None => {
                out.push_str(tail);
                rest = "";
                break;
            }
        }
    }
    out.push_str(rest);
    out
}









fn scrub_identity_metadata(html: &str) -> String {
    let prefixes = identity_meta_prefixes();
    let borrowed = prefixes.iter().map(String::as_str).collect::<Vec<_>>();
    let out = blank_value_after(html, &borrowed);
    blank_json_ld_payloads(&out)
}





fn identity_meta_prefixes() -> Vec<String> {
    const NAME_KEYS: [&str; 16] = [
        "description",
        "application-name",
        "author",
        "creator",
        "publisher",
        "keywords",
        "wxcard-title",
        "wxcard-desc",
        "wxcard-image",
        "baidu-site-verification",
        "msvalidate.01",
        "google-site-verification",
        "twitter:card",
        "twitter:title",
        "twitter:description",
        "twitter:image",
    ];
    const PROPERTY_KEYS: [&str; 13] = [
        "og:title",
        "og:description",
        "og:url",
        "og:site_name",
        "og:locale",
        "og:type",
        "og:image",
        "og:image:url",
        "og:image:secure_url",
        "og:image:type",
        "og:image:width",
        "og:image:height",
        "og:image:alt",
    ];

    let mut out = Vec::new();
    for (attribute, keys) in [("name", &NAME_KEYS[..]), ("property", &PROPERTY_KEYS[..])] {
        for key in keys {
            
            out.push(format!("\\\"{attribute}\\\":\\\"{key}\\\",\\\"content\\\":\\\""));
            
            out.push(format!("\"{attribute}\":\"{key}\",\"content\":\""));
            
            out.push(format!("{attribute}=\"{key}\" content=\""));
        }
    }
    out.push(String::from("\\\"rel\\\":\\\"canonical\\\",\\\"href\\\":\\\""));
    out.push(String::from("\"rel\":\"canonical\",\"href\":\""));
    out.push(String::from("rel=\"canonical\" href=\""));
    out
}








fn blank_json_ld_payloads(html: &str) -> String {
    const ANCHOR: &str = "application/ld+json";
    const KEY: &str = "__html";
    
    const WINDOW: usize = 200;

    let mut out = String::with_capacity(html.len());
    let mut rest = html;
    loop {
        let Some(anchor) = rest.find(ANCHOR) else { break };
        let after_anchor = anchor + ANCHOR.len();

        
        
        let span = rest[after_anchor..]
            .find(KEY)
            .filter(|key_rel| *key_rel < WINDOW)
            .and_then(|key_rel| {
                let after_key = after_anchor + key_rel + KEY.len();
                json_string_span(&rest[after_key..])
                    .map(|(start, end)| (after_key + start, after_key + end))
            });

        match span {
            Some((value_start, value_end)) => {
                out.push_str(&rest[..value_start]);
                rest = &rest[value_end..];
            }
            None => {
                
                out.push_str(&rest[..after_anchor]);
                rest = &rest[after_anchor..];
            }
        }
    }
    out.push_str(rest);
    out
}





fn json_string_span(after_key: &str) -> Option<(usize, usize)> {
    let bytes = after_key.as_bytes();
    let mut index = 0;

    
    while index < bytes.len() && bytes[index] == b'\\' {
        index += 1;
    }
    if bytes.get(index) != Some(&b'"') {
        return None;
    }
    index += 1;

    
    while index < bytes.len()
        && (bytes[index] == b'\\' || bytes[index].is_ascii_whitespace())
    {
        index += 1;
    }
    if bytes.get(index) != Some(&b':') {
        return None;
    }
    index += 1;

    
    let mut opener_run = 0usize;
    while index < bytes.len() && bytes[index] == b'\\' {
        opener_run += 1;
        index += 1;
    }
    if bytes.get(index) != Some(&b'"') {
        return None;
    }
    index += 1;
    let start = index;

    
    let mut run = 0usize;
    while index < bytes.len() {
        match bytes[index] {
            b'\\' => {
                run += 1;
                index += 1;
            }
            b'"' if run == opener_run => return Some((start, index - run)),
            b'"' => {
                run = 0;
                index += 1;
            }
            _ => {
                run = 0;
                index += 1;
            }
        }
    }
    None
}





fn inject_offline_patch(html: &str) -> String {
    let cleaned = scrub_analytics_ids(&scrub_identity_metadata(html));
    let html = cleaned.as_str();
    match html.to_ascii_lowercase().rfind("</body>") {
        Some(index) => {
            let mut out = String::with_capacity(html.len() + OFFLINE_PATCH.len());
            out.push_str(&html[..index]);
            out.push_str(OFFLINE_PATCH);
            out.push_str(&html[index..]);
            out
        }
        None => format!("{html}{OFFLINE_PATCH}"),
    }
}








const OFFLINE_PATCH: &str = r####"<style id="mcb-offline-patch">
a[href="/login"],a[href^="/register"],a[href^="/forgot-password"],a[href^="/profile"]{display:none!important}
 

img[src*="/logo/"],img[src*="Icon_Stuido"],img[src*="qr-qq"],img[src*="qr-partner"],img[src$="/favicon.ico"],img[src$="favicon-32x32.png"],img[src$="apple-touch-icon.png"]{display:none!important}
a[href*="mcblock.top"],a[href*="beian.miit.gov.cn"]{display:none!important}
.ft-brand,.ft-cols,.ft-legal,.ft-qr,.ft-slogan{display:none!important}
</style>
<script id="mcb-offline-patch-script">
(function () {
  if (window.__mcbOfflinePatch) { return; }
  window.__mcbOfflinePatch = 1;

  
  var LOGIN_PREFIX = /未登录\s*·\s*/g;
  
  var ATTRS = ['alt', 'title'];
  
  var SENTENCES = [
    [/[；;]\s*登录后跟着账号走，未登录存在本机/g, ''],
    [/保存到账号和导出文件需要登录；账号保存上限约\s*[\d.]+\s*MB，超过时请先本地导出/g,
      '导出的投影文件保存在本机。'],
    [/登录后自动继续当前操作\s*·\s*全部功能免费/g, ''],
    
    [/结构编辑将按原格式保存为新的副本。/g, '结构编辑会按原格式写回源文件。'],
    [/原云端作品会保留。/g, '写入前会先备份源文件。'],
    [/副本已保存，原作品已保留/g, '已写回源文件，原文件已备份'],
    [/云端副本已保存，但浏览器无法保存临时草稿；刷新后请从作品列表重新打开。/g,
      '已写回源文件，但浏览器没能保存临时草稿；刷新后请重新从蓝图库打开。']
  ];
  var LABELS = {
    '保存与导出': '导出投影',
    '保存 / 导出': '导出',
    '将结构编辑另存为副本': '保存结构编辑',
    
    '另存副本': '保存',
    
    
    '登录后保存': '保存',
    '保存作品需要登录': '保存'
  };

  
  
  
  
  var BRAND = [
    [/mcblock-(work|export)/gi, 'blueprint'],
    [/support@mcblock\.top/gi, ''],
    [/mcblock\.top/gi, ''],
    [/MCBlock\s*Studio/gi, '投影编辑器'],
    [/MCBlock/gi, '投影编辑器'],
    [/方块工坊/g, ''],
    [/长沙引擎猫科技有限公司/g, ''],
    [/引擎猫/g, ''],
    [/湘\s*ICP\s*备\s*\d+\s*号(\s*-\s*\d+)?/g, ''],
    [/返回\s*Studio/g, '返回导入页'],
    [/欢迎使用\s*Studio/g, '欢迎使用投影编辑器'],
    [/Studio\s*操作指引/g, '编辑器操作指引'],
    [/Studio\s*预览/g, '编辑器预览'],
    [/\bStudio\b/g, '编辑器'],
    [/©\s*\d{4}\s*[·•]?\s*/g, ''],
    [/(\s*[·•]\s*){2,}/g, ' ']
  ];

  function rewrite(value) {
    var out = value.replace(LOGIN_PREFIX, '');
    var i;
    for (i = 0; i < SENTENCES.length; i++) { out = out.replace(SENTENCES[i][0], SENTENCES[i][1]); }
    for (i = 0; i < BRAND.length; i++) { out = out.replace(BRAND[i][0], BRAND[i][1]); }
    var trimmed = out.trim();
    if (Object.prototype.hasOwnProperty.call(LABELS, trimmed)) { out = out.replace(trimmed, LABELS[trimmed]); }
    return out;
  }

  
  
  function trimAccountQuota(element) {
    var kids = element.childNodes;
    for (var i = 0; i < kids.length; i++) {
      if (kids[i].nodeType === 3 && kids[i].nodeValue.indexOf('账号保存') >= 0) {
        while (element.childNodes.length > i) { element.removeChild(element.childNodes[i]); }
        return;
      }
    }
  }

  function walk(node) {
    if (node.nodeType === 3) {
      var next = rewrite(node.nodeValue || '');
      if (next !== node.nodeValue) { node.nodeValue = next; }
      return;
    }
    if (node.nodeType !== 1) { return; }
    if (node.classList && node.classList.contains('st-limit')) { trimAccountQuota(node); }
    
    for (var a = 0; a < ATTRS.length; a++) {
      var name = ATTRS[a];
      var current = node.getAttribute && node.getAttribute(name);
      if (!current) { continue; }
      var after = rewrite(current);
      if (after !== current) { node.setAttribute(name, after); }
    }
    var kids = node.childNodes;
    for (var i = 0; i < kids.length; i++) { walk(kids[i]); }
  }

  
  
  function hideLoginDialog() {
    var dialogs = document.querySelectorAll('[role="dialog"]');
    for (var i = 0; i < dialogs.length; i++) {
      var dialog = dialogs[i];
      var head = dialog.querySelector('#modal-title') || dialog;
      if (!/需要登录|登录后继续/.test(head.textContent || '')) { continue; }
      var overlay = dialog.parentElement || dialog;
      if (overlay.style.display !== 'none') { overlay.style.display = 'none'; }
      if (document.body && document.body.style.overflow) { document.body.style.overflow = ''; }
    }
  }

  function fullScan() {
    if (!document.body) { return; }
    walk(document.body);
    hideLoginDialog();
    
    if (document.title) {
      var fixed = rewrite(document.title);
      if (fixed !== document.title) { document.title = fixed; }
    }
  }

  function scanNode(node) {
    if (node && (node.nodeType === 3 || node.nodeType === 1)) { walk(node); }
  }

  
  
  
  
  
  var SAVE_URL = /^\/api\/studio\/works(\/|$|\?)/;

  
  
  
  var lastServedKey = '';

  function noteServedProjection(url) {
    var matched = /^\/local-files\/([^\/?#]+)/.exec(url || '');
    if (matched) {
      try { lastServedKey = decodeURIComponent(matched[1]); } catch (error) { lastServedKey = matched[1]; }
    }
  }

  function currentProjectionKey() {
    if (lastServedKey) { return lastServedKey; }
    try {
      var url = sessionStorage.getItem('studio_projection_url') || '';
      var matched = /\/local-files\/([^\/?#]+)/.exec(url);
      return matched ? decodeURIComponent(matched[1]) : '';
    } catch (error) {
      return '';
    }
  }

  
  function lookupSaveTarget(originalFetch, key) {
    var query = key ? '?key=' + encodeURIComponent(key) : '';
    return originalFetch.call(window, '/local/save-target' + query, { cache: 'no-store' })
      .then(function (response) { return response.ok ? response.json() : null; })
      .catch(function () { return null; });
  }

  function appendProjectionKey(url, key) {
    if (!url || !key) { return url; }
    return url + (url.indexOf('?') < 0 ? '?' : '&') + 'local_projection=' + encodeURIComponent(key);
  }

  function withProjectionKey(input, url, key) {
    if (!url || !key) { return input; }
    var next = appendProjectionKey(url, key);
    if (typeof input === 'string') { return next; }
    try { return new Request(next, input); } catch (error) { return input; }
  }

  function askOverwrite(name) {
    return new Promise(function (resolve) {
      var overlay = document.createElement('div');
      overlay.id = 'mcb-save-confirm';
      overlay.style.cssText = 'position:fixed;left:0;top:0;right:0;bottom:0;z-index:2147483000;'
        + 'display:flex;align-items:center;justify-content:center;background:rgba(12,15,20,.62);padding:24px';

      var card = document.createElement('div');
      card.style.cssText = 'box-sizing:border-box;width:100%;max-width:460px;background:#fff;'
        + 'color:#1f2329;border-radius:14px;box-shadow:0 24px 64px rgba(0,0,0,.38);'
        + 'padding:22px 24px 18px;font-size:14px;line-height:1.75';

      var title = document.createElement('h2');
      title.textContent = '覆盖源文件？';
      title.style.cssText = 'margin:0 0 10px;font-size:17px;font-weight:600;color:#1f2329';
      card.appendChild(title);

      var warning = document.createElement('p');
      warning.textContent = '保存会把当前编辑内容直接写回下面这份蓝图的源文件，原有内容将被替换，编辑器里撤销不了。';
      warning.style.cssText = 'margin:0 0 12px;color:#d4380d';
      card.appendChild(warning);

      var target = document.createElement('p');
      target.textContent = '源文件：' + (name || '（这份蓝图）');
      target.style.cssText = 'margin:0 0 4px;word-break:break-all';
      card.appendChild(target);

      var backup = document.createElement('p');
      backup.textContent = '写入前会在同一目录自动留一份 .bak 备份。';
      backup.style.cssText = 'margin:0 0 18px;color:#646a73;font-size:13px';
      card.appendChild(backup);

      var actions = document.createElement('div');
      actions.style.cssText = 'display:flex;justify-content:flex-end;gap:10px';

      var cancel = document.createElement('button');
      cancel.type = 'button';
      cancel.textContent = '取消';
      cancel.style.cssText = 'padding:8px 18px;border-radius:8px;border:1px solid #d0d3d9;'
        + 'background:#fff;color:#1f2329;font-size:14px;cursor:pointer';

      var confirm = document.createElement('button');
      confirm.type = 'button';
      confirm.textContent = '确认覆盖';
      confirm.style.cssText = 'padding:8px 18px;border-radius:8px;border:1px solid #d4380d;'
        + 'background:#d4380d;color:#fff;font-size:14px;cursor:pointer';

      function onKeyDown(event) {
        
        event.stopPropagation();
        if (event.key === 'Escape' || event.keyCode === 27) { close(false); }
      }

      function close(answer) {
        document.removeEventListener('keydown', onKeyDown, true);
        if (overlay.parentNode) { overlay.parentNode.removeChild(overlay); }
        resolve(answer);
      }

      cancel.addEventListener('click', function () { close(false); });
      confirm.addEventListener('click', function () { close(true); });
      overlay.addEventListener('click', function (event) {
        if (event.target === overlay) { close(false); }
      });
      document.addEventListener('keydown', onKeyDown, true);

      actions.appendChild(cancel);
      actions.appendChild(confirm);
      card.appendChild(actions);
      overlay.appendChild(card);
      (document.body || document.documentElement).appendChild(overlay);
      
      cancel.focus();
    });
  }

  function installSaveGuard() {
    var originalFetch = window.fetch;
    if (typeof originalFetch !== 'function') { return; }
    
    if (originalFetch.__mcbSaveGuard) { return; }

    function guardedFetch(input, init) {
      var url = typeof input === 'string' ? input : (input && input.url);
      if (url) { noteServedProjection(url); }
      var method = String((init && init.method) || (input && input.method) || 'GET').toUpperCase();
      if (!url || (method !== 'POST' && method !== 'PUT') || !SAVE_URL.test(url)) {
        return originalFetch.call(this, input, init);
      }

      var receiver = this;
      var key = currentProjectionKey();
      return lookupSaveTarget(originalFetch, key).then(function (target) {
        
        if (!target || !target.source) {
          return originalFetch.call(receiver, input, init);
        }
        return askOverwrite(target.name || '').then(function (confirmed) {
          if (!confirmed) {
            
            return new Response(JSON.stringify({
              success: false,
              error: '已取消保存，源文件未改动。'
            }), { status: 400, headers: { 'Content-Type': 'application/json' } });
          }
          return originalFetch.call(receiver, withProjectionKey(input, url, key), init);
        });
      });
    }

    guardedFetch.__mcbSaveGuard = true;
    window.fetch = guardedFetch;
  }

  installSaveGuard();
  
  
  [2000, 6000].forEach(function (delay) {
    setTimeout(installSaveGuard, delay);
  });

  
  [0, 250, 800, 2000, 5000, 10000].forEach(function (delay) {
    setTimeout(fullScan, delay);
  });

  if (!window.MutationObserver) {
    setInterval(fullScan, 1500);
  } else {
    new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var record = records[i];
        if (record.type === 'characterData') { scanNode(record.target); continue; }
        for (var j = 0; j < record.addedNodes.length; j++) { scanNode(record.addedNodes[j]); }
      }
      hideLoginDialog();
    }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  }

  fullScan();
})();
</script>"####;

fn open_shim_page(key: &str, display_name: &str) -> String {
    
    
    let file_url = json_string(&format!("/local-files/{key}")).replace('<', "\\u003c");
    let name = json_string(display_name).replace('<', "\\u003c");
    format!(
        "<!DOCTYPE html><html lang=\"zh-CN\"><head><meta charset=\"utf-8\">\
<title>正在打开投影…</title><style>\
body{{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;\
background:#0f1115;color:#e8eaf0;font-family:'Noto Sans SC','Microsoft YaHei',system-ui,sans-serif}}\
.hint{{text-align:center;font-size:13px;line-height:1.9;color:#98a1b3}}\
</style></head><body><div class=\"hint\">正在把投影交给编辑器……</div>\
<script>\
sessionStorage.clear();\
sessionStorage.setItem('studio_source_type','projection_url');\
sessionStorage.setItem('studio_projection_url',{file_url});\
sessionStorage.setItem('studio_building_name',{name});\
location.replace('/studio/editor');\
</script></body></html>"
    )
}

fn open_error_page(message: &str) -> String {
    let safe = message
        .replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;");
    format!(
        "<!DOCTYPE html><html lang=\"zh-CN\"><head><meta charset=\"utf-8\">\
<title>无法打开投影</title><style>\
body{{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;\
background:#0f1115;color:#e8eaf0;font-family:'Noto Sans SC','Microsoft YaHei',system-ui,sans-serif}}\
.card{{max-width:520px;padding:28px 32px;border:2px solid #2a2f3a;background:#161a21;line-height:1.7}}\
h1{{font-size:18px;margin:0 0 12px}}a{{color:#7fd1ff}}\
</style></head><body><div class=\"card\"><h1>无法打开投影</h1>\
<p>{safe}</p><p><a href=\"/\">回到导入入口</a></p></div></body></html>"
    )
}


fn write_error_page(
    stream: &mut TcpStream,
    message: &str,
    head_only: bool,
) -> std::io::Result<()> {
    let page = open_error_page(message);
    write_response(
        stream,
        404,
        page.as_bytes(),
        "text/html; charset=utf-8",
        head_only,
        &[],
    )
}





struct PreparedUpload {
    key: String,
    file_name: String,
    extension: String,
    data: Vec<u8>,
}

fn prepare_upload(raw_name: &str, body: Vec<u8>) -> Result<PreparedUpload, String> {
    let file_name: String = raw_name
        .rsplit(['/', '\\'])
        .next()
        .unwrap_or("")
        .chars()
        .map(|character| {
            if character.is_control()
                || matches!(character, '<' | '>' | ':' | '"' | '|' | '?' | '*' | '/' | '\\')
            {
                '_'
            } else {
                character
            }
        })
        .collect();
    let file_name = if file_name.is_empty() {
        String::from("projection.litematic")
    } else {
        file_name
    };
    let extension = file_name
        .rsplit_once('.')
        .map(|(_, extension)| extension.to_ascii_lowercase())
        .unwrap_or_default();

    if extension != "litematic" && extension != "schem" {
        return Err(String::from("只支持 .litematic / .schem"));
    }
    if body.is_empty() {
        return Err(String::from("文件为空"));
    }

    Ok(PreparedUpload {
        key: format!("{}-{}", timestamp_millis(), file_name),
        file_name,
        extension,
        data: body,
    })
}

fn handle_upload(
    stream: &mut TcpStream,
    query: &str,
    body: &[u8],
    shared: &Shared,
) -> std::io::Result<()> {
    let mut raw_name = String::from("projection.litematic");
    for pair in query.split('&') {
        if let Some(equals) = pair.find('=') {
            if pair[..equals].eq_ignore_ascii_case("name") {
                raw_name = percent_decode(&pair[equals + 1..]);
                break;
            }
        }
    }

    let prepared = match prepare_upload(&raw_name, body.to_vec()) {
        Ok(prepared) => prepared,
        Err(message) => {
            let payload = format!(
                "{{\"success\":false,\"error\":{}}}",
                json_string(&message)
            );
            return write_response(
                stream,
                400,
                payload.as_bytes(),
                "application/json; charset=utf-8",
                false,
                &[],
            );
        }
    };

    let size = prepared.data.len();
    let payload = format!(
        "{{\"success\":true,\"url\":\"/local-files/{}\",\"name\":{},\"size\":{},\"extension\":{}}}",
        escape_data_string(&prepared.key),
        json_string(&prepared.file_name),
        size,
        json_string(&prepared.extension)
    );
    {
        let mut uploads = shared.uploads.lock().unwrap_or_else(|error| error.into_inner());
        uploads.insert(
            prepared.key,
            Uploaded {
                data: prepared.data,
                extension: prepared.extension,
                file_name: prepared.file_name,
                
                origin: None,
            },
        );
    }

    write_response(
        stream,
        200,
        payload.as_bytes(),
        "application/json; charset=utf-8",
        false,
        &[],
    )
}














fn handle_save_target(
    stream: &mut TcpStream,
    query: &str,
    shared: &Shared,
    head_only: bool,
) -> std::io::Result<()> {
    let wanted = query_parameter(query, "key");
    let fallback = last_origin_key(shared);

    let answer = {
        let uploads = shared.uploads.lock().unwrap_or_else(|error| error.into_inner());
        match pick_source_key(wanted.as_deref(), fallback.as_deref(), &uploads)
            .and_then(|key| uploads.get(&key))
        {
            Some(item) => (item.origin.is_some(), item.file_name.clone()),
            None => (false, String::new()),
        }
    };

    let payload = format!(
        "{{\"success\":true,\"source\":{},\"name\":{}}}",
        answer.0,
        json_string(&answer.1)
    );
    write_json(stream, 200, &payload, head_only)
}


fn handle_works(
    stream: &mut TcpStream,
    method: &str,
    path: &str,
    query: &str,
    body: &[u8],
    shared: &Shared,
    head_only: bool,
) -> std::io::Result<()> {
    let tail = path
        .trim_end_matches('/')
        .strip_prefix("/api/studio/works")
        .unwrap_or("")
        .trim_matches('/');

    if method == "POST" || method == "PUT" {
        return save_projection_to_source(stream, query, body, shared, head_only);
    }

    if method == "GET" {
        if tail.is_empty() {
            
            
            return write_json(stream, 200, "{\"success\":true,\"data\":[]}", head_only);
        }
        let message = if tail.ends_with("export") {
            "离线模式：没有可导出的云端作品，请用编辑器里的「导出投影」。"
        } else {
            "离线模式：没有这份云端作品。"
        };
        return write_error_json(stream, 404, message, head_only);
    }

    if method == "DELETE" {
        
        return write_json(stream, 200, "{\"success\":true}", head_only);
    }

    write_error_json(stream, 405, "离线模式：不支持这个请求。", head_only)
}


fn save_projection_to_source(
    stream: &mut TcpStream,
    query: &str,
    body: &[u8],
    shared: &Shared,
    head_only: bool,
) -> std::io::Result<()> {
    let request: serde_json::Value = match serde_json::from_slice(body) {
        Ok(value) => value,
        Err(error) => {
            return write_error_json(
                stream,
                400,
                &format!("保存请求不是合法 JSON：{error}"),
                head_only,
            )
        }
    };

    let format = request
        .get("sourceFormat")
        .and_then(serde_json::Value::as_str)
        .unwrap_or("")
        .trim()
        .trim_start_matches('.')
        .to_ascii_lowercase();
    if format != "litematic" && format != "schem" {
        return write_error_json(
            stream,
            400,
            "编辑器给出的格式不是 .litematic / .schem，已中止保存。",
            head_only,
        );
    }

    let Some(encoded) = request.get("originalData").and_then(serde_json::Value::as_str) else {
        return write_error_json(stream, 400, "保存请求里没有 originalData。", head_only);
    };

    
    use base64::Engine as _;
    let data = match base64::engine::general_purpose::STANDARD.decode(encoded) {
        Ok(bytes) => bytes,
        Err(error) => {
            return write_error_json(
                stream,
                400,
                &format!("保存内容解码失败：{error}"),
                head_only,
            )
        }
    };
    if data.is_empty() {
        return write_error_json(stream, 400, "保存内容为空，已中止。", head_only);
    }

    let wanted = query_parameter(query, "local_projection");
    let fallback = last_origin_key(shared);
    let target = {
        let uploads = shared.uploads.lock().unwrap_or_else(|error| error.into_inner());
        pick_source_key(wanted.as_deref(), fallback.as_deref(), &uploads).and_then(|key| {
            uploads
                .get(&key)
                .map(|item| (key, item.origin, item.data.clone(), item.file_name.clone()))
        })
    };

    let Some((key, origin, original, file_name)) = target else {
        return write_error_json(
            stream,
            400,
            "离线模式：找不到这份投影对应的源文件，请回到蓝图库重新打开一次。",
            head_only,
        );
    };
    let Some(origin) = origin else {
        return write_error_json(
            stream,
            400,
            "离线模式：这份投影是从本机拖进来的，没有可写回的源文件；请用编辑器里的「导出投影」另存到本机。",
            head_only,
        );
    };

    
    
    if original.starts_with(&[0x1f, 0x8b]) && !data.starts_with(&[0x1f, 0x8b]) {
        return write_error_json(
            stream,
            400,
            "保存内容不是压缩 NBT，写回去会损坏源文件，已中止。",
            head_only,
        );
    }

    let Some(library) = shared.library.as_ref() else {
        return write_error_json(
            stream,
            400,
            "本地蓝图库不可用：这个离线服务是独立启动的，没接上 McSTools 的蓝图库。",
            head_only,
        );
    };

    let written = match library.write(origin, &data) {
        Ok(path) => path,
        Err(message) => return write_error_json(stream, 500, &message, head_only),
    };

    
    {
        let mut uploads = shared.uploads.lock().unwrap_or_else(|error| error.into_inner());
        if let Some(item) = uploads.get_mut(&key) {
            item.data = data;
        }
    }

    let asked_name = request
        .get("name")
        .and_then(serde_json::Value::as_str)
        .unwrap_or("")
        .trim();
    let display_name = if asked_name.is_empty() {
        file_name.as_str()
    } else {
        asked_name
    };
    let payload = format!(
        "{{\"success\":true,\"data\":{{\"id\":{},\"name\":{}}}}}",
        json_string(&format!("local-{origin}")),
        json_string(display_name)
    );
    log_line(&format!("saved blueprint {origin} -> {written}"));
    write_json(stream, 200, &payload, head_only)
}





fn pick_source_key(
    wanted: Option<&str>,
    fallback: Option<&str>,
    uploads: &HashMap<String, Uploaded>,
) -> Option<String> {
    if let Some(key) = wanted.filter(|key| !key.is_empty()) {
        return uploads.contains_key(key).then(|| key.to_string());
    }
    fallback
        .filter(|key| uploads.get(*key).map(|item| item.origin.is_some()).unwrap_or(false))
        .map(str::to_string)
}


fn last_origin_key(shared: &Shared) -> Option<String> {
    let guard = shared
        .last_origin_key
        .lock()
        .unwrap_or_else(|error| error.into_inner());
    guard.clone()
}


fn query_parameter(query: &str, name: &str) -> Option<String> {
    for pair in query.split('&') {
        let Some(equals) = pair.find('=') else {
            continue;
        };
        if pair[..equals].eq_ignore_ascii_case(name) {
            return Some(percent_decode(&pair[equals + 1..]));
        }
    }
    None
}

fn write_json(
    stream: &mut TcpStream,
    status: u16,
    payload: &str,
    head_only: bool,
) -> std::io::Result<()> {
    write_response(
        stream,
        status,
        payload.as_bytes(),
        "application/json; charset=utf-8",
        head_only,
        &[],
    )
}


fn write_error_json(
    stream: &mut TcpStream,
    status: u16,
    message: &str,
    head_only: bool,
) -> std::io::Result<()> {
    let payload = format!("{{\"success\":false,\"error\":{}}}", json_string(message));
    write_json(stream, status, &payload, head_only)
}



fn split_target(target: &str) -> (String, String) {
    match target.find('?') {
        Some(index) => (
            target[..index].to_string(),
            target[index + 1..].to_string(),
        ),
        None => (target.to_string(), String::new()),
    }
}

fn find_subsequence(haystack: &[u8], needle: &[u8]) -> Option<usize> {
    if needle.is_empty() || haystack.len() < needle.len() {
        return None;
    }
    haystack.windows(needle.len()).position(|window| window == needle)
}

fn starts_with_ignore_ascii_case<'a>(value: &'a str, prefix: &str) -> Option<&'a str> {
    let head = value.get(..prefix.len())?;
    if head.eq_ignore_ascii_case(prefix) {
        value.get(prefix.len()..)
    } else {
        None
    }
}

fn percent_decode(value: &str) -> String {
    let bytes = value.as_bytes();
    let mut out: Vec<u8> = Vec::with_capacity(bytes.len());
    let mut index = 0;
    while index < bytes.len() {
        match bytes[index] {
            b'%' if index + 2 < bytes.len() => {
                match (hex_value(bytes[index + 1]), hex_value(bytes[index + 2])) {
                    (Some(high), Some(low)) => {
                        out.push(high * 16 + low);
                        index += 3;
                    }
                    _ => {
                        out.push(bytes[index]);
                        index += 1;
                    }
                }
            }
            b'+' => {
                out.push(b' ');
                index += 1;
            }
            byte => {
                out.push(byte);
                index += 1;
            }
        }
    }
    String::from_utf8_lossy(&out).into_owned()
}

fn hex_value(byte: u8) -> Option<u8> {
    match byte {
        b'0'..=b'9' => Some(byte - b'0'),
        b'a'..=b'f' => Some(byte - b'a' + 10),
        b'A'..=b'F' => Some(byte - b'A' + 10),
        _ => None,
    }
}

fn escape_data_string(value: &str) -> String {
    let mut out = String::with_capacity(value.len());
    for byte in value.as_bytes() {
        let character = *byte as char;
        if character.is_ascii_alphanumeric() || matches!(character, '-' | '_' | '.' | '~') {
            out.push(character);
        } else {
            out.push_str(&format!("%{byte:02X}"));
        }
    }
    out
}

fn json_string(value: &str) -> String {
    let mut out = String::with_capacity(value.len() + 2);
    out.push('"');
    for character in value.chars() {
        match character {
            '"' => out.push_str("\\\""),
            '\\' => out.push_str("\\\\"),
            control if (control as u32) < 0x20 => out.push_str(&format!("\\u{:04x}", control as u32)),
            other => out.push(other),
        }
    }
    out.push('"');
    out
}

fn timestamp_millis() -> u128 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|duration| duration.as_millis())
        .unwrap_or_default()
}

fn is_rsc_request(headers: &HashMap<String, String>, query: &str) -> bool {
    if headers.get("rsc").map(|value| value == "1").unwrap_or(false) {
        return true;
    }
    if headers.contains_key("next-router-state-tree") {
        return true;
    }
    query.contains("_rsc=")
}










const LOCAL_GUEST_SESSION: &str = concat!(
    "{\"user\":{\"id\":\"local-guest\",\"name\":\"本地访客\",",
    "\"email\":null,\"image\":null},",
    "\"expires\":\"2099-12-31T23:59:59.999Z\"}",
);




fn api_stub(path: &str) -> (u16, String) {
    let status = 200u16;
    let mut payload = String::from("{\"success\":false,\"error\":\"offline stub\"}");

    
    
    if path == "/api/auth/session" {
        payload = String::from(LOCAL_GUEST_SESSION);
        return (status, payload);
    }
    if path == "/api/auth/csrf" {
        payload = String::from("{\"csrfToken\":\"offline-mirror\"}");
        return (status, payload);
    }
    if path == "/api/auth/providers" {
        payload = String::from(
            "{\"credentials\":{\"id\":\"credentials\",\"name\":\"本地访客\",\"type\":\"credentials\"}}",
        );
        return (status, payload);
    }
    if path == "/api/auth/signout" {
        payload = String::from("{\"url\":\"/\"}");
        return (status, payload);
    }
    if starts_with_ignore_ascii_case(path, "/api/buildings").is_some() {
        payload = String::from(
            "{\"success\":true,\"data\":[],\"pagination\":{\"page\":1,\"limit\":12,\"total\":0,\"totalPages\":1}}",
        );
        return (status, payload);
    }
    if starts_with_ignore_ascii_case(path, "/api/notifications/unread-count").is_some() {
        payload = String::from("{\"success\":true,\"data\":{\"count\":0}}");
        return (status, payload);
    }
    if starts_with_ignore_ascii_case(path, "/api/notifications").is_some() {
        payload = String::from("{\"success\":true,\"data\":[]}");
        return (status, payload);
    }
    if starts_with_ignore_ascii_case(path, "/api/studio/usage").is_some()
        || starts_with_ignore_ascii_case(path, "/api/analytics/track").is_some()
    {
        payload = String::from("{\"success\":true}");
        return (status, payload);
    }
    if starts_with_ignore_ascii_case(path, "/api/settings/renderer-config").is_some() {
        payload = String::from("{\"success\":false,\"error\":\"offline\"}");
        return (status, payload);
    }

    (status, payload)
}


fn resolve_file(root: &Path, key: &str) -> Option<(PathBuf, String)> {
    let relative = safe_relative(key)?;
    let direct = root.join(&relative);
    if direct.is_file() {
        return Some((direct, key.to_string()));
    }

    let index_key = if key.is_empty() {
        String::from("index.html")
    } else {
        format!("{}/index.html", key.trim_end_matches('/'))
    };
    let index = root.join(&relative).join("index.html");
    if index.is_file() {
        return Some((index, index_key));
    }

    let html_key = format!("{key}.html");
    if let Some(html_relative) = safe_relative(&html_key) {
        let html = root.join(html_relative);
        if html.is_file() {
            return Some((html, html_key));
        }
    }

    None
}

fn safe_relative(key: &str) -> Option<PathBuf> {
    let trimmed = key.trim_matches('/');
    let mut out = PathBuf::new();
    if trimmed.is_empty() {
        return Some(out);
    }
    for segment in trimmed.split('/') {
        if segment.is_empty() || segment == "." {
            continue;
        }
        if segment == ".." || segment.contains('\\') || segment.contains(':') || segment.contains('\0') {
            return None;
        }
        out.push(segment);
    }
    Some(out)
}

fn content_type_for(path: &str, data: &[u8]) -> &'static str {
    if data.len() >= 12 {
        if data[0] == 0x89 && data[1] == 0x50 && data[2] == 0x4E && data[3] == 0x47 {
            return "image/png";
        }
        if data[0] == 0x47 && data[1] == 0x49 && data[2] == 0x46 {
            return "image/gif";
        }
        if data[0] == 0x52 && data[1] == 0x49 && data[8] == 0x57 && data[9] == 0x45 {
            return "image/webp";
        }
        if data[0] == 0xFF && data[1] == 0xD8 && data[2] == 0xFF {
            return "image/jpeg";
        }
    }

    let extension = path
        .rsplit_once('.')
        .map(|(_, extension)| extension.to_ascii_lowercase())
        .unwrap_or_default();

    match extension.as_str() {
        "html" => "text/html; charset=utf-8",
        "js" | "mjs" => "application/javascript; charset=utf-8",
        "css" => "text/css; charset=utf-8",
        "json" => "application/json; charset=utf-8",
        "webmanifest" => "application/manifest+json; charset=utf-8",
        "txt" => "text/plain; charset=utf-8",
        "svg" => "image/svg+xml",
        "ico" => "image/x-icon",
        "woff" => "font/woff",
        "woff2" => "font/woff2",
        "ttf" => "font/ttf",
        _ => "application/octet-stream",
    }
}

fn write_response(
    stream: &mut TcpStream,
    status: u16,
    body: &[u8],
    content_type: &str,
    head_only: bool,
    extra: &[(&str, String)],
) -> std::io::Result<()> {
    let mut head = String::new();
    head.push_str(&format!("HTTP/1.1 {status} {}\r\n", status_text(status)));
    head.push_str(&format!("Content-Type: {content_type}\r\n"));
    head.push_str(&format!("Content-Length: {}\r\n", body.len()));
    head.push_str("Cache-Control: no-store\r\n");
    head.push_str("Connection: close\r\n");
    for (name, value) in extra {
        head.push_str(&format!("{name}: {value}\r\n"));
    }
    head.push_str("\r\n");

    stream.write_all(head.as_bytes())?;
    if !head_only && !body.is_empty() {
        stream.write_all(body)?;
    }
    stream.flush()
}

fn status_text(status: u16) -> &'static str {
    match status {
        200 => "OK",
        400 => "Bad Request",
        401 => "Unauthorized",
        404 => "Not Found",
        405 => "Method Not Allowed",
        500 => "Internal Server Error",
        _ => "OK",
    }
}

fn offline_page(path: &str) -> String {
    let safe = path.replace('&', "&amp;").replace('<', "&lt;").replace('>', "&gt;");
    format!(
        "<!DOCTYPE html><html lang=\"zh-CN\"><head><meta charset=\"utf-8\">\
<title>页面未包含</title><style>\
body{{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;\
background:#0f1115;color:#e8eaf0;font-family:'Noto Sans SC','Microsoft YaHei',system-ui,sans-serif}}\
.card{{max-width:520px;padding:28px 32px;border:2px solid #2a2f3a;background:#161a21;line-height:1.7}}\
h1{{font-size:18px;margin:0 0 12px}}code{{color:#7fd1ff;word-break:break-all}}a{{color:#7fd1ff}}\
</style></head><body><div class=\"card\"><h1>这个页面没有包含在本地站点里</h1>\
<p>请求路径：<code>{safe}</code></p>\
<p><a href=\"/\">回到导入入口</a></p>\
</div></body></html>"
    )
}


fn log_line(message: &str) {
    let Ok(path) = std::env::var("EDITOR_LOG") else {
        return;
    };
    if path.is_empty() {
        return;
    }
    if let Ok(mut file) = fs::OpenOptions::new().create(true).append(true).open(path) {
        let _ = writeln!(file, "[{}] {message}", timestamp_millis());
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn web_root() -> Option<PathBuf> {
        let candidates = [
            std::env::var("EDITOR_WEB_ROOT").ok().map(PathBuf::from),
            Some(PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("data/editor/web")),
        ];
        candidates
            .into_iter()
            .flatten()
            .find(|candidate| candidate.join("index.html").is_file())
    }

    fn raw_request(port: u16, raw: &[u8]) -> Vec<u8> {
        let mut stream = TcpStream::connect(("127.0.0.1", port)).expect("connect");
        stream.write_all(raw).expect("write");
        stream.flush().expect("flush");
        let mut response = Vec::new();
        stream.read_to_end(&mut response).expect("read");
        response
    }

    fn text_request(port: u16, raw: &str) -> String {
        String::from_utf8_lossy(&raw_request(port, raw.as_bytes())).into_owned()
    }

    #[test]
    fn serves_mirrored_pages() {
        let Some(root) = web_root() else {
            eprintln!("跳过：找不到站点镜像目录");
            return;
        };
        let server = OfflineServer::start_with_library(root.clone(), None).expect("start server");
        let port = server.port();

        let entry = text_request(port, "GET / HTTP/1.1\r\nHost: localhost\r\n\r\n");
        assert!(entry.starts_with("HTTP/1.1 200 OK"), "{entry}");
        assert!(entry.contains("投影编辑器"), "入口页内容不对");
        if entry.contains("离线版") {
            let hits = entry
                .lines()
                .filter(|line| line.contains("离线版"))
                .take(3)
                .collect::<Vec<_>>()
                .join("\n---\n");
            panic!("入口页还带着「离线版」字样：{hits}");
        }

        
        
        
        let entry_file = fs::read_to_string(root.join("index.html")).expect("读入口页");
        assert!(!entry_file.contains("MCBlock"), "入口页产物还带着品牌名");
        assert!(!entry_file.contains("logo-horizontal"), "入口页还在引品牌 logo");

        let studio = text_request(port, "GET /studio HTTP/1.1\r\nHost: localhost\r\n\r\n");
        assert!(studio.starts_with("HTTP/1.1 200 OK"), "{studio}");
        
        assert!(
            studio.contains("从本地蓝图库打开"),
            "「返回 Studio」没有回到拖动导入页：{studio}"
        );
        assert!(!studio.contains("从建筑库直接打开"), "不该再出现 Studio 落地页");

        
        let studio_rsc = text_request(
            port,
            "GET /studio HTTP/1.1\r\nHost: localhost\r\nRSC: 1\r\n\r\n",
        );
        assert!(studio_rsc.starts_with("HTTP/1.1 500"), "{studio_rsc}");

        let missing = text_request(port, "GET /not-mirrored HTTP/1.1\r\nHost: localhost\r\n\r\n");
        assert!(missing.starts_with("HTTP/1.1 404"), "{missing}");
        assert!(missing.contains("没有包含在本地站点里"));
        assert!(!missing.contains("离线版"), "404 页还带着「离线版」字样");
    }

    #[test]
    fn stubs_api_and_rsc() {
        let Some(root) = web_root() else {
            eprintln!("跳过：找不到站点镜像目录");
            return;
        };
        let server = OfflineServer::start_with_library(root, None).expect("start server");
        let port = server.port();

        
        
        let session = text_request(port, "GET /api/auth/session HTTP/1.1\r\nHost: localhost\r\n\r\n");
        assert!(session.starts_with("HTTP/1.1 200 OK"), "{session}");
        assert!(
            session.contains("\"user\"") && session.contains("\"id\":\"local-guest\""),
            "会话里没有本地访客身份，导出仍会被登录判定拦住：{session}"
        );

        
        let works = text_request(
            port,
            "GET /api/studio/works?page=1 HTTP/1.1\r\nHost: localhost\r\n\r\n",
        );
        assert!(works.starts_with("HTTP/1.1 200 OK"), "{works}");
        assert!(works.contains("\"data\":[]"), "{works}");

        let rsc = text_request(
            port,
            "GET /studio/editor HTTP/1.1\r\nHost: localhost\r\nRSC: 1\r\n\r\n",
        );
        assert!(rsc.starts_with("HTTP/1.1 500"), "{rsc}");

        let head = text_request(port, "HEAD / HTTP/1.1\r\nHost: localhost\r\n\r\n");
        assert!(head.starts_with("HTTP/1.1 200 OK"), "{head}");
        assert!(head.contains("Content-Length: "), "HEAD 必须带 Content-Length");
    }

    #[test]
    fn accepts_upload_and_serves_it_back() {
        let Some(root) = web_root() else {
            eprintln!("跳过：找不到站点镜像目录");
            return;
        };
        let server = OfflineServer::start_with_library(root, None).expect("start server");
        let port = server.port();

        let body: &[u8] = b"fake-schematic-bytes";
        let head = format!(
            "POST /local/upload?name=%E6%B5%8B%E8%AF%95.schem HTTP/1.1\r\nHost: localhost\r\nContent-Length: {}\r\n\r\n",
            body.len()
        );
        let mut raw = head.into_bytes();
        raw.extend_from_slice(body);
        let response = String::from_utf8_lossy(&raw_request(port, &raw)).into_owned();
        assert!(response.starts_with("HTTP/1.1 200 OK"), "{response}");
        assert!(response.contains("\"success\":true"), "{response}");
        assert!(response.contains("\"extension\":\"schem\""), "{response}");

        let url_start = response.find("/local-files/").expect("url in payload");
        let url_end = response[url_start..].find('"').expect("url end") + url_start;
        let url = &response[url_start..url_end];
        let fetched = raw_request(port, format!("GET {url} HTTP/1.1\r\nHost: localhost\r\n\r\n").as_bytes());
        let fetched_text = String::from_utf8_lossy(&fetched).into_owned();
        assert!(fetched_text.starts_with("HTTP/1.1 200 OK"), "{fetched_text}");
        assert!(fetched.ends_with(body), "拿回来的字节应该和上传的一致");
        assert!(fetched_text.contains("X-File-Extension: schem"));

        let rejected = text_request(
            port,
            "POST /local/upload?name=bad.txt HTTP/1.1\r\nHost: localhost\r\nContent-Length: 3\r\n\r\nabc",
        );
        assert!(rejected.starts_with("HTTP/1.1 400"), "{rejected}");
    }

    #[test]
    fn blocks_path_traversal() {
        let Some(root) = web_root() else {
            eprintln!("跳过：找不到站点镜像目录");
            return;
        };
        let server = OfflineServer::start_with_library(root, None).expect("start server");
        let port = server.port();

        for target in ["/../Cargo.toml", "/%2e%2e/Cargo.toml", "/studio/../../Cargo.toml"] {
            let response = text_request(port, &format!("GET {target} HTTP/1.1\r\nHost: localhost\r\n\r\n"));
            assert!(
                response.starts_with("HTTP/1.1 404"),
                "{target} 不应该被放行：{response}"
            );
        }
    }

    #[test]
    fn hands_a_registered_projection_to_the_editor() {
        let Some(root) = web_root() else {
            eprintln!("跳过：找不到站点镜像目录");
            return;
        };
        let server = OfflineServer::start_with_library(root, None).expect("start server");
        let port = server.port();

        let body: &[u8] = b"registered-schematic-bytes";
        let key = server
            .register_projection("我的蓝图.schem", body.to_vec())
            .expect("register projection");

        
        let fetched = raw_request(
            port,
            format!("GET /local-files/{key} HTTP/1.1\r\nHost: localhost\r\n\r\n").as_bytes(),
        );
        let fetched_text = String::from_utf8_lossy(&fetched).into_owned();
        assert!(fetched_text.starts_with("HTTP/1.1 200 OK"), "{fetched_text}");
        assert!(fetched.ends_with(body), "拿回来的字节应该和登记的一致");
        assert!(fetched_text.contains("X-File-Extension: schem"), "{fetched_text}");

        
        let open = server.open_url(&key, "我的蓝图");
        assert!(open.starts_with(&server.base_url()), "{open}");
        let open_path = open.trim_start_matches(&server.base_url());
        let shim = text_request(
            port,
            &format!("GET /{open_path} HTTP/1.1\r\nHost: localhost\r\n\r\n"),
        );
        assert!(shim.starts_with("HTTP/1.1 200 OK"), "{shim}");
        assert!(
            shim.contains("'studio_source_type','projection_url'"),
            "{shim}"
        );
        assert!(
            shim.contains(&format!("'studio_projection_url',\"/local-files/{key}\"")),
            "{shim}"
        );
        assert!(
            shim.contains("'studio_building_name',\"我的蓝图\""),
            "{shim}"
        );
        assert!(shim.contains("location.replace('/studio/editor')"), "{shim}");

        
        let missing = text_request(
            port,
            "GET /local/open?key=nope HTTP/1.1\r\nHost: localhost\r\n\r\n",
        );
        assert!(missing.starts_with("HTTP/1.1 404"), "{missing}");

        
        assert!(server.register_projection("notes.txt", b"x".to_vec()).is_err());
        assert!(server.register_projection("empty.schem", Vec::new()).is_err());
    }

    
    #[test]
    fn saving_a_library_projection_writes_back_to_the_source_file() {
        let Some(root) = web_root() else {
            eprintln!("跳过：找不到站点镜像目录");
            return;
        };
        use base64::Engine as _;

        let saved = Arc::new(Mutex::new(Vec::<(i64, Vec<u8>)>::new()));
        let server =
            OfflineServer::start_with_library(root, Some(fake_library(Arc::clone(&saved))))
                .expect("start server");
        let port = server.port();

        
        let opened = text_request(
            port,
            "GET /local/open-schematic?id=7 HTTP/1.1\r\nHost: localhost\r\n\r\n",
        );
        assert!(opened.starts_with("HTTP/1.1 200 OK"), "{opened}");
        let key = first_file_key(&opened);

        
        let target = text_request(
            port,
            &format!("GET /local/save-target?key={key} HTTP/1.1\r\nHost: localhost\r\n\r\n"),
        );
        assert!(target.contains("\"source\":true"), "{target}");
        assert!(target.contains("小房子.litematic"), "{target}");

        
        let edited = gzip_like("edited-house");
        let body = format!(
            "{{\"name\":\"小房子\",\"sourceFormat\":\"litematic\",\"originalData\":\"{}\"}}",
            base64::engine::general_purpose::STANDARD.encode(&edited)
        );
        let response = text_request(
            port,
            &format!(
                "POST /api/studio/works?local_projection={key} HTTP/1.1\r\nHost: localhost\r\n\
                 Content-Type: application/json\r\nContent-Length: {}\r\n\r\n{body}",
                body.len()
            ),
        );
        assert!(response.starts_with("HTTP/1.1 200 OK"), "{response}");
        assert!(response.contains("\"success\":true"), "{response}");
        assert!(response.contains("\"id\":\"local-7\""), "{response}");

        {
            let written = saved.lock().unwrap_or_else(|error| error.into_inner());
            assert_eq!(written.len(), 1, "应该只写回一次");
            assert_eq!(written[0].0, 7, "写回的是第 7 份蓝图");
            assert_eq!(written[0].1, edited, "写回的字节应该就是编辑器交上来的");
        }

        
        let fetched = raw_request(
            port,
            format!("GET /local-files/{key} HTTP/1.1\r\nHost: localhost\r\n\r\n").as_bytes(),
        );
        assert!(fetched.ends_with(&edited), "内存里的投影没跟着更新");

        
        let plain = format!(
            "{{\"name\":\"小房子\",\"sourceFormat\":\"litematic\",\"originalData\":\"{}\"}}",
            base64::engine::general_purpose::STANDARD.encode(b"not-compressed")
        );
        let refused = text_request(
            port,
            &format!(
                "POST /api/studio/works?local_projection={key} HTTP/1.1\r\nHost: localhost\r\n\
                 Content-Type: application/json\r\nContent-Length: {}\r\n\r\n{plain}",
                plain.len()
            ),
        );
        assert!(refused.starts_with("HTTP/1.1 400"), "{refused}");
        assert!(refused.contains("\"success\":false"), "{refused}");
        assert_eq!(
            saved.lock().unwrap_or_else(|error| error.into_inner()).len(),
            1,
            "被拒绝的保存不该落盘"
        );

        
        let wrong_format = format!(
            "{{\"name\":\"小房子\",\"sourceFormat\":\"txt\",\"originalData\":\"{}\"}}",
            base64::engine::general_purpose::STANDARD.encode(&edited)
        );
        let wrong = text_request(
            port,
            &format!(
                "POST /api/studio/works?local_projection={key} HTTP/1.1\r\nHost: localhost\r\n\
                 Content-Type: application/json\r\nContent-Length: {}\r\n\r\n{wrong_format}",
                wrong_format.len()
            ),
        );
        assert!(wrong.starts_with("HTTP/1.1 400"), "{wrong}");
    }

    
    #[test]
    fn refuses_to_save_a_projection_without_a_source_file() {
        let Some(root) = web_root() else {
            eprintln!("跳过：找不到站点镜像目录");
            return;
        };
        use base64::Engine as _;

        let saved = Arc::new(Mutex::new(Vec::<(i64, Vec<u8>)>::new()));
        let server =
            OfflineServer::start_with_library(root, Some(fake_library(Arc::clone(&saved))))
                .expect("start server");
        let port = server.port();

        let uploaded = raw_request(
            port,
            b"POST /local/upload?name=%E6%8B%96%E5%85%A5.litematic HTTP/1.1\r\nHost: localhost\r\n\
              Content-Length: 12\r\n\r\ndragged-data",
        );
        let uploaded = String::from_utf8_lossy(&uploaded).into_owned();
        assert!(uploaded.starts_with("HTTP/1.1 200 OK"), "{uploaded}");
        let key = first_file_key(&uploaded);

        
        let target = text_request(
            port,
            &format!("GET /local/save-target?key={key} HTTP/1.1\r\nHost: localhost\r\n\r\n"),
        );
        assert!(target.contains("\"source\":false"), "{target}");

        let body = format!(
            "{{\"name\":\"拖入\",\"sourceFormat\":\"litematic\",\"originalData\":\"{}\"}}",
            base64::engine::general_purpose::STANDARD.encode(gzip_like("dragged"))
        );
        let response = text_request(
            port,
            &format!(
                "POST /api/studio/works?local_projection={key} HTTP/1.1\r\nHost: localhost\r\n\
                 Content-Type: application/json\r\nContent-Length: {}\r\n\r\n{body}",
                body.len()
            ),
        );
        assert!(response.starts_with("HTTP/1.1 400"), "{response}");
        assert!(response.contains("没有可写回的源文件"), "{response}");
        assert_eq!(
            saved.lock().unwrap_or_else(|error| error.into_inner()).len(),
            0,
            "不该碰任何源文件"
        );
    }

    
    #[test]
    fn falls_back_to_the_last_projection_handed_to_the_editor() {
        let Some(root) = web_root() else {
            eprintln!("跳过：找不到站点镜像目录");
            return;
        };
        use base64::Engine as _;

        let saved = Arc::new(Mutex::new(Vec::<(i64, Vec<u8>)>::new()));
        let server =
            OfflineServer::start_with_library(root, Some(fake_library(Arc::clone(&saved))))
                .expect("start server");
        let port = server.port();

        let opened = text_request(
            port,
            "GET /local/open-schematic?id=9 HTTP/1.1\r\nHost: localhost\r\n\r\n",
        );
        let key = first_file_key(&opened);
        
        let fetched = raw_request(
            port,
            format!("GET /local-files/{key} HTTP/1.1\r\nHost: localhost\r\n\r\n").as_bytes(),
        );
        assert!(fetched.ends_with(&gzip_like("tower-bytes")));

        let edited = gzip_like("edited-tower");
        let body = format!(
            "{{\"name\":\"塔\",\"sourceFormat\":\"schem\",\"originalData\":\"{}\"}}",
            base64::engine::general_purpose::STANDARD.encode(&edited)
        );
        
        let response = text_request(
            port,
            &format!(
                "POST /api/studio/works HTTP/1.1\r\nHost: localhost\r\n\
                 Content-Type: application/json\r\nContent-Length: {}\r\n\r\n{body}",
                body.len()
            ),
        );
        assert!(response.starts_with("HTTP/1.1 200 OK"), "{response}");
        assert!(response.contains("\"id\":\"local-9\""), "{response}");

        let written = saved.lock().unwrap_or_else(|error| error.into_inner());
        assert_eq!(written.len(), 1);
        assert_eq!(written[0].0, 9);
        assert_eq!(written[0].1, edited);
    }

    
    fn gzip_like(tag: &str) -> Vec<u8> {
        let mut bytes = vec![0x1f, 0x8b, 0x08, 0x00];
        bytes.extend_from_slice(tag.as_bytes());
        bytes
    }

    
    fn fake_library(saved: Arc<Mutex<Vec<(i64, Vec<u8>)>>>) -> Library {
        Library::new(
            || {
                vec![
                    LibraryEntry {
                        id: 7,
                        name: "小房子".to_string(),
                        extension: "litematic".to_string(),
                        size: "12 × 34 × 56".to_string(),
                        updated_at: "2026-09-19 22:34".to_string(),
                    },
                    LibraryEntry {
                        id: 9,
                        name: "塔".to_string(),
                        extension: "schem".to_string(),
                        size: String::new(),
                        updated_at: String::new(),
                    },
                ]
            },
            |id| match id {
                7 => Ok(("小房子.litematic".to_string(), gzip_like("house-bytes"))),
                9 => Ok(("塔.schem".to_string(), gzip_like("tower-bytes"))),
                _ => Err(String::from("蓝图不存在")),
            },
            move |id, data| match id {
                7 | 9 => {
                    saved
                        .lock()
                        .unwrap_or_else(|error| error.into_inner())
                        .push((id, data.to_vec()));
                    Ok(format!("schematic_1.0.{id}.litematic"))
                }
                _ => Err(String::from("蓝图不存在")),
            },
        )
    }

    
    fn first_file_key(response: &str) -> String {
        let prefix = "/local-files/";
        let start = response.find(prefix).expect("响应里应有 /local-files/") + prefix.len();
        let end = start + response[start..].find('"').expect("key 后面应有引号");
        response[start..end].to_string()
    }

    #[test]
    fn lists_the_local_library_and_opens_a_blueprint() {
        let Some(root) = web_root() else {
            eprintln!("跳过：找不到站点镜像目录");
            return;
        };
        let server = OfflineServer::start_with_library(
            root,
            Some(fake_library(Arc::new(Mutex::new(Vec::new())))),
        )
        .expect("start server");
        let port = server.port();

        let list = text_request(port, "GET /local/schematics HTTP/1.1\r\nHost: localhost\r\n\r\n");
        assert!(list.starts_with("HTTP/1.1 200 OK"), "{list}");
        assert!(list.contains("\"success\":true"), "{list}");
        assert!(list.contains("\"id\":7"), "{list}");
        assert!(list.contains("\"name\":\"小房子\""), "{list}");
        assert!(list.contains("\"size\":\"12 × 34 × 56\""), "{list}");
        assert!(list.contains("\"extension\":\"schem\""), "{list}");

        
        let opened = text_request(
            port,
            "GET /local/open-schematic?id=7 HTTP/1.1\r\nHost: localhost\r\n\r\n",
        );
        assert!(opened.starts_with("HTTP/1.1 200 OK"), "{opened}");
        assert!(opened.contains("'studio_building_name',\"小房子\""), "{opened}");
        assert!(opened.contains("location.replace('/studio/editor')"), "{opened}");

        let key = first_file_key(&opened);
        let fetched = raw_request(
            port,
            format!("GET /local-files/{key} HTTP/1.1\r\nHost: localhost\r\n\r\n").as_bytes(),
        );
        assert!(
            fetched.ends_with(b"house-bytes"),
            "蓝图字节应该原样交给编辑器"
        );

        
        for target in [
            "/local/open-schematic?id=404",
            "/local/open-schematic?id=abc",
            "/local/open-schematic",
        ] {
            let failed = text_request(
                port,
                &format!("GET {target} HTTP/1.1\r\nHost: localhost\r\n\r\n"),
            );
            assert!(failed.starts_with("HTTP/1.1 404"), "{target}：{failed}");
            assert!(failed.contains("无法打开投影"), "{target}：{failed}");
        }
    }

    #[test]
    fn says_so_when_the_library_is_missing_and_patches_out_login_ui() {
        let Some(root) = web_root() else {
            eprintln!("跳过：找不到站点镜像目录");
            return;
        };
        let server = OfflineServer::start_with_library(root, None).expect("start server");
        let port = server.port();

        
        let list = text_request(port, "GET /local/schematics HTTP/1.1\r\nHost: localhost\r\n\r\n");
        assert!(list.contains("\"success\":false"), "{list}");
        assert!(list.contains("本地蓝图库不可用"), "{list}");

        let opened = text_request(
            port,
            "GET /local/open-schematic?id=1 HTTP/1.1\r\nHost: localhost\r\n\r\n",
        );
        assert!(opened.starts_with("HTTP/1.1 404"), "{opened}");

        
        let editor = text_request(port, "GET /studio/editor HTTP/1.1\r\nHost: localhost\r\n\r\n");
        assert!(editor.starts_with("HTTP/1.1 200 OK"), "{editor}");
        assert!(editor.contains("mcb-offline-patch"), "补丁没注入：{editor}");
        assert!(
            editor.contains("a[href=\"/login\"]"),
            "登录入口没被藏起来：{editor}"
        );
        assert!(
            editor.contains("未登录\\s*·\\s*"),
            "「未登录 · 本地编辑」的改写规则没带上"
        );

        
        
        assert!(editor.contains("img[src*=\"/logo/\"]"), "品牌图片没被藏起来");
        assert!(editor.contains("Icon_Stuido"), "Studio 图标没被藏起来");
        assert!(editor.contains("长沙引擎猫科技有限公司"), "公司名的改写规则没带上");
        assert!(editor.contains("mcblock\\.top"), "站点域名的改写规则没带上");
        assert!(editor.contains("\\bStudio\\b"), "Studio 产品名的改写规则没带上");
        assert!(editor.contains("方块工坊"), "品牌中文名的改写规则没带上");

        
        let patch_at = editor.find("mcb-offline-patch").expect("补丁位置");
        let body_at = editor.rfind("</body>").expect("应有 </body>");
        assert!(patch_at < body_at, "补丁插到了 </body> 之后");
        assert!(editor.contains("</html>"), "页面尾部被截断了");
    }

    #[test]
    fn blanks_analytics_ids_without_touching_the_rest_of_the_page() {
        
        
        let page = concat!(
            r#"<html><head><link rel="preload" href="/__offline-noop.js?id=G-ABCDEFGHIJ" as="script"/></head>"#,
            r#"<body><script>self.__next_f.push([1,"[{\"$La\",null,{\"gaId\":\"G-ABCDEFGHIJ\"}}]"])</script>"#,
            r#"<script>window.__CFG__={"gaId":"G-ABCDEFGHIJ"};</script></body></html>"#,
        );

        let out = inject_offline_patch(page);
        let scrubbed = scrub_analytics_ids(page);

        assert!(!scrubbed.contains("G-ABCDEFGHIJ"), "量测 ID 没清干净：{scrubbed}");
        assert!(scrubbed.contains(r#""gaId":"""#), "普通写法没置空：{scrubbed}");
        
        assert!(
            scrubbed.contains(r#"\"gaId\":\"\""#),
            "飞行数据里的转义写法没置空：{scrubbed}"
        );
        assert!(
            scrubbed.contains(r#"href="/__offline-noop.js""#),
            "预加载链接上的查询参数没摘掉：{scrubbed}"
        );
        
        
        assert_eq!(
            scrubbed.matches('"').count(),
            page.matches('"').count(),
            "引号数量变了，字符串/JSON 结构被破坏：{scrubbed}"
        );

        
        assert!(!out.contains("G-ABCDEFGHIJ"), "补丁层也应清干净：{out}");
        assert!(out.contains("mcb-offline-patch"), "补丁没插进去");
        assert!(out.ends_with("</html>"), "页面尾部被截断：{out}");
    }

    #[test]
    fn the_shipped_editor_page_has_no_analytics_id() {
        let Some(root) = web_root() else {
            eprintln!("跳过：找不到站点镜像目录");
            return;
        };
        let page = fs::read_to_string(root.join("studio/editor/index.html")).expect("读编辑器页");
        assert!(
            !page.contains("G-P5QMJ6H9ZH") && !page.contains("googletagmanager"),
            "编辑器产物里还留着站点的量测 ID / 统计域名"
        );
    }

    #[test]
    fn clears_seo_meta_values_in_flight_data() {
        
        
        let page = concat!(
            r#"<html><head>"#,
            r#"<meta name="twitter:description" content="站点原始简介"/>"#,
            r#"<title>投影编辑器</title></head><body><script>self.__next_f.push([1,"["#,
            r#"[{\"$L\",null,{\"name\":\"viewport\",\"content\":\"width=device-width, initial-scale=1\"}}]"#,
            r#",[{\"$L\",null,{\"name\":\"keywords\",\"content\":\"投影编辑器, mcblock, 建筑库\"}}]"#,
            r#",[{\"$L\",null,{\"property\":\"og:url\",\"content\":\"https://localhost\"}}]"#,
            r#",[{\"$L\",null,{\"name\":\"baidu-site-verification\",\"content\":\"codeva-SECRET\"}}]"#,
            r#",[{\"$L\",null,{\"property\":\"og:image\",\"content\":\"https://localhost/a.png\"}}]"#,
            r#",[{\"$L\",null,{\"rel\":\"canonical\",\"href\":\"https://localhost/studio\"}}]"#,
            r#""])</script></body></html>"#,
        );

        let out = scrub_identity_metadata(&page);

        assert!(!out.contains("mcblock"), "keywords 里的来源词没清掉：{out}");
        assert!(!out.contains("codeva-SECRET"), "百度的校验串没清掉：{out}");
        assert!(!out.contains("https://localhost"), "og / canonical 里的地址没清掉：{out}");
        assert!(!out.contains("站点原始简介"), "HTML 属性写法的简介没清掉：{out}");

        
        assert!(out.contains(r#"\"name\":\"keywords\",\"content\":\"\""#), "{out}");
        assert!(out.contains(r#"\"rel\":\"canonical\",\"href\":\"\""#), "{out}");
        assert!(out.contains(r#"name="twitter:description" content="""#), "{out}");

        
        assert!(out.contains("width=device-width, initial-scale=1"), "{out}");
        assert!(out.contains("<title>投影编辑器</title>"), "{out}");

        
        assert_eq!(
            out.matches('"').count(),
            page.matches('"').count(),
            "引号数量变了，结构被破坏：{out}"
        );
    }

    #[test]
    fn clears_json_ld_payload_without_breaking_the_string() {
        
        
        let page = concat!(
            r#"<html><body><script>self.__next_f.push([1,"["#,
            r#"[{\"$L\",null,{\"type\":\"application/ld+json\",\"dangerouslySetInnerHTML\":{\"__html\":\"{\\\"@type\\\":\\\"WebSite\\\",\\\"alternateName\\\":[\\\"\\\",\\\"mcblock\\\"],\\\"url\\\":\\\"https://localhost\\\"}\"}}]"#,
            r#""])</script></body></html>"#,
        );

        let out = scrub_identity_metadata(&page);

        
        assert!(out.contains(r#"\"__html\":\"\"}}"#), "载荷没被清空：{out}");
        assert!(!out.contains("WebSite"), "@type 还在：{out}");
        assert!(!out.contains("alternateName"), "alternateName 还在：{out}");
        assert!(!out.contains("mcblock"), "alternateName 里的来源词还在：{out}");
        assert!(!out.contains("https://localhost"), "JSON-LD 里的地址还在：{out}");
        assert!(!out.contains("schema.org"), "{out}");
        
        assert!(out.contains("application/ld+json"), "{out}");
        assert!(out.ends_with("</html>"), "页面尾部被截断：{out}");
    }

    #[test]
    fn the_served_editor_page_has_no_origin_metadata() {
        let Some(root) = web_root() else {
            eprintln!("跳过：找不到站点镜像目录");
            return;
        };
        
        
        
        
        let raw = fs::read_to_string(root.join("studio/editor/index.html")).expect("读编辑器页");
        let cleaned = scrub_identity_metadata(&raw);

        
        for token in [
            "codeva-A3MVb3CJFT",
            "46074FC7EDA3429BC120E2AA240CCF73",
            "mcblock",
            "alternateName",
            "schema.org",
        ] {
            assert!(!cleaned.contains(token), "编辑器页里还有 `{token}`");
        }
        
        assert!(!cleaned.contains("localhost"), "og / 微信卡片里的站点地址没清掉");
        assert!(!cleaned.contains("官方站"), "微信卡片里的「官方站」文案没清掉");
        assert!(cleaned.contains(r#"\"__html\":\"\""#), "JSON-LD 载荷没清空");

        
        assert!(cleaned.contains("width=device-width, initial-scale=1"), "viewport 被误伤");

        
        assert_eq!(
            cleaned.matches("__next_f.push(").count(),
            cleaned.matches("\"])</script>").count(),
            "飞行数据脚本行被截断了"
        );
        
        assert_eq!(cleaned.matches('"').count() % 2, 0, "引号不成对，字符串结构被破坏");

        
        let served = inject_offline_patch(&raw);
        assert!(served.contains("mcb-offline-patch"), "补丁没插进去");
        assert!(served.contains("</html>"), "页面尾部被截断");
    }

    
    
    
    
    #[test]
    fn the_served_editor_page_ships_the_save_confirmation_guard() {
        let Some(root) = web_root() else {
            eprintln!("跳过：找不到站点镜像目录");
            return;
        };
        let raw = fs::read_to_string(root.join("studio/editor/index.html")).expect("读编辑器页");
        let served = inject_offline_patch(&raw);

        for token in [
            "installSaveGuard",
            "mcb-save-confirm",
            "/local/save-target",
            "local_projection=",
            "覆盖源文件？",
            "确认覆盖",
            "已取消保存，源文件未改动。",
            
            "'另存副本': '保存'",
        ] {
            assert!(
                served.contains(token),
                "编辑器页里少了保存确认环节的 `{token}`"
            );
        }

        
        assert!(
            served.contains("结构编辑会按原格式写回源文件。"),
            "结构编辑的措辞还停留在云端副本"
        );
    }

    
    
    
    
    
    
    #[test]
    fn the_offline_patch_keeps_the_editor_save_button_visible() {
        let Some(root) = web_root() else {
            eprintln!("跳过：找不到站点镜像目录");
            return;
        };
        let raw = fs::read_to_string(root.join("studio/editor/index.html")).expect("读编辑器页");
        let served = inject_offline_patch(&raw);

        assert!(
            !served.contains("eb-save"),
            "补丁又把编辑器工具栏的保存按钮（`.eb-save`）藏起来了 —— 保存已经能写回源文件，按钮得留着"
        );
        assert!(
            !served.contains("eb-export"),
            "补丁把「导出投影」按钮也藏了，导出是另一个入口，不能跟着一起没"
        );
        
        assert!(
            served.contains(r#"a[href="/login"]"#),
            "登录链接的隐藏规则被一起删掉了"
        );
    }

    
    
    
    
    
    #[test]
    fn real_mirror_serves_the_editor_page() {
        let Some(root) = web_root() else {
            eprintln!("跳过：找不到站点镜像目录");
            return;
        };
        let server = OfflineServer::start_with_library(root.clone(), None).expect("启动服务");
        let port = server.port();

        let page = text_request(port, "GET /studio/editor HTTP/1.1\r\nHost: localhost\r\n\r\n");
        assert!(page.starts_with("HTTP/1.1 200 OK"), "{page}");
        assert!(page.contains("投影编辑器"), "编辑器页拿不到标题，多半是镜像里的页面换了");

        let mut refs: Vec<String> = Vec::new();
        for token in page.split(['"', '\'', '(', ')', ' ']) {
            
            let candidate = token.trim_matches('\\');
            if candidate.starts_with("/_next/")
                && !candidate.contains('\\')
                && !refs.contains(&candidate.to_string())
            {
                refs.push(candidate.to_string());
            }
        }
        assert!(!refs.is_empty(), "编辑器页没有引用任何 /_next/ 资源");

        let missing = refs
            .iter()
            .filter(|reference| resolve_file(&root, reference.trim_start_matches('/')).is_none())
            .cloned()
            .collect::<Vec<_>>();
        assert!(missing.is_empty(), "编辑器页引用了不存在的资源：{missing:?}");
    }
}
