/**
 * migrate-and-start.mjs
 *
 * Railway/production boot script (plain ESM — no build step needed):
 *   1. Push Drizzle schema  (drizzle-kit push)
 *   2. Ensure session table exists
 *   3. Seed defaults if the users table is empty
 *   4. Start the API server (artifacts/api-server/dist/index.mjs)
 *
 * Run as: node scripts/migrate-and-start.mjs
 */

import { execSync, spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const log = (msg) => console.log(`[boot] ${msg}`);
const warn = (msg) => console.warn(`[boot:WARN] ${msg}`);

function exec(cmd) {
  log(`$ ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit', cwd: root, env: process.env });
  } catch (e) {
    warn(`Command failed (continuing): ${cmd}`);
  }
}

// 1. Push schema
log('Running drizzle-kit push…');
exec('pnpm --filter @workspace/db run push');

// 2. Session table
log('Ensuring session table…');
exec('pnpm --filter @workspace/scripts run init-session-table');

// 3. Seed
log('Seeding defaults if needed…');
exec('pnpm --filter @workspace/scripts run seed');

// 4. Start API — entry is ESM module
const apiEntry = path.join(root, 'artifacts', 'api-server', 'dist', 'index.mjs');
log(`Starting API server: ${apiEntry}`);

const server = spawn('node', [apiEntry], {
  stdio: 'inherit',
  cwd: root,
  env: { ...process.env, NODE_ENV: 'production' },
});

server.on('error', (e) => {
  console.error(`[boot] Server error: ${e.message}`);
  process.exit(1);
});

server.on('exit', (code) => {
  log(`Server exited with code ${code}`);
  process.exit(code ?? 1);
});

process.on('SIGTERM', () => server.kill('SIGTERM'));
process.on('SIGINT',  () => server.kill('SIGINT'));
