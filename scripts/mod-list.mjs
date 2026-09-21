// mod-list.mjs — 列出所有已装载模组（读 import/mods/*.manifest.json）
// 输出 RESULT_JSON=[{modid, source, enabled, blocks, images, hasCache}]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { IMPORT_DIR } from './mod-shared.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function list() {
  if (!fs.existsSync(IMPORT_DIR)) return [];
  const out = [];
  for (const f of fs.readdirSync(IMPORT_DIR)) {
    if (!f.endsWith('.manifest.json')) continue;
    try {
      const m = JSON.parse(fs.readFileSync(path.join(IMPORT_DIR, f), 'utf8'));
      const cacheDir = path.join(IMPORT_DIR, m.modid || '');
      const rr = m.renderReport || null;
      out.push({
        modid: m.modid,
        source: m.source || '',
        enabled: m.enabled !== false,
        blocks: (m.blocks || []).length,
        images: (m.imageFiles || []).length,
        hasCache: fs.existsSync(cacheDir),
        // 导入/重刷时的自检结果：让面板直接显示「有没有洋红风险」，不必等进编辑器才发现
        renderable: rr ? rr.modBlocksRenderable : null,
        invisible: rr ? rr.modBlocksInvisible : null,
        risk: rr ? rr.modBlocksNotRenderable : null,
        riskList: rr ? (rr.modBlocksNotRenderableList || []).slice(0, 10) : [],
        rebuiltAt: m.rebuiltAt || m.generatedAt || null
      });
    } catch { /* 跳过坏 manifest */ }
  }
  out.sort((a, b) => a.modid.localeCompare(b.modid));
  return out;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isMain) {
  const mods = list();
  console.log(`已装载模组 ${mods.length} 个`);
  console.log('RESULT_JSON=' + JSON.stringify(mods));
}
