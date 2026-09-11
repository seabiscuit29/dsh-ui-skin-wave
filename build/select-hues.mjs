/* 6 选 4 配色选择器
   用法：
     node select-hues.mjs                      交互式选择
     node select-hues.mjs blue,orange,purple,rose   直接指定（也接受编号 1,2,5,6）
   结果写入 skin/hues.json，随后 build-skin / build-plugin 会按它生成。 */
import fs from 'node:fs';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { HUES, resolveHues } from './palettes.mjs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const FILE = join(ROOT, 'skin', 'hues.json');
const all = Object.keys(HUES);
const labels = (keys) => resolveHues(keys).map((h) => h.label).join(' / ');

function write(keys) {
  fs.writeFileSync(FILE, JSON.stringify(keys) + '\n', 'utf8');
  console.log('已保存配色组合：' + labels(keys));
}
function parse(str) {
  const parts = String(str).split(/[,，、\s]+/).filter(Boolean);
  const keys = [];
  for (const p of parts) {
    const n = parseInt(p, 10);
    const key = (!isNaN(n) && n >= 1 && n <= all.length) ? all[n - 1] : (all.indexOf(p) >= 0 ? p : null);
    if (!key) throw new Error('无法识别：' + p);
    if (keys.indexOf(key) < 0) keys.push(key);
  }
  if (keys.length !== 4) throw new Error('必须恰好选 4 个，当前 ' + keys.length + ' 个');
  return keys;
}

const arg = process.argv[2];
if (arg) { try { write(parse(arg)); } catch (e) { console.error('参数有误：' + e.message); process.exit(1); } process.exit(0); }

const current = JSON.parse(fs.readFileSync(FILE, 'utf8'));
if (!process.stdin.isTTY) {
  console.log('（非交互环境）保持当前配色：' + labels(current));
  process.exit(0);
}

console.log('');
console.log('请选择 4 种配色（共 6 种可选）:');
all.forEach((k, i) => {
  console.log('   ' + (i + 1) + ') ' + HUES[k].label + '   ' + HUES[k].swatch + (current.indexOf(k) >= 0 ? '   [当前]' : ''));
});
console.log('');
console.log('当前组合：' + labels(current));
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('输入 4 个编号（逗号分隔；直接回车保持当前）: ', (ans) => {
  rl.close();
  if (!String(ans).trim()) { console.log('保持当前配色：' + labels(current)); return; }
  try { write(parse(ans)); } catch (e) { console.error('输入有误：' + e.message); process.exit(1); }
});