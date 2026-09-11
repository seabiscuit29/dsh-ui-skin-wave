/* 由蓝色基准色阶做色相旋转，生成 蓝/橘/绿/灰 × 明/暗 共 8 套调色板 CSS */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const T = (f) => fs.readFileSync(join(HERE, 'templates', f), 'utf8');

function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0));
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return [h, s, l];
}
function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; b = 0; } else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; } else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; } else { r = c; g = 0; b = x; }
  const to = (v) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return '#' + to(r) + to(g) + to(b);
}
/** 把 CSS 里所有十六进制颜色做色相旋转（纯白/纯黑/近无彩保持不变） */
function rotateHexes(css, H, S, lift) {
  const dL = lift || 0;
  return css.replace(/#[0-9a-fA-F]{6}\b/g, (hex) => {
    const p = hexToHsl(hex);
    if (p[1] < 0.03 || p[2] > 0.985 || p[2] < 0.012) return hex.toLowerCase();
    // 提亮只作用于"深色表面"；已经很亮的（文字/描边）保持原明度，避免被推成纯白
    const l = p[2] > 0.85 ? p[2] : Math.min(1, p[2] + dL);
    return hslToHex(H, Math.min(1, p[1] * S), l);
  });
}

export const HUES = {
  blue:   { label: '蓝色', h: 215, s: 1.00, tint: '47, 107, 255', tintd: '98, 150, 255',
            brand: '#2563eb', brandHover: '#1d4ed8', brandD: '#3b82f6', brandHoverD: '#2563eb', brandTextD: '#7fb0ff',
            fx: '79, 140, 255', fxd: '118, 166, 255',
            pageTop: '#f9fcff', pageBottom: '#dfeaff', glow: 'rgba(91, 156, 255, .34)',
            pageTopD: '#0a1020', pageBottomD: '#070b14', glowD: 'rgba(37, 99, 235, .30)',
            swatch: '#2563eb' },
  orange: { label: '橘色', h: 26,  s: 1.00, tint: '242, 122, 32', tintd: '255, 163, 92',
            brand: '#e2670a', brandHover: '#c4550a', brandD: '#f5883a', brandHoverD: '#e2670a', brandTextD: '#ffb478',
            fx: '242, 146, 58', fxd: '255, 172, 98',
            pageTop: '#fffaf5', pageBottom: '#ffe8d6', glow: 'rgba(255, 156, 82, .30)',
            pageTopD: '#181008', pageBottomD: '#0f0a06', glowD: 'rgba(226, 103, 10, .28)',
            swatch: '#e2670a' },
  green:  { label: '绿色', h: 152, s: 0.85, tint: '22, 163, 106', tintd: '74, 214, 150',
            brand: '#0f9d63', brandHover: '#0b7d4f', brandD: '#22c98a', brandHoverD: '#0f9d63', brandTextD: '#6ee7b7',
            fx: '46, 190, 125', fxd: '88, 220, 150',
            pageTop: '#f7fffb', pageBottom: '#d9f7e9', glow: 'rgba(74, 214, 150, .28)',
            pageTopD: '#0c1a14', pageBottomD: '#081310', glowD: 'rgba(15, 157, 99, .22)',
            darkS: 0.42, darkLift: 0.030,   /* 深色下绿色更淡更柔，避免"实心绿板" */
            swatch: '#0f9d63' },
  gray:   { label: '灰色', h: 215, s: 0.07, tint: '110, 120, 138', tintd: '150, 162, 180',
            brand: '#4b5563', brandHover: '#3b4453', brandD: '#9aa3b2', brandHoverD: '#7c8798', brandTextD: '#c3cad6',
            fx: '120, 130, 150', fxd: '150, 162, 180',
            pageTop: '#fbfcfe', pageBottom: '#e7ebf2', glow: 'rgba(150, 162, 180, .26)',
            pageTopD: '#13161a', pageBottomD: '#0d0f12', glowD: 'rgba(120, 130, 150, .18)',
            darkS: 0.05, darkLift: 0.035,   /* 深色下灰色提亮，向底色靠拢 */
            swatch: '#4b5563' },
  purple: { label: '紫色', h: 262, s: 0.90, tint: '124, 92, 214', tintd: '162, 132, 255',
            brand: '#7c3aed', brandHover: '#6d28d9', brandD: '#a78bfa', brandHoverD: '#7c3aed', brandTextD: '#c4b5fd',
            fx: '140, 110, 240', fxd: '170, 145, 255',
            pageTop: '#fbfaff', pageBottom: '#ece7ff', glow: 'rgba(140, 110, 240, .30)',
            pageTopD: '#100c1c', pageBottomD: '#0b0813', glowD: 'rgba(124, 58, 237, .30)',
            darkS: 0.70, darkLift: 0.020,
            swatch: '#7c3aed' },
  rose:   { label: '玫红', h: 347, s: 0.95, tint: '225, 29, 72', tintd: '255, 120, 150',
            brand: '#e11d48', brandHover: '#be123c', brandD: '#fb7185', brandHoverD: '#e11d48', brandTextD: '#fda4af',
            fx: '240, 90, 120', fxd: '255, 130, 155',
            pageTop: '#fffafb', pageBottom: '#ffe4ea', glow: 'rgba(240, 90, 120, .28)',
            pageTopD: '#1a0c11', pageBottomD: '#12080c', glowD: 'rgba(225, 29, 72, .28)',
            darkS: 0.75, darkLift: 0.025,
            swatch: '#e11d48' }
};

export function buildPalettes(selected) {
  const RAMPS = T('ramp.css'), LIGHT = T('light.css'), DARK = T('dark.css');
  const keys = (selected && selected.length) ? selected : Object.keys(HUES).slice(0, 4);
  const out = [];
  for (const key of keys) {
    if (!HUES[key]) throw new Error('未知色相: ' + key);
    const v = HUES[key];
    const S = 'body[data-dsh-skin="ocean"][data-dsh-hue="' + key + '"]';
    const ramp = rotateHexes(RAMPS, v.h, v.s);
    const light = rotateHexes(LIGHT, v.h, v.s)
      .split('{TINT}').join(v.tint).split('{BRAND_HOVER}').join(v.brandHover).split('{BRAND}').join(v.brand);
    const dark = rotateHexes(DARK, v.h, v.darkS === undefined ? v.s : v.darkS, v.darkLift || 0)
      .split('{TINTD}').join(v.tintd).split('{BRAND_HOVER_D}').join(v.brandHoverD)
      .split('{BRAND_TEXT_D}').join(v.brandTextD).split('{BRAND_D}').join(v.brandD);
    out.push('/* ============ 色相：' + v.label + ' ============ */');
    out.push(S + ' {\n' + ramp + '\n}');
    out.push(S + ':not([data-ds-dark-theme]) {\n' + light + '\n}');
    out.push(S + '[data-ds-dark-theme] {\n' + dark + '\n}');
    out.push(S + ':not([data-ds-dark-theme]) {\n  background-color: ' + v.pageBottom + ';\n  background-image:\n    radial-gradient(980px 460px at 50% -6%, ' + v.glow + ', transparent 64%),\n    linear-gradient(180deg, ' + v.pageTop + ' 0%, ' + v.pageBottom + ' 100%);\n  background-attachment: fixed;\n}');
    out.push(S + '[data-ds-dark-theme] {\n  background-color: ' + v.pageBottomD + ';\n  background-image:\n    radial-gradient(980px 460px at 50% -6%, ' + v.glowD + ', transparent 64%),\n    linear-gradient(180deg, ' + v.pageTopD + ' 0%, ' + v.pageBottomD + ' 100%);\n  background-attachment: fixed;\n}');
    const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)).join(', ');
    out.push(S + ':not([data-ds-dark-theme]) { --dsh-skin-accent: ' + v.brand + '; --dsh-skin-accent-rgb: ' + rgb(v.brand) + '; }');
    out.push(S + '[data-ds-dark-theme] { --dsh-skin-accent: ' + v.brandD + '; --dsh-skin-accent-rgb: ' + rgb(v.brandD) + '; }');
    out.push(S + ' #dsh-ocean-fx { --dsh-fx: ' + v.fx + '; --dsh-fx-grid: .042; }');
    out.push(S + '[data-ds-dark-theme] #dsh-ocean-fx { --dsh-fx: ' + v.fxd + '; --dsh-fx-grid: .055; }');
    out.push('');
  }
  return out.join('\n');
}

/** 6 个候选色相里挑 4 个（默认前 4 个），供安装器与构建脚本共用 */
export function resolveHues(selected) {
  const keys = (selected && selected.length) ? selected : Object.keys(HUES).slice(0, 4);
  return keys.map((k) => ({ key: k, label: HUES[k].label, swatch: HUES[k].swatch }));
}

/**
 * 设置面板用的完整色条：全部 6 色，安装时选中的 4 个排在前面并标记 primary=true，
 * 其余 2 个作为「更多」跟在后面（运行时依然可以点选）。
 */
export function resolveHueStrip(selected) {
  const keys = (selected && selected.length) ? selected : Object.keys(HUES).slice(0, 4);
  const rest = Object.keys(HUES).filter((k) => keys.indexOf(k) < 0);
  return keys.concat(rest).map((k) => ({
    key: k, label: HUES[k].label, swatch: HUES[k].swatch, primary: keys.indexOf(k) >= 0
  }));
}