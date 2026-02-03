import http from 'node:http';
import fs from 'node:fs';
import { readFile, readdir, open } from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const cfgPath = path.join(__dirname, 'config.json');
const cfg = JSON.parse(await readFile(cfgPath, 'utf8'));

const MC_DIR = path.resolve(__dirname, cfg.missionControlDir || '../mission-control');
const ACTIVITY_PATH = path.join(MC_DIR, 'logs', 'activity.log');

const activityClients = new Set();
let activityWatchStarted = false;
let activityLastSize = 0;

async function tailLines(filePath, maxLines = 50) {
  try {
    const txt = await readFile(filePath, 'utf8');
    const lines = txt.split(/\r?\n/).filter(Boolean);
    return lines.slice(-maxLines);
  } catch {
    return [];
  }
}

async function readAppended(filePath) {
  try {
    const st = await fs.promises.stat(filePath);
    // truncated/rotated
    if (st.size < activityLastSize) activityLastSize = 0;
    if (st.size === activityLastSize) return '';

    const fh = await open(filePath, 'r');
    try {
      const len = st.size - activityLastSize;
      const buf = Buffer.alloc(len);
      await fh.read(buf, 0, len, activityLastSize);
      activityLastSize = st.size;
      return buf.toString('utf8');
    } finally {
      await fh.close();
    }
  } catch {
    return '';
  }
}

async function ensureActivityWatch() {
  if (activityWatchStarted) return;
  activityWatchStarted = true;

  // initialize lastSize
  try {
    const st = await fs.promises.stat(ACTIVITY_PATH);
    activityLastSize = st.size;
  } catch {
    activityLastSize = 0;
  }

  // Watch file changes (best-effort)
  try {
    fs.watch(path.dirname(ACTIVITY_PATH), async (_event, filename) => {
      if (filename !== path.basename(ACTIVITY_PATH)) return;
      const appended = await readAppended(ACTIVITY_PATH);
      if (!appended) return;
      const lines = appended.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const msg = `data: ${JSON.stringify({ type: 'activity', line })}\n\n`;
        for (const res of activityClients) {
          try { res.write(msg); } catch { activityClients.delete(res); }
        }
      }
    });
  } catch {
    // ignore
  }
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    'content-type': 'text/plain; charset=utf-8',
    'cache-control': 'no-store',
    ...headers,
  });
  res.end(body);
}

function sendJson(res, status, obj) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  });
  res.end(JSON.stringify(obj, null, 2));
}

async function fileExists(p) {
  try {
    await readFile(p);
    return true;
  } catch {
    return false;
  }
}

async function listTasks() {
  const dir = path.join(MC_DIR, 'tasks');
  const entries = await readdir(dir, { withFileTypes: true });
  const files = entries
    .filter((d) => d.isFile() && d.name.toLowerCase().endsWith('.md') && d.name !== 'TEMPLATE.md')
    .map((d) => d.name);

  const tasks = [];
  for (const name of files) {
    const fp = path.join(dir, name);
    const md = await readFile(fp, 'utf8');
    const title = (md.match(/^#\s*Task:\s*(.+)$/m) || [])[1] || name.replace(/\.md$/i, '');
    const status = (md.match(/^\*\*Status:\*\*\s*(.+)$/m) || [])[1] || 'unknown';
    const priority = (md.match(/^\*\*Priority:\*\*\s*(.+)$/m) || [])[1] || 'unknown';
    const assignees = (md.match(/^\*\*Assignees:\*\*\s*(.+)$/m) || [])[1] || '';
    tasks.push({
      file: name,
      title: title.trim(),
      status: status.trim(),
      priority: priority.trim(),
      assignees: assignees.trim(),
      path: `tasks/${name}`,
    });
  }
  return tasks;
}

const server = http.createServer(async (req, res) => {
  try {
    const u = new URL(req.url, `http://${req.headers.host}`);

    if (u.pathname === '/' || u.pathname === '/index.html') {
      const html = await readFile(path.join(__dirname, 'ui.html'), 'utf8');
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
      return res.end(html);
    }

    if (u.pathname === '/api/config') {
      return sendJson(res, 200, {
        clawdControl: cfg.clawdControl || { url: 'http://localhost:3100', fallback: 'https://clawdcontrol.com' },
      });
    }

    if (u.pathname === '/api/tasks') {
      const tasks = await listTasks();
      return sendJson(res, 200, { tasks });
    }

    if (u.pathname === '/api/activity/recent') {
      const limit = Math.max(1, Math.min(200, parseInt(u.searchParams.get('limit') || '40', 10)));
      const lines = await tailLines(ACTIVITY_PATH, limit);
      return sendJson(res, 200, { lines });
    }

    if (u.pathname === '/api/activity/stream') {
      await ensureActivityWatch();
      res.writeHead(200, {
        'content-type': 'text/event-stream; charset=utf-8',
        'cache-control': 'no-cache, no-store, must-revalidate',
        'connection': 'keep-alive',
      });
      // initial burst
      const lines = await tailLines(ACTIVITY_PATH, 40);
      for (const line of lines) {
        res.write(`data: ${JSON.stringify({ type: 'activity', line })}\n\n`);
      }
      activityClients.add(res);
      req.on('close', () => activityClients.delete(res));
      return;
    }

    if (u.pathname.startsWith('/mc/')) {
      const rel = u.pathname.replace(/^\/?mc\//, '');
      const fp = path.join(MC_DIR, rel);
      if (!fp.startsWith(MC_DIR)) return send(res, 400, 'bad path');
      if (!(await fileExists(fp))) return send(res, 404, 'not found');

      const ext = path.extname(fp).toLowerCase();
      const ct = ext === '.md' ? 'text/markdown; charset=utf-8' : 'text/plain; charset=utf-8';
      const body = await readFile(fp, 'utf8');
      res.writeHead(200, { 'content-type': ct, 'cache-control': 'no-store' });
      return res.end(body);
    }

    return send(res, 404, 'not found');
  } catch (e) {
    return send(res, 500, `error: ${e?.message || e}`);
  }
});

server.listen(cfg.port || 3200, cfg.bind || '127.0.0.1', () => {
  console.log(`Mission Control UI running at http://${cfg.bind || '127.0.0.1'}:${cfg.port || 3200}`);
  console.log(`Mission Control dir: ${MC_DIR}`);
});
