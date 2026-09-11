/* 波纹特效定位探针：DSH → F12 → Console → 粘贴回车，把输出发我 */
(() => {
  const out = [];
  const b = document.body;
  out.push('body.dataset      = ' + JSON.stringify(b.dataset));
  out.push('body class        = ' + b.className);
  out.push('reduce-motion     = ' + (window.matchMedia('(prefers-reduced-motion: reduce)').matches));
  const fx = document.getElementById('dsh-ocean-fx');
  out.push('fx 节点存在        = ' + !!fx);
  if (fx) {
    const cs = getComputedStyle(fx);
    const r = fx.getBoundingClientRect();
    out.push('fx  display=' + cs.display + '  position=' + cs.position + '  z=' + cs.zIndex + '  opacity=' + cs.opacity + '  visibility=' + cs.visibility);
    out.push('fx  rect=' + Math.round(r.width) + 'x' + Math.round(r.height) + '  offsetParent=' + (fx.offsetParent ? fx.offsetParent.tagName : 'null(body)'));
    out.push('fx  --dsh-fx=' + cs.getPropertyValue('--dsh-fx').trim() + '  --dsh-fx-grid=' + cs.getPropertyValue('--dsh-fx-grid').trim());
    [...fx.querySelectorAll('canvas')].forEach((c, i) => {
      let nz = -1;
      try {
        const g = c.getContext('2d');
        const w = Math.min(80, c.width), h = Math.min(80, c.height);
        const d = g.getImageData(0, 0, w, h).data;
        nz = 0; for (let k = 3; k < d.length; k += 4) if (d[k] > 0) nz++;
      } catch (e) { nz = 'err:' + e.message; }
      out.push('canvas[' + i + ']  attr=' + c.width + 'x' + c.height + '  css=' + c.clientWidth + 'x' + c.clientHeight + '  左上80x80非透明=' + nz);
    });
  }
  const sel = ['[data-slot="root"] > *', '[data-slot="main.conversation"] > *', '[data-slot="conversation.session"] > *', '[data-slot="conversation.view"] > *'];
  sel.forEach((s) => {
    const el = document.querySelector(s);
    if (!el) { out.push('painter ' + s + ' = 不存在'); return; }
    const cs = getComputedStyle(el);
    out.push('painter ' + s + '  bg=' + cs.backgroundColor + '  bgImage=' + cs.backgroundImage.slice(0, 30) + '  position=' + cs.position + '  z=' + cs.zIndex);
  });
  const bcs = getComputedStyle(b);
  out.push('body bg           = ' + bcs.backgroundColor + ' / ' + bcs.backgroundImage.slice(0, 50));
  const txt = out.join('\n');
  console.log(txt);
  if (typeof copy === 'function') { copy(txt); console.log('（已复制）'); }
})();
