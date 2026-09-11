/* ============================================================
   DSH 皮肤插件 · DOM 结构探针（用于 L2 精细排版）
   用法：打开 DSH → 点「新会话」（停在空会话页）→ F12 → Console → 粘贴 → 回车
   输出较短，请直接把控制台内容贴回来（会自动复制到剪贴板）
   ============================================================ */
(() => {
  const out = [];
  const path = (el, d = 8) => {
    const a = []; let n = el;
    while (n && n !== document.body && a.length < d) {
      a.push(n.tagName.toLowerCase() +
        (n.dataset && n.dataset.slot ? '[' + n.dataset.slot + ']' : '') +
        (typeof n.className === 'string' && n.className.trim() ? '.' + n.className.trim().split(/\s+/).join('.') : ''));
      n = n.parentElement;
    }
    return a.join('  >  ');
  };
  const brief = (el, depth = 5) => {
    const lines = [];
    const rec = (n, d) => {
      if (!n || d > depth || lines.length > 70) return;
      const tag = n.tagName.toLowerCase();
      const cls = typeof n.className === 'string' && n.className.trim() ? '.' + n.className.trim().split(/\s+/).join('.') : '';
      const attrs = [];
      ['data-slot', 'contenteditable', 'role', 'placeholder', 'type'].forEach(k => { const v = n.getAttribute && n.getAttribute(k); if (v) attrs.push(k + '=' + JSON.stringify(v.slice(0, 40))); });
      const r = n.getBoundingClientRect();
      const box = (r.width || r.height) ? ' [' + Math.round(r.width) + 'x' + Math.round(r.height) + ']' : '';
      lines.push('  '.repeat(d) + tag + cls + (attrs.length ? ' {' + attrs.join(' ') + '}' : '') + box);
      if (n.children) for (const c of n.children) rec(c, d + 1);
    };
    rec(el, 0);
    return lines.join('\n');
  };

  const hero = [...document.querySelectorAll('h1,h2,h3,div,span')]
    .filter(e => e.textContent.trim() === '探索未至之境')
    .sort((a, b) => a.textContent.length - b.textContent.length)[0];
  out.push('=== ① hero（新会话页标题）===');
  out.push(hero ? path(hero) : '未找到 —— 请确认当前停在「新会话」空页面');
  if (hero) out.push('HTML: ' + hero.parentElement.outerHTML.replace(/\s+/g, ' ').slice(0, 1800));

  const view = document.querySelector('[data-slot="conversation.view"]');
  out.push('');
  out.push('=== ② conversation.view 结构树 ===');
  out.push(view ? brief(view) : '未找到');

  const comp = document.querySelector('[data-slot="conversation.composer"]');
  out.push('');
  out.push('=== ③ conversation.composer 结构树 ===');
  out.push(comp ? brief(comp) : '未找到');

  const ed = document.querySelector('[contenteditable="true"], textarea');
  out.push('');
  out.push('=== ④ 输入框 ===');
  out.push(ed ? (ed.tagName + ' / contenteditable=' + ed.getAttribute('contenteditable') + ' / ' + path(ed)) : '未找到');

  const text = out.join('\n');
  console.log(text);
  if (typeof copy === 'function') { copy(text); console.log('（已复制到剪贴板）'); }
  return text.length;
})();
