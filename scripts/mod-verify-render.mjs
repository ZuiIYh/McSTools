#!/usr/bin/env node
// mod-verify-render.mjs [modid] [--json]
//
// 用「编辑器渲染器的真实规则」复刻一遍 3D 解析链路，判定方块会不会渲染成洋红兜底立方体。
// 完全不依赖 jar，只读 mcmeta 资源包，秒级出结果。排查 3D 问题时应**先跑这个**。
//
// 既可直接当 CLI 用，也可 `import { verifyRender }` 给装载链路做**导入自检**。
// 注意：所有文件都在函数内部读取 —— 装载链路要在 applyModModels/syncRenderHints
// 落地**之后**才调用它，模块顶层读取会读到旧数据（这就是它不写成顶层常量的原因）。
//
// 复刻的关键规则（均取自编辑器 chunk 源码，改镜像后需复核）：
//   1. 加载：defs / models / props / atlas-uv 的键一律 `t.includes(":") ? t : "minecraft:" + t`
//      （渲染器默认给无命名空间键补 minecraft:）→ 本脚本按同一规则归一化后再比对。
//   2. flatten：只有 `parent` 存在时才继承父模型 elements、合并父 textures；无 parent 直接 return。
//   3. getTexture：face.texture **只当 textures 表的槽名查** ——
//        t = t.startsWith("#") ? t.slice(1) : t;  t = this.textures?.[t] ?? "";
//        while (t.startsWith("#")) t = this.textures?.[t.slice(1)] ?? "";
//      所以 face.texture 写裸纹理 id 会解析成 "" → 纹理解析失败 → 洋红。
//   4. 洋红兜底（顶点色 [1,0,1]）只在 getMesh 抛错、或几何为 0 面时触发；
//      **变体匹配失败返回空数组 = 不可见，不是洋红**。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MCMETA_DIR } from './mod-shared.mjs';

const J = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const ns = (t) => { const s = String(t || '').trim(); return s.includes(':') ? s : 'minecraft:' + s; };

/**
 * 复刻渲染器链路，统计某模组方块里「可取到图集内纹理」的比例。
 * @param {string|null} modid 统计 `modid:` 前缀的方块；传 null 只统计原版对照
 * @returns {{modid:string, modBlocksRenderable:number, modBlocksInvisible:number,
 *            modBlocksNotRenderable:number, modBlocksNotRenderableList:string[],
 *            vanillaRenderable:number, vanillaNoTexture:number, parentMissing:string[]}}
 */
export function verifyRender(modid) {
  const models = J(path.join(MCMETA_DIR, 'block-models.json'));
  const auv = J(path.join(MCMETA_DIR, 'atlas-uv.json'));
  const defs = J(path.join(MCMETA_DIR, 'block-definitions.json'));

  // 渲染器的 M 表（深拷贝，后面 flatten 会就地修改）
  const M = new Map();
  for (const [k, v] of Object.entries(models)) M.set(ns(k), JSON.parse(JSON.stringify(v)));
  const W = new Set(Object.keys(auv).map(ns));

  const parentMissing = [];
  function flatten(model, depth = 0) {
    if (!model.parent || depth > 20) return model;
    const p = M.get(ns(model.parent));
    if (!p) { parentMissing.push(model.parent); model.parent = undefined; return model; }
    flatten(p, depth + 1);
    if (!model.elements) model.elements = p.elements;
    if (!model.textures) model.textures = {};
    for (const [k, v] of Object.entries(p.textures || {})) if (!model.textures[k]) model.textures[k] = v;
    return model;
  }
  function getTexture(model, t) {
    t = String(t || '');
    t = t.startsWith('#') ? t.slice(1) : t;
    t = model.textures?.[t] ?? '';
    while (t.startsWith('#')) t = model.textures?.[t.slice(1)] ?? '';
    return t;
  }
  for (const m of M.values()) { try { flatten(m); } catch { /* 忽略 */ } }

  const refsOf = (d) => {
    const s = new Set();
    const walk = (o) => { if (o && typeof o === 'object') { if (typeof o.model === 'string') s.add(o.model); Object.values(o).forEach(walk); } };
    if (d.variants) Object.values(d.variants).forEach(walk);
    if (d.multipart) d.multipart.forEach((p) => walk(p.apply));
    return s;
  };

  function audit(pred) {
    let ok = 0, air = 0;
    const bad = [];
    for (const [bid, dd] of Object.entries(defs)) {
      if (!pred(bid)) continue;
      const refs = refsOf(dd);
      // 隐形技术方块：全部变体都指向 block/air → 空网格，不渲染属预期，不算缺陷
      if (refs.size && [...refs].every((r) => ns(r) === 'minecraft:block/air')) { air++; continue; }
      let good = false, reason = 'no-model-ref';
      for (const r of refs) {
        const m = M.get(ns(r));
        if (!m) { reason = 'model-missing:' + r; continue; }
        if (!m.elements || !m.elements.length) { reason = 'no-elements:' + r; continue; }
        let faceOk = 0, faceBad = 0;
        for (const el of m.elements) {
          for (const fv of Object.values(el.faces || {})) {
            if (!fv || !fv.texture) continue;
            const id = getTexture(m, fv.texture);
            if (id && W.has(ns(id))) faceOk++; else faceBad++;
          }
        }
        if (faceOk > 0 && faceBad === 0) { good = true; break; }
        reason = `face ok=${faceOk} bad=${faceBad} @${r}`;
      }
      if (good) ok++; else bad.push(bid + '  (' + reason + ')');
    }
    return { ok, air, bad };
  }

  const mod = modid ? audit((b) => b.startsWith(modid + ':')) : { ok: 0, air: 0, bad: [] };
  const vanilla = audit((b) => !b.includes(':'));

  return {
    modid: modid || '(未指定)',
    modBlocksRenderable: mod.ok,
    modBlocksInvisible: mod.air,
    modBlocksNotRenderable: mod.bad.length,
    modBlocksNotRenderableList: mod.bad.slice(0, 30),
    vanillaRenderable: vanilla.ok,
    vanillaNoTexture: vanilla.bad.length,
    parentMissing: [...new Set(parentMissing)].slice(0, 10),
  };
}

// ---------------- CLI ----------------
const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const args = process.argv.slice(2);
  const asJson = args.includes('--json');
  const modid = args.find((a) => !a.startsWith('--')) || null;
  const report = verifyRender(modid);

  if (asJson) { console.log('RESULT_JSON=' + JSON.stringify(report)); process.exit(0); }

  if (modid) {
    console.log('=== %s: 可渲染 %d / 隐形 %d / 不可渲染 %d ===',
      modid, report.modBlocksRenderable, report.modBlocksInvisible, report.modBlocksNotRenderable);
    report.modBlocksNotRenderableList.slice(0, 25).forEach((s) => console.log('   ', s));
    if (!report.modBlocksNotRenderable) console.log('    （全部可取到图集内纹理 → 无洋红风险）');
  }
  console.log('原版对照：可渲染 %d / 取不到纹理 %d（实体、banner 等属正常）', report.vanillaRenderable, report.vanillaNoTexture);
  if (report.parentMissing.length) console.log('⚠ 找不到的 parent 模型:', report.parentMissing.join(', '));
  if (report.modBlocksNotRenderable > 0 && modid) {
    console.log('\n提示：若上面列出的是「靠 parent 继承 + 图集外纹理」，检查对应模型 textures 槽表是否完整、贴图是否进了图集。');
  }
}
