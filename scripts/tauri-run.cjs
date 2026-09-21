const os = require('node:os');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const tauriCli = path.join(root, 'node_modules', '@tauri-apps', 'cli', 'tauri.js');
const cargoBin = path.join(os.homedir(), '.cargo', 'bin');
const pathKey = Object.keys(process.env).find((key) => key.toLowerCase() === 'path') || 'PATH';
const env = {
  ...process.env,
  [pathKey]: `${cargoBin}${path.delimiter}${process.env[pathKey] || ''}`,
};
const args = process.argv.slice(2);
if (args[0] === '--') args.shift();

/**
 * 本地更新器签名私钥（可选）。
 * 优先使用环境变量；否则读 ~/.tauri/mcstools.key（配套密码放 ~/.tauri/mcstools.key.password）。
 * 私钥只留在用户目录、绝不进仓库；缺失时保持原行为（打包照常，仅报“缺私钥”）。
 */
function attachSigningKey(target) {
  const keyPath = path.join(os.homedir(), '.tauri', 'mcstools.key');
  if (target.TAURI_SIGNING_PRIVATE_KEY) {
    console.log('[sign] 使用环境变量提供的签名私钥');
    return;
  }
  if (!fs.existsSync(keyPath)) {
    console.log(`[sign] 未找到本地私钥 ${keyPath}，本次不产出更新器签名（.sig）`);
    return;
  }
  const key = fs.readFileSync(keyPath, 'utf8').trim();
  target.TAURI_SIGNING_PRIVATE_KEY = key;
  const passPath = `${keyPath}.password`;
  if (!target.TAURI_SIGNING_PRIVATE_KEY_PASSWORD) {
    target.TAURI_SIGNING_PRIVATE_KEY_PASSWORD = fs.existsSync(passPath)
      ? fs.readFileSync(passPath, 'utf8').replace(/\r?\n$/, '')
      : '';
  }
  /**
   * 公钥 keyID：minisign 公钥载荷 [2..10] 小端。注意 .key/.key.pub 文件本身就是 base64
   * （外层解码后是「注释行 + base64」两行文本），所以要解两层。
   * 加密私钥（rsign encrypted secret key）载荷布局不同，取不到 keyID —— 不再据此判配对，
   * 改由打包产物 .sig 里的 keyID 与公钥比对（.sig 载荷同为 [2..10]）。
   */
  const keyIdFromB64File = (content) => {
    try {
      const inner = Buffer.from(String(content).trim(), 'base64').toString('utf8');
      const line = inner
        .split('\n')
        .map((l) => l.trim())
        .find((l) => /^[A-Za-z0-9+/=]{40,}$/.test(l));
      if (!line) return null;
      const raw = Buffer.from(line, 'base64');
      return raw.length < 10 ? null : Buffer.from(raw.subarray(2, 10)).reverse().toString('hex').toUpperCase();
    } catch {
      return null;
    }
  };
  try {
    const conf = JSON.parse(fs.readFileSync(path.join(root, 'src-tauri', 'tauri.conf.json'), 'utf8'));
    const pubId = keyIdFromB64File(conf?.plugins?.updater?.pubkey || conf?.bundle?.updater?.pubkey || '');
    console.log(`[sign] 已载入本地私钥 ${keyPath}${pubId ? `（公钥 keyID=${pubId}）` : ''}`);
  } catch {
    console.log(`[sign] 已载入本地私钥 ${keyPath}`);
  }
}

attachSigningKey(env);

const child = spawn(process.execPath, [tauriCli, ...args], {
  cwd: root,
  env,
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});

child.on('error', (error) => {
  console.error(error);
  process.exit(1);
});
