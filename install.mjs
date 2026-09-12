#!/usr/bin/env node
/**
 * dsh-ui-skin-wave installer - one implementation for Windows / macOS / Linux.
 *
 *   node install.mjs                      interactive 6-choose-4, then build + register
 *   node install.mjs --hues 1,2,5,6       pick by number (or by key: blue,orange,...)
 *   node install.mjs --dry-run            print the plan, touch nothing
 *   node install.mjs --pnpm              register with pnpm + edit dsh.profile.bundles
 *                                          (instead of the dsh plugin CLI)
 *
 * Steps: [1/4] validate  [2/4] palettes+build  [3/4] clean legacy  [4/4] register
 * Windows users can call install.ps1 (a thin shim); macOS/Linux users install.sh.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const IS_WIN = process.platform === 'win32';
const args = process.argv.slice(2);
const has = (f) => args.includes('--' + f);
const opt = (name, def) => { const i = args.indexOf('--' + name); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : def; };

const PROFILE = opt('profile', path.join(os.homedir(), '.dsh', 'profiles', 'web'));
const HUES = opt('hues', '');
const DRY = has('dry-run');
const USE_PNPM = has('pnpm');
const PACKAGE = 'dsh-ui-skin-wave';
const LEGACY = '@deepseek-ai/dsh-client-ui-skin';
const LEGACY_ID = 'dsh-client-ui-skin';
const SPEC = 'link:' + HERE.replace(/\\/g, '/');

const say = (...a) => console.log(...a);
const die = (m) => { console.error('ERROR: ' + m); process.exit(1); };

function run(cmd, cmdArgs, cwd) {
  say('      $ ' + cmd + ' ' + cmdArgs.join(' '));
  if (DRY) return 0;
  const r = spawnSync(cmd, cmdArgs, { cwd: cwd || HERE, stdio: 'inherit' });
  if (r.error) { say('      ! ' + r.error.message); return 1; }
  return r.status === null ? 1 : r.status;
}
const node = (script, extra) => run(process.execPath, [script].concat(extra || []));
const npx = (a) => run(IS_WIN ? 'npx.cmd' : 'npx', a);

// ---------- [1/4] validate ----------
say('[1/4] Validating the package ...');
for (const f of ['package.json', 'cordis.patch.yml', 'lib/index.js', 'lib/client.js', 'skin/hues.json', 'build/build-skin.mjs']) {
  if (!fs.existsSync(path.join(HERE, f))) die('missing ' + f + ' - run this from the package root');
}
if (!fs.existsSync(PROFILE)) say('      note: profile not found yet at ' + PROFILE + ' (dsh may not have run here)');
say('      package ok - ' + PACKAGE + ' at ' + HERE);

// ---------- [2/4] palettes + build ----------
say('[2/4] Choosing the 4 palettes and building ...');
if (HUES) {
  const rc = node(path.join(HERE, 'build', 'select-hues.mjs'), [HUES]);
  if (rc !== 0) die('palette selection failed');
} else if (process.stdin.isTTY && !DRY) {
  const rc = node(path.join(HERE, 'build', 'select-hues.mjs'));
  if (rc !== 0) die('palette selection failed');
} else {
  say('      (non-interactive) keeping the current palette set in skin/hues.json');
}
if (node(path.join(HERE, 'build', 'build-skin.mjs')) !== 0) die('build-skin failed');
if (node(path.join(HERE, 'build', 'build-plugin.mjs')) !== 0) die('build-plugin failed');

// ---------- [3/4] legacy cleanup ----------
say('[3/4] Removing leftovers from the previous name (' + LEGACY + ') ...');
const profilePkgFile = path.join(PROFILE, 'package.json');
if (fs.existsSync(profilePkgFile)) {
  let pkg = {};
  try { pkg = JSON.parse(fs.readFileSync(profilePkgFile, 'utf8')); } catch (e) { die('profile package.json is not valid JSON: ' + e.message); }
  if (pkg.dependencies && pkg.dependencies[LEGACY]) {
    say('      dropping legacy dependency ' + LEGACY);
    const rc = run(IS_WIN ? 'pnpm.cmd' : 'pnpm', ['remove', LEGACY], PROFILE);
    if (rc !== 0) say('      ! pnpm remove failed - remove it manually if the boot complains');
  } else {
    say('      no legacy dependency');
  }
}
const patchFile = path.join(PROFILE, 'cordis.patch.yml');
if (fs.existsSync(patchFile)) {
  let yml = fs.readFileSync(patchFile, 'utf8');
  if (yml.includes(LEGACY_ID)) {
    if (!DRY) fs.copyFileSync(patchFile, patchFile + '.bak-' + Date.now());
    const re = new RegExp('(\\r?\\n){2}- insert:\\r?\\n\\s+- id: ' + LEGACY_ID + '\\r?\\n\\s+name: .[^\\r\\n]*', 'g');
    yml = yml.replace(re, '\n');
    if (!DRY) fs.writeFileSync(patchFile, yml, 'utf8');
    say('      removed the legacy hand-written insert (backup kept next to it)');
  } else {
    say('      no legacy insert');
  }
}

// ---------- [4/4] register ----------
say('[4/4] Registering the package ...');
if (USE_PNPM) {
  if (run(IS_WIN ? 'pnpm.cmd' : 'pnpm', ['add', SPEC], PROFILE) !== 0) die('pnpm add failed');
  if (!DRY) {
    const pkg = JSON.parse(fs.readFileSync(profilePkgFile, 'utf8'));
    pkg.dsh = pkg.dsh || {};
    pkg.dsh.profile = pkg.dsh.profile || {};
    const bundles = pkg.dsh.profile.bundles || (pkg.dsh.profile.bundles = []);
    if (!bundles.includes(PACKAGE)) {
      bundles.push(PACKAGE);
      fs.writeFileSync(profilePkgFile, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
      say('      added ' + PACKAGE + ' to dsh.profile.bundles');
    } else {
      say('      already listed in dsh.profile.bundles');
    }
  }
} else {
  if (npx(['-y', '@deepseek-ai/dsh', 'plugin', '--profile', 'web', 'add', SPEC]) !== 0) {
    say('      ! the dsh CLI rejected the link: spec, retrying with file: ...');
    if (npx(['-y', '@deepseek-ai/dsh', 'plugin', '--profile', 'web', 'add', 'file:' + HERE.replace(/\\/g, '/')]) !== 0) {
      die('registration failed. Try: npx -y @deepseek-ai/dsh plugin --profile web add ' + SPEC);
    }
    say('      registered with file: - re-run this installer after every code change (snapshot copy)');
  } else {
    say('      registered with link: - later rebuilds are picked up live');
  }
}

say('');
say('Done. Restart "dsh web" once, then check Settings for the skin section.');
say('Optional preflight before restarting (the checklist recommends it):');
say('    node <dsh-skill-manager>/tools/preflight.mjs --package "' + HERE + '" --profile web');
