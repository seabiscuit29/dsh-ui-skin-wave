/* dsh-ui-skin-wave - client bundle execution test.
 *
 * Runs the real bundle against a stub __ModuleLoader__ + stub react, then:
 *   - renders the settings section and walks the tree
 *   - clicks every control and asserts the body attributes / state changes
 *   - simulates a mousemove, captures the rAF frame, unmounts, and asserts the
 *     stray frame does not throw (the clearRect-on-null regression)
 * Usage: node tests/client-bundle.mjs
 */
/* 插件无头测试台 v2：假 jsx runtime + DOM 桩，真跑插件；渲染树 + 逐按钮点击 + 状态断言 */
import fs from 'node:fs';
const src = fs.readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8');

const noop = () => {};
const grad = { addColorStop: noop };
const ctx2d = new Proxy({}, { get: (t, k) => {
  if (k === 'createRadialGradient' || k === 'createLinearGradient') return () => grad;
  return typeof k === 'string' ? noop : undefined;
} });
function el(tag) {
  return { tagName: tag, dataset: {}, style: {}, children: [], textContent: '',
    appendChild(c) { this.children.push(c); return c; }, remove: noop,
    setAttribute: noop, removeAttribute: noop, hasAttribute: () => false,
    getContext: () => ctx2d, addEventListener: noop, removeEventListener: noop,
    clientWidth: 1440, clientHeight: 826, width: 0, height: 0 };
}
const body = el('body');
body.hasAttribute = (n) => n === 'data-ds-dark-theme' ? false : false;

const listeners = {};
const onEv = (t, fn) => { (listeners[t] = listeners[t] || []).push(fn); };
const offEv = (t, fn) => { if (listeners[t]) listeners[t] = listeners[t].filter((f) => f !== fn); };
const fire = (t, ev) => (listeners[t] || []).forEach((fn) => fn(ev));
globalThis.window = { __ModuleLoader__: { load: (m) => { loaded = m; } },
  matchMedia: () => ({ matches: false }), addEventListener: onEv, removeEventListener: offEv,
  devicePixelRatio: 1, innerWidth: 1440, innerHeight: 826 };
globalThis.document = { head: el('head'), body, createElement: el, querySelector: () => null,
  getElementById: () => null, addEventListener: noop };
globalThis.localStorage = { _v: {}, getItem(k) { return this._v[k] || null; }, setItem(k, v) { this._v[k] = v; }, removeItem(k) { delete this._v[k]; } };
globalThis.getComputedStyle = () => ({ getPropertyValue: (n) => (n === '--dsh-fx' ? '79,140,255' : (n === '--dsh-fx-grid' ? '.042' : '#123456')) });
let clock = 0;
globalThis.performance = { now: () => (clock += 200) };
let rafCb = null;
globalThis.requestAnimationFrame = (cb) => { rafCb = cb; return 1; };
globalThis.MutationObserver = class { observe() {} disconnect() {} };

let loaded = null;
function jsx(type, props) { return { type, props: props || {} }; }
const react = { useState: (v) => [v, noop], useEffect: noop, useRef: () => ({ current: null }), Fragment: 'Fragment' };

eval(src);
const mod = loaded.factory((name) => {
  if (name === 'react') return react;
  if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: 'Fragment' };
  throw new Error('require missed: ' + name);
});
let reg = null;
mod.apply({ effect: noop, slots: { inject: (n, f) => f(), register: (m, c) => { reg = { meta: m, comp: c }; return noop; } } });

/* 展开函数组件，收集所有可点击按钮 */
function walk(node, ctxLabel, out) {
  if (node == null || node === false || typeof node !== 'object') return out;
  if (Array.isArray(node)) { node.forEach((n) => walk(n, ctxLabel, out)); return out; }
  if (typeof node.type === 'function') {
    let sub; try { sub = node.type(node.props || {}); } catch (e) { out.push({ error: (ctxLabel || '?') + ' 渲染抛错: ' + e.message }); return out; }
    return walk(sub, ctxLabel, out);
  }
  const p = node.props || {};
  if (typeof p.onClick === 'function') {
    const kids = Array.isArray(p.children) ? p.children.filter((c) => typeof c === 'string').join('') : String(p.children == null ? '?' : p.children);
    out.push({ label: (ctxLabel ? ctxLabel + ' → ' : '') + kids, fn: p.onClick });
  }
  return walk(p.children, ctxLabel, out);
}
function collect() {
  const out = [];
  const tree = reg.comp({});
  // 第一层：把每个 Row 的 title 作为上下文标签
  (function top(node) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(top); return; }
    const p = node.props || {};
    if (typeof node.type === 'function' && p.title) { walk(node, p.title, out); return; }
    top(p.children);
  })(tree);
  return out;
}

console.log('插槽: ' + reg.meta.name + ' id=' + reg.meta.id + ' order=' + reg.meta.order);
const rows = collect();
console.log('可点击按钮: ' + rows.length + ' 个');
let fail = 0;
for (const b of rows) {
  if (b.error) { console.log('  ✗ ' + b.error); fail++; continue; }
  try {
    b.fn();
    const d = document.body.dataset;
    console.log('  ✓ 点击 [' + b.label + ']  → skin=' + (d.dshSkin || '-') + ' mode=' + (d.dshMode || '-') + ' fx=' + (d.dshFx || '-'));
  } catch (e) { console.log('  ✗ 点击 [' + b.label + '] 抛错: ' + e.message); fail++; }
}
// 断言：配色行恰好 4 个按钮，且每个都能切出不同的 dsh-hue
const hueBtns = collect().filter((b) => b.label && b.label.indexOf('配色') === 0);
console.log('断言 配色色条按钮数 = ' + hueBtns.length + (hueBtns.length === 6 ? ' ✓（全部可选）' : ' ✗'));
if (hueBtns.length !== 6) fail++;
const seenHues = [];
for (const b of hueBtns) {
  b.fn();
  const got = document.body.dataset.dshHue;
  if (seenHues.indexOf(got) < 0) seenHues.push(got);
}
console.log('断言 可切换色相 = ' + seenHues.join(' / ') + (seenHues.length === 6 ? ' ✓' : ' ✗'));
if (seenHues.length !== 6) fail++;
const off = collect().find((b) => b.label && b.label.indexOf('皮肤') >= 0 && b.label.indexOf('关') >= 0);
if (off) { off.fn(); console.log('断言 皮肤-关 → dshSkin=' + (document.body.dataset.dshSkin || '(已移除)') + (document.body.dataset.dshSkin ? ' ✗' : ' ✓')); fail += document.body.dataset.dshSkin ? 1 : 0; }
// ===== 回归：卸载后残留的 rAF 帧不能再抛错（用户实际踩到的 bug）=====
const findBtn = (kw) => collect().find((b) => b.label && b.label.indexOf(kw) >= 0);
const onBtn = findBtn('皮肤') && collect().find((b) => b.label.indexOf('皮肤') >= 0 && b.label.indexOf('开') >= 0);
collect().find((b) => b.label.indexOf('皮肤') >= 0 && b.label.indexOf('开') >= 0).fn();   // 先开启皮肤
console.log('皮肤已开启 → skin=' + document.body.dataset.dshSkin);
collect().find((b) => b.label.indexOf('波纹特效') >= 0 && b.label.indexOf('开') >= 0).fn(); // 开启特效层
rafCb = null;
fire('mousemove', { clientX: 300, clientY: 300 });
console.log('模拟鼠标移动 → 已排帧: ' + (rafCb ? '是 ✓' : '否 ✗'));
if (rafCb) { try { rafCb(16); } catch (e) { console.log('  （首帧执行抛错: ' + e.message + '）'); fail++; } }
collect().find((b) => b.label.indexOf('波纹特效') >= 0 && b.label.indexOf('关') >= 0).fn(); // 关闭 → 卸载
const stray = rafCb;
if (stray) {
  try { stray(32); console.log('断言 卸载后残留帧 → 未抛错 ✓'); }
  catch (e) { console.log('断言 卸载后残留帧 → 抛错: ' + e.message + ' ✗'); fail++; }
} else { console.log('断言 卸载后残留帧 → 未捕获到帧 ✗'); fail++; }
console.log(fail === 0 ? '=== 全部通过 ✓ ===' : '=== 失败 ' + fail + ' 项 ✗ ===');