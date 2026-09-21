// mod-shared.mjs — 模组装载器生命周期脚本的公共依赖
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const BLOCKID = path.join(ROOT, 'src-tauri', 'data', 'editor', 'web', 'uploads', 'buildings', 'blockID');
export const DB_PATH = path.join(BLOCKID, 'minecraft_blocks_database.json');
export const FACE_PATH = path.join(BLOCKID, 'block-face-textures.json');
export const IMAGES_DIR = path.join(BLOCKID, 'images');
// 3D 面贴图目录：编辑器 h() 用 `block-textures/` + block-face-textures.json[blockId] 取面贴图，
// 与 images/（图标/平面贴图）是两套，方块必须两边都有 PNG，否则 3D 渲染会变粉色缺贴图。
export const BLOCK_TEXTURES_DIR = path.join(BLOCKID, 'block-textures');
// 3D 真正用的资源包（预烘焙）：编辑器渲染器读 `mcmeta/atlas.png` + atlas-uv.json +
// block-models.json + block-definitions.json，而不是逐方块读 PNG。
// 只改 images/block-textures 无法让模组方块上色 —— 必须同时扩展这里的图集与模型表。
export const MCMETA_DIR = path.join(BLOCKID, 'mcmeta');
export const ATLAS_PNG = path.join(MCMETA_DIR, 'atlas.png');
export const ATLAS_UV = path.join(MCMETA_DIR, 'atlas-uv.json');
export const BLOCK_MODELS = path.join(MCMETA_DIR, 'block-models.json');
export const BLOCK_DEFS = path.join(MCMETA_DIR, 'block-definitions.json');
export const BLOCK_PROPS = path.join(MCMETA_DIR, 'block-default-properties.json');
// 模组图集占用登记表：记录每个模组占用的图集格子 / 模型 / 定义，供禁用、卸载时精确回滚
export const ATLAS_REGISTRY = path.join(MCMETA_DIR, '.mod-atlas.json');
export const IMPORT_DIR = path.join(ROOT, 'src-tauri', 'data', 'editor', 'import', 'mods');

export function loadDb() { return JSON.parse(fs.readFileSync(DB_PATH, 'utf8')); }
export function saveDb(db) { fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8'); }
export function loadFace() { return JSON.parse(fs.readFileSync(FACE_PATH, 'utf8')); }
export function saveFace(face) { fs.writeFileSync(FACE_PATH, JSON.stringify(face, null, 2), 'utf8'); }
export function readManifest(modid) {
  const p = path.join(IMPORT_DIR, `${modid}.manifest.json`);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

// 从 DB 中移除 minecraft_ids[].id ∈ blockSet 的条目，返回 { kept, removed }
export function removeEntries(db, blockSet) {
  const kept = [];
  const removed = [];
  for (const e of db) {
    if ((e.minecraft_ids || []).some(m => blockSet.has(m.id))) removed.push(e);
    else kept.push(e);
  }
  return { kept, removed };
}

// 从 face 对象中删除 blockSet 的键，返回删除数量
export function removeFromFace(face, blockSet) {
  let n = 0;
  for (const k of Object.keys(face)) {
    if (blockSet.has(k)) { delete face[k]; n++; }
  }
  return n;
}

// 当前 DB 中已存在的 id 集合
export function existingIds(db) {
  const s = new Set();
  for (const e of db) for (const m of (e.minecraft_ids || [])) s.add(m.id);
  return s;
}
