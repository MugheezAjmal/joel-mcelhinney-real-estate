/**
 * serve.mjs — dev server launcher
 * Run: node serve.mjs
 * This script starts `npm run dev` (Next.js) which serves on http://localhost:3000
 */
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('Starting Joel McElhinney Real Estate — Next.js dev server…');
console.log('Server will be available at http://localhost:3000\n');

const proc = spawn('npm', ['run', 'dev'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true,
});

proc.on('error', err => {
  console.error('Failed to start dev server:', err.message);
  console.log('Make sure you have run: npm install');
});

proc.on('exit', code => {
  if (code !== 0) console.log(`Dev server exited with code ${code}`);
});
