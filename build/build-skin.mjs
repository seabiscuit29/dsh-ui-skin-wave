import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { buildPalettes, resolveHues, resolveHueStrip } from './palettes.mjs';

/** Package root (one level above build/). Everything is resolved relatively,
 *  so the whole repo can be cloned anywhere. */
const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SKIN = join(ROOT, 'skin');

const structure = fs.readFileSync(join(SKIN, 'structure.css'), 'utf8');
/** The 4 selected hues live in skin/hues.json (written by install.ps1 or build/select-hues.mjs).
 *  All 6 palettes are always generated: the selected 4 come first in the settings strip,
 *  the other 2 follow and stay selectable at runtime. */
const selected = JSON.parse(fs.readFileSync(join(SKIN, 'hues.json'), 'utf8'));
const palettes = buildPalettes(Object.keys(resolveHueStrip(selected).reduce((m, h) => (m[h.key] = 1, m), {})));
console.log('preferred four: ' + resolveHues(selected).map((h) => h.label).join(' / ') +
  '   (all ' + resolveHueStrip(selected).length + ' palettes generated)');

const css = structure.replace('/*__PALETTES__*/', palettes);
fs.writeFileSync(join(SKIN, 'skin.css'), css, 'utf8');
console.log('skin.css: ' + css.length + ' chars, hue blocks ' + (palettes.match(/色相：/g) || []).length);
