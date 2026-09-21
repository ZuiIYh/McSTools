import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const I18N = path.join(ROOT, 'src', 'i18n');

// 注意：块以 `  modloader: {` 开头、`  }` 结尾（无尾随逗号，插入时统一加）
const blocks = {
  zh_cn: `  modloader: {
    title: '模组装载',
    installHeading: '装载新模组',
    selectFile: '选择模组文件 (.jar / .zip)',
    parsing: '正在解析模组…',
    modid: '模组 ID',
    blocksFound: '可注册方块',
    missing: '缺贴图方块',
    namespaces: '命名空间',
    missingList: '以下方块无可用贴图',
    more: '等另外 {n} 个',
    install: '安装到编辑器',
    installedHeading: '已装载模组',
    disabled: '已禁用',
    blockCount: '{n} 个方块',
    imageCount: '{n} 张贴图',
    uninstall: '卸载',
    noInstalled: '还没有装载任何模组。选择一个模组文件即可开始。',
    note: '提示：卸载会彻底移除方块与缓存；禁用仅让编辑器暂时看不见，可随时重新启用。换编辑器镜像后会自动重载已启用模组。'
  }`,
  en: `  modloader: {
    title: 'Mod Loader',
    installHeading: 'Install a new mod',
    selectFile: 'Select mod file (.jar / .zip)',
    parsing: 'Parsing mod…',
    modid: 'Mod ID',
    blocksFound: 'Blocks found',
    missing: 'Blocks missing texture',
    namespaces: 'Namespaces',
    missingList: 'These blocks have no usable texture',
    more: '{n} more',
    install: 'Install into editor',
    installedHeading: 'Installed mods',
    disabled: 'Disabled',
    blockCount: '{n} blocks',
    imageCount: '{n} textures',
    uninstall: 'Uninstall',
    noInstalled: 'No mods installed yet. Pick a mod file to get started.',
    note: 'Uninstall removes blocks and cache completely; disable only hides them and can be re-enabled anytime. Enabled mods auto-reload after the editor mirror is replaced.'
  }`,
  ja: `  modloader: {
    title: 'MODローダー',
    installHeading: '新しいMODを導入',
    selectFile: 'MODファイルを選択 (.jar / .zip)',
    parsing: 'MODを解析中…',
    modid: 'MOD ID',
    blocksFound: '登録可能なブロック',
    missing: 'テクスチャ欠けブロック',
    namespaces: '名前空間',
    missingList: 'テクスチャが見つからないブロック',
    more: 'ほか {n} 件',
    install: 'エディタに導入',
    installedHeading: '導入済みMOD',
    disabled: '無効',
    blockCount: 'ブロック {n} 個',
    imageCount: 'テクスチャ {n} 枚',
    uninstall: 'アンインストール',
    noInstalled: 'まだMODが導入されていません。MODファイルを選択してください。',
    note: 'アンインストールはブロックとキャッシュを完全に削除します。無効化は一時的に非表示にするだけで、いつでも再有効化できます。エディタ镜像を差し替えても有効なMODは自動で再読み込みされます。'
  }`,
  zh_tw: `  modloader: {
    title: '模組裝載',
    installHeading: '裝載新模組',
    selectFile: '選擇模組檔案 (.jar / .zip)',
    parsing: '正在解析模組…',
    modid: '模組 ID',
    blocksFound: '可註冊方塊',
    missing: '缺貼圖方塊',
    namespaces: '命名空間',
    missingList: '以下方塊無可用貼圖',
    more: '等另外 {n} 個',
    install: '安裝到編輯器',
    installedHeading: '已裝載模組',
    disabled: '已停用',
    blockCount: '{n} 個方塊',
    imageCount: '{n} 張貼圖',
    uninstall: '解除安裝',
    noInstalled: '還沒有裝載任何模組。選擇一個模組檔案即可開始。',
    note: '提示：解除安裝會徹底移除方塊與快取；停用僅讓編輯器暫時看不見，可隨時重新啟用。更換編輯器鏡像後會自動重載已啟用模組。'
  }`
};

// 找到最外层（与首个 { 配对的）} 的索引
function findTopLevelClose(text) {
  let depth = 0;
  let started = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '{') { depth++; started = true; }
    else if (ch === '}') {
      depth--;
      if (started && depth === 0) return i;
    }
  }
  return -1;
}

for (const [lang, block] of Object.entries(blocks)) {
  const p = path.join(I18N, `${lang}.ts`);
  let text = fs.readFileSync(p, 'utf8');

  // 幂等：先移除旧的注入块（从 modloader: { 所在行起，到文件末尾）
  const mi = text.indexOf('modloader: {');
  if (mi >= 0) {
    const nl = text.lastIndexOf('\n', mi); // 该行的行首
    text = text.slice(0, nl + 1);          // 保留到该行之前
  }

  const closeIdx = findTopLevelClose(text);
  let newText;
  if (closeIdx >= 0) {
    const head = text.slice(0, closeIdx).replace(/\s+$/, '');   // 顶层 } 之前的内容（末尾为上一顶层 key 的闭合）
    const headComma = head.endsWith('}') ? head + ',' : head;   // 上一 key 已是闭合，补逗号
    newText = headComma + '\n' + block + '\n}\n';
  } else {
    // 顶层闭合 } 已随旧块被移除（重复注入场景）：直接在末尾补回
    const head = text.replace(/\s+$/, '');
    const headComma = head.endsWith('}') ? head + ',' : head;
    newText = headComma + '\n' + block + '\n}\n';
  }

  fs.writeFileSync(p, newText, 'utf8');
  const lines = newText.split('\n').length;
  console.log(`${lang}: 已插入 modloader (${lines} 行)`);
}
