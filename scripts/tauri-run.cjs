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
  // 密钥对一致性自检：minisign 载荷 [2..10] 小端即为 keyID，必须与 tauri.conf.json 的 pubkey 相同
  const keyIdOf = (text) => {
    const line = String(text)
      .trim()
      .split('\n')
      .map((l) => l.trim())
      .find((l) => /^[A-Za-z0-9+/=]{40,}$/.test(l));
    if (!line) return null;
    const raw = Buffer.from(line, 'base64');
    if (raw.length < 10) return null;
    return Buffer.from(raw.subarray(2, 10)).reverse().toString('hex').toUpperCase();
  };
  try {
    const conf = JSON.parse(fs.readFileSync(path.join(root, 'src-tauri', 'tauri.conf.json'), 'utf8'));
    const pubRaw = conf?.plugins?.updater?.pubkey || conf?.bundle?.updater?.pubkey || '';
    const pub = Buffer.from(pubRaw, 'base64').toString('utf8');
    const privId = keyIdOf(key);
    const pubId = keyIdOf(pub);
    if (privId && pubId && privId !== pubId) {
      console.warn(
        `[sign] ⚠️ 本地私钥与 tauri.conf.json 的 pubkey 不是一对（私钥 keyID=${privId} / pubkey keyID=${pubId}）——更新器会拒绝这些签名`
      );
    } else {
      console.log(`[sign] 已载入本地私钥 ${keyPath}${privId ? `（keyID=${privId}）` : ''}`);
    }
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
