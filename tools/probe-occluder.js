/* 若波纹仍被遮挡：定位那个不透明的遮挡者。DSH → F12 → Console → 粘贴回车 */
(() => {
  const out = [];
  const fx = document.getElementById('dsh-ocean-fx');
  out.push('fx z-index  = ' + (fx ? getComputedStyle(fx).zIndex : '(无特效层)'));
  out.push('body attrs = ' + JSON.stringify(document.body.dataset));
  const x = Math.round(innerWidth / 2), y = Math.round(innerHeight * 0.35);
  out.push('');
  out.push('=== 屏幕点 (' + x + ',' + y + ') 处的元素栈（从最上层开始）===');
  document.elementsFromPoint(x, y).forEach((el, i) => {
    const cs = getComputedStyle(el);
    const bg = cs.backgroundColor, bi = cs.backgroundImage;
    const opaque = !(bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') || (bi !== 'none' && bi.indexOf('gradient') >= 0);
    out.push('  ' + i + (opaque ? ' [不透明] ' : '          ') +
      el.tagName.toLowerCase() +
      (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/).join('.') : '') +
      (el.dataset && el.dataset.slot ? ' [slot=' + el.dataset.slot + ']' : '') +
      '  bg=' + bg + (bi !== 'none' ? ' bgImage=' + bi.slice(0, 28) : ''));
  });
  out.push('');
  out.push('=== 从特效层往上数，第一个不透明的祖先 ===');
  let n = fx ? fx.parentElement : null;
  while (n && n !== document.documentElement) {
    const cs = getComputedStyle(n);
    if (!(cs.backgroundColor === 'rgba(0, 0, 0, 0)' || cs.backgroundColor === 'transparent')) {
      out.push('  ' + n.tagName.toLowerCase() + (n.dataset && n.dataset.slot ? '[slot=' + n.dataset.slot + ']' : '') + ' bg=' + cs.backgroundColor);
      break;
    }
    n = n.parentElement;
  }
  const txt = out.join('\n');
  console.log(txt);
  if (typeof copy === 'function') { copy(txt); console.log('（已复制）'); }
})();
