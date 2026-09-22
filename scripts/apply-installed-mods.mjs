// apply-installed-mods.mjs
// 换镜像（restore-mirror 整包覆盖）后，重灌所有已启用的模组方块。
// 不依赖 jar：直接从 import/mods/<modid>/ 缓存恢复 PNG 与 DB 条目 + 重新注入 3D 图集/模型。
import { IMPORT_DIR, isMainModule } from './mod-shared.mjs';
import { enableMod } from './mod-enable.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export async function applyInstalledMods() {
  if (!fs.existsSync(IMPORT_DIR)) return { applied: 0, missing: [] };
  const files = fs.readdirSync(IMPORT_DIR).filter(f => f.endsWith('.manifest.json'));
  let applied = 0;
  const missing = [];
  for (const f of files) {
    const modid = f.slice(0, -'.manifest.json'.length);
    let m;
    try { m = JSON.parse(fs.readFileSync(path.join(IMPORT_DIR, f), 'utf8')); }
    catch { missing.push(modid + ': manifest 解析失败'); continue; }
    if (m.enabled === true) {
      const r = await enableMod(modid, false);
      if (r.ok) applied++;
      else missing.push(modid + ': ' + r.reason);
    }
  }
  return { applied, missing };
}

const isMain = isMainModule(import.meta.url);
if (isMain) {
  applyInstalledMods().then((r) => {
    console.log(`apply-installed-mods: applied=${r.applied}` + (r.missing.length ? ', missing=' + r.missing.join('; ') : ''));
  });
}
