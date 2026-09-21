// mod-lang.mjs <modid> [jarPath] [--dry-run]
//
// 只补「方块显示名」（中文名 / 英文名），不动几何、图集与渲染提示。
// 背景：旧版导入从不缓存 assets/<ns>/lang/，于是 643 个 create 方块的中文名全空、
// 英文名也只是 titleCase 从 id 猜的。重新导入 jar 固然能修好，但那会重跑整条
// 几何+图集链路（几十秒，且图集重新分配会让替代贴图洗牌）。本脚本只补名字。
//
// jar 路径的可取来源：命令行参数 > manifest.sourceJar（导入时记下的原始 jar 绝对路径）。
import fs from 'node:fs';
import path from 'node:path';
import { DB_PATH, IMPORT_DIR, readManifest } from './mod-shared.mjs';
import { extractJar } from './mod-loader.mjs';

const LANG_ONLY = /^assets\/[^/]+\/lang\/.+$/;

function parseArgs(argv) {
  const a = { modid: null, jar: null, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const x = argv[i];
    if (x === '--dry-run') a.dryRun = true;
    else if (x.startsWith('--jar=')) a.jar = x.slice('--jar='.length);
    else if (x === '--jar') a.jar = argv[++i];
    else if (!a.modid) a.modid = x;
    else if (!a.jar) a.jar = x;
  }
  return a;
}

function loadLang(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return {}; }
}

/** 方块 id → { zh, en }（取自 jar 的 lang 文件） */
function buildNameMap(assetsDir, blockIds) {
  const map = new Map();
  let namespaces = [];
  try {
    namespaces = fs.readdirSync(assetsDir).filter((n) => fs.statSync(path.join(assetsDir, n)).isDirectory());
  } catch { return { map, namespaces }; }
  for (const ns of namespaces) {
    const langDir = path.join(assetsDir, ns, 'lang');
    const zh = loadLang(path.join(langDir, 'zh_cn.json'));
    const en = loadLang(path.join(langDir, 'en_us.json'));
    if (!Object.keys(zh).length && !Object.keys(en).length) continue;
    // 语言键不随语言变化，两边键名完全一致：block.<ns>.<name>
    const pick = (d, ns2, name) => d[`block.${ns2}.${name}`] || d[`${ns2}.${name}`] || d[`tile.${ns2}.${name}`] || '';
    for (const id of blockIds) {
      const cut = id.indexOf(':');
      if (cut < 0) continue;
      const bns = id.slice(0, cut), name = id.slice(cut + 1);
      if (bns !== ns) continue;
      const z = pick(zh, ns, name), e = pick(en, ns, name);
      if (z || e) map.set(id, { zh: z, en: e });
    }
  }
  return { map, namespaces };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.modid) {
    console.error('usage: mod-lang.mjs <modid> [jarPath] [--dry-run]');
    process.exit(2);
  }
  const man = readManifest(args.modid);
  if (!man) {
    console.error(`manifest 不存在: ${args.modid}`);
    process.exit(1);
  }
  const jar = args.jar || man.sourceJar;
  if (!jar) {
    console.error(`没有 jar 路径：请显式传入，或重新导入一次（导入后 manifest 会记下 sourceJar）`);
    process.exit(1);
  }
  if (!fs.existsSync(jar)) {
    console.error(`jar 不存在: ${jar}`);
    process.exit(1);
  }

  const t0 = Date.now();
  const dir = extractJar(jar, LANG_ONLY);
  const blockIds = man.blocks || (man.entries || []).map((e) => e.minecraft_ids && e.minecraft_ids[0] && e.minecraft_ids[0].id).filter(Boolean);
  const { map, namespaces } = buildNameMap(path.join(dir, 'assets'), blockIds);
  fs.rmSync(dir, { recursive: true, force: true });

  const withZh = [...map.values()].filter((v) => v.zh).length;
  console.log(`从 ${path.basename(jar)} 读到 ${map.size} 个方块名（其中中文 ${withZh} 个），命名空间 ${JSON.stringify(namespaces)}，耗时 ${Date.now() - t0}ms`);

  // 回填 DB
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  let dbChanged = 0;
  for (const e of db) {
    if (e.version !== `MOD:${args.modid}`) continue;
    const id = e.minecraft_ids && e.minecraft_ids[0] && e.minecraft_ids[0].id;
    const hit = id && map.get(id);
    if (!hit) continue;
    let dirty = false;
    if (hit.zh && hit.zh !== e.chinese_name) { e.chinese_name = hit.zh; dirty = true; }
    if (hit.en && hit.en !== e.english_name) { e.english_name = hit.en; dirty = true; }
    if (dirty) dbChanged++;
  }
  // 回填 manifest（启用时是拿它原样恢复的，两边必须同步）
  let manChanged = 0;
  for (const e of (man.entries || [])) {
    const id = e.minecraft_ids && e.minecraft_ids[0] && e.minecraft_ids[0].id;
    const hit = id && map.get(id);
    if (!hit) continue;
    let dirty = false;
    if (hit.zh && hit.zh !== e.chinese_name) { e.chinese_name = hit.zh; dirty = true; }
    if (hit.en && hit.en !== e.english_name) { e.english_name = hit.en; dirty = true; }
    if (dirty) manChanged++;
  }
  // 记录 jar 来源，下次不必再传
  if (args.jar && man.sourceJar !== args.jar) man.sourceJar = args.jar;

  if (!args.dryRun) {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
    fs.writeFileSync(path.join(IMPORT_DIR, `${args.modid}.manifest.json`), JSON.stringify(man, null, 2), 'utf8');
  }
  console.log(`DB 更新 ${dbChanged} 条，manifest 更新 ${manChanged} 条${args.dryRun ? '（dry-run，未写盘）' : ''}`);
  console.log('RESULT_JSON=' + JSON.stringify({ ok: true, modid: args.modid, namesRead: map.size, withChinese: withZh, dbChanged, manChanged, dryRun: args.dryRun }));
}

main();
