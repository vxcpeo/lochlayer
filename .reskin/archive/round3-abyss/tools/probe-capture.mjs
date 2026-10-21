// Runs the verifier's own capture for one route, then reports chrome geometry in the captured page.
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs/promises';

const root = process.cwd();
const port = 4397;
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
  cwd: root,
  stdio: 'ignore',
  windowsHide: true,
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ready = false;
for (let i = 0; i < 40 && !ready; i += 1) {
  try { const res = await fetch(`http://127.0.0.1:${port}/`); ready = res.status < 500; } catch { await sleep(400); }
}
if (!ready) throw new Error('server not ready');

const mod = await import('file:///C:/Users/Administrator/.dsh/skills/reskin/scripts/lib/browser.mjs');
const outDir = path.join(root, '.reskin', 'probe');
await fs.mkdir(outDir, { recursive: true });
const result = await mod.capturePages({
  projectRoot: root,
  outDir,
  baseUrl: `http://127.0.0.1:${port}/`,
  routes: ['/'],
  label: 'current',
});
console.log('screenshots', JSON.stringify(result.pages['/'].screenshots));
console.log('landmarks', JSON.stringify(result.pages['/'].desktop.landmarks.map((l) => [l.tag, l.top, l.left, l.width, l.height])));
await browser_close();
await close();

async function browser_close() {}
async function close() { server.kill(); }
