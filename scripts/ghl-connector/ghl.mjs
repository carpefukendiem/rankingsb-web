#!/usr/bin/env node

// Minimal scaffold for a GoHighLevel connector.
// IMPORTANT: Do not commit API keys. Use env vars.

const BASE_URL = process.env.GHL_BASE_URL || 'https://services.leadconnectorhq.com';
const API_KEY = process.env.GHL_API_KEY;

function die(msg) {
  console.error(msg);
  process.exit(1);
}

function help() {
  console.log(`
GHL Connector

Env:
  GHL_API_KEY      (required)
  GHL_BASE_URL     (optional) default: ${BASE_URL}

Commands:
  help
  ping

Notes:
  This is a scaffold. Once API endpoints are confirmed, we’ll add commands to sync pipelines/workflows.
`);
}

async function request(path, { method = 'GET', headers = {}, body } = {}) {
  if (!API_KEY) die('Missing env var: GHL_API_KEY');

  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      ...headers,
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${method} ${path} -> ${res.status} ${text.slice(0, 200)}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function main() {
  const cmd = process.argv[2] || 'help';

  if (cmd === 'help') return help();

  if (cmd === 'ping') {
    // Placeholder ping: we need a known public endpoint for your API key type.
    // Once confirmed, replace this with a real endpoint.
    console.log('Ping scaffold OK. Next: wire a real endpoint for this API key type.');
    return;
  }

  help();
  process.exit(1);
}

main().catch((e) => {
  console.error(e?.stack || String(e));
  process.exit(1);
});
