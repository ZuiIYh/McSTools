// mod-repair.mjs <modid>
// 修复已安装模组的 manifest：补全 entries（完整 DB 条目）与缓存 PNG 目录。
// 用于在历史 mod-loader（未写 entries/缓存）已 apply 的模组上启用 enable/disable 能力。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const BLOCKID = path.join(ROOT, 'src-tauri', 'data', 'editor', 'web', 'uploads', 'buildings', 'blockID');
const DB_PATH = path.join(BLOCKID, 'minecraft_blocks_database.json');
const IMAGES_DIR = path.join(BLOCKID, 'images');
const IMPORT_DIR = path.join(ROOT, 'src-tauri', 'data', 'editor', 'import', 'mods');

const modid = process.argv[2];
if (!modid) { console.error('usage: mod-repair.mjs <modid>'); process.exit(2); }

const manifestPath = path.join(IMPORT_DIR, `${modid}.manifest.json`);
if (!fs.existsSync(manifestPath)) { console.error(`manifest 不存在: ${manifestPath}`); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const blockSet = new Set(manifest.blocks || []);

// 从 DB 反推属于本模组的完整条目
const entries = db.filter(e => (e.minecraft_ids || []).some(m => blockSet.has(m.id)));

// 缓存 PNG 到 import/mods/<modid>/
const cacheDir = path.join(IMPORT_DIR, modid);
fs.mkdirSync(cacheDir, { recursive: true });
let cached = 0;
for (const img of (manifest.imageFiles || [])) {
  const src = path.join(IMAGES_DIR, img);
  const dst = path.join(cacheDir, img);
  if (fs.existsSync(src) && !fs.existsSync(dst)) { fs.copyFileSync(src, dst); cached++; }
}

manifest.entries = entries;
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log(`已修复 manifest=${modid}: 收集 entries=${entries.length}, 缓存 PNG=${cached}, 待缓存总数=${manifest.imageFiles.length}`);
