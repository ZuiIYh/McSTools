

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const base = process.argv[2] || 'http://127.0.0.1:5628';
const sample = process.argv[3] || 'D:\\X-drive\\IdeaProjects\\MCBlock蓝图编辑\\MCBlock-Studio-源码版\\demo\\MCBlock演示小屋.litematic';
const outDir = process.argv[4] || 'D:\\X-drive\\IdeaProjects\\McSTools\\.tmp\\diag';
fs.mkdirSync(outDir, { recursive: true });

const log = [];
const say = (s) => { log.push(s); console.log(s); };

const ab = (args) => {
  try {
    const out = execFileSync('agent-browser.cmd', args, { encoding: 'utf8', shell: true, maxBuffer: 32 * 1024 * 1024 });
    return out || '';
  } catch (e) {
    return 'ERROR: ' + String((e && e.stdout) || '') + String((e && e.stderr) || '') + String((e && e.message) || '');
  }
};


const bytes = fs.readFileSync(sample);
const fileName = path.basename(sample);
const upUrl = `${base}/local/upload?name=${encodeURIComponent(fileName)}`;
let key = null;
try {
  const res = await fetch(upUrl, { method: 'POST', body: bytes });
  const text = await res.text();
  say(`upload ${res.status}: ${text.slice(0, 300)}`);
  const m = /"url":"\/local-files\/([^"]+)"/.exec(text);
  key = m ? m[1] : null;
} catch (e) {
  say('upload failed: ' + e.message);
}
if (!key) { fs.writeFileSync(path.join(outDir, 'report.txt'), log.join('\n'), 'utf8'); process.exit(1); }


say('===== open /studio =====');
say(ab(['open', `${base}/studio`]).slice(0, 2000));
ab(['wait', '--load', 'load']);
say(ab(['screenshot', path.join(outDir, 'entry.png')]).slice(0, 500));



const openUrl = `${base}/local/open?key=${key}`;
say('===== open ' + openUrl + ' =====');
say(ab(['open', openUrl]).slice(0, 2000));
await new Promise((r) => setTimeout(r, 9000));
say(ab(['screenshot', path.join(outDir, 'editor.png')]).slice(0, 500));


const script = `(function(){var o={};try{for(var i=0;i<sessionStorage.length;i++){var k=sessionStorage.key(i);o[k]=String(sessionStorage.getItem(k)).slice(0,140);}}catch(e){o='err:'+e.message;}
return JSON.stringify({title:document.title,url:location.href,canvases:document.querySelectorAll('canvas').length,bodyText:(document.body?document.body.innerText:'(no body)').slice(0,1500),ss:o},null,2);})()`;
const state = ab(['eval', '-b', Buffer.from(script, 'utf8').toString('base64')]);
say('===== page state =====');
say(state.slice(0, 6000));

ab(['close']);
fs.writeFileSync(path.join(outDir, 'report.txt'), log.join('\n'), 'utf8');
