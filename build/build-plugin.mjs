import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { resolveHues, resolveHueStrip } from './palettes.mjs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const css = fs.readFileSync(join(ROOT, 'skin', 'skin.css'), 'utf8');
const tpl = fs.readFileSync(join(ROOT, 'build', 'plugin-client.template.js'), 'utf8');
/** The settings strip shows all 6 hues: the installed four first (primary=true). */
const selected = JSON.parse(fs.readFileSync(join(ROOT, 'skin', 'hues.json'), 'utf8'));
const strip = resolveHueStrip(selected);
/** First-run default hue = the first of the installed four. */
const defaultHue = resolveHues(selected)[0].key;
const out = tpl
  .replace('__SKIN_HUES__', JSON.stringify(strip, null, 3).replace(/\n/g, '\n\t\t'))
  .replace('__SKIN_DEFAULT_HUE__', JSON.stringify(defaultHue))
  .replace('__SKIN_CSS__', JSON.stringify(css));
fs.writeFileSync(join(ROOT, 'lib', 'client.js'), out, 'utf8');
console.log('lib/client.js built: ' + out.length + ' chars (css ' + css.length + ')');
