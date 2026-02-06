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
  pipelines:list <locationId>
  contacts:upsert <locationId> <json>
  opportunities:create <locationId> <json>
  seed:sb-electricians <locationId> [--pipeline "NAME"] [--stage "NAME"] [--assignedTo USER_ID]

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
      Accept: 'application/json',
      // HighLevel/LeadConnector commonly requires a Version header.
      Version: '2021-07-28',
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

const SB_ELECTRICIAN_SEED = [
  // Santa Barbara + nearby (Goleta etc.). You can prune later; the goal is to get 20+ auditable sites queued.
  { name: 'CEC Electrical Services', website: 'https://cecelectricalservices.com/', zipHint: '93101' },
  { name: 'Republic Lighting Services', website: 'https://republiclighting.com/', zipHint: '93101' },
  { name: 'Electricians Service Team (Santa Barbara)', website: 'https://electriciansserviceteam.com/locations/santa-barbara/', zipHint: '93101' },
  { name: 'Bartlette Electric', website: 'https://www.yelp.com/biz/bartlette-electric-santa-barbara', zipHint: '93105' },
  { name: 'CA Electric', website: 'https://www.yelp.com/biz/ca-electric-santa-barbara-4', zipHint: '93103' },
  { name: 'TJ Myers Electric', website: 'http://tjmelectric.com', zipHint: '93110' },
  { name: 'Imperial Electric (Goleta)', website: 'http://www.imperialelectric.com', zipHint: '93110' },
  { name: "Walker's Electrical Repair Services", website: 'https://walkerselectrical.com/', zipHint: '93110' },
  { name: 'Angwin Electric (Goleta page)', website: 'https://www.angwinelectric.com/electrical-contractor-goleta-ca', zipHint: '93110' },
  // Add more from directories/BBB/YP manually as needed
];

function parseJsonArg(str) {
  try {
    return JSON.parse(str);
  } catch {
    die('Invalid JSON argument. Provide a JSON string.');
  }
}

async function pipelinesList(locationId) {
  const q = new URLSearchParams({ locationId });
  return request(`/opportunities/pipelines?${q.toString()}`);
}

async function contactsUpsert(locationId, payload) {
  return request(`/contacts/`, { method: 'POST', body: { locationId, ...payload } });
}

async function opportunitiesCreate(locationId, payload) {
  return request(`/opportunities/`, { method: 'POST', body: { locationId, ...payload } });
}

function pickPipeline(pipelines, preferredName) {
  const arr = Array.isArray(pipelines) ? pipelines : pipelines?.pipelines || pipelines?.data || [];
  if (!arr.length) return null;
  const byName = arr.find((p) => String(p?.name || '').toLowerCase() === preferredName.toLowerCase());
  if (byName) return byName;
  const prospects = arr.find((p) => String(p?.name || '').toLowerCase().includes('prospect'));
  return prospects || arr[0];
}

function pickStage(pipeline, preferredName) {
  const stages = pipeline?.stages || pipeline?.pipelineStages || [];
  if (!Array.isArray(stages) || !stages.length) return null;
  const byName = stages.find((s) => String(s?.name || '').toLowerCase() === String(preferredName || '').toLowerCase());
  if (byName) return byName;
  const preferred = stages.find((s) => String(s?.name || '').toLowerCase().includes('target'));
  return preferred || stages[0];
}

function getFlag(name) {
  const i = process.argv.indexOf(name);
  if (i === -1) return null;
  return process.argv[i + 1] || null;
}

async function seedSbElectricians(locationId) {
  const pipelineName = getFlag('--pipeline') || 'OSR — Santa Barbara Electricians';
  const stageName = getFlag('--stage') || 'Targeted (Not Contacted)';
  const assignedTo = getFlag('--assignedTo');

  const pipelines = await pipelinesList(locationId);
  const pipeline = pickPipeline(pipelines, pipelineName);
  if (!pipeline) die('No pipelines returned. Check Location ID and API key permissions.');

  const stage = pickStage(pipeline, stageName);
  if (!stage) die(`Pipeline "${pipeline?.name}" has no stages. Create stages in GHL first.`);

  console.log(`Using pipeline: ${pipeline.name} (${pipeline.id})`);
  console.log(`Using stage: ${stage.name} (${stage.id || stage._id})`);

  const tagsBase = ['NICHE_ELECTRICIAN', 'GEO_SANTA_BARBARA'];

  for (const item of SB_ELECTRICIAN_SEED) {
    const tags = [...tagsBase];
    if (item.zipHint) tags.push(`ZIP_${item.zipHint}`);

    // Create a minimal contact. (We can enrich later with phone/email once rep has it.)
    const contact = await contactsUpsert(locationId, {
      name: item.name,
      companyName: item.name,
      website: item.website,
      tags,
      source: 'Mission Control Seed',
    });

    const contactId = contact?.contact?.id || contact?.id || contact?.contactId;
    if (!contactId) {
      console.warn('Could not detect contactId from response:', contact);
      continue;
    }

    await opportunitiesCreate(locationId, {
      name: item.name,
      contactId,
      pipelineId: pipeline.id,
      pipelineStageId: stage.id || stage._id,
      status: 'open',
      source: 'Walkthrough → Leave-behind → Audit → Text',
      tags,
      ...(assignedTo ? { assignedTo } : {}),
    });

    console.log(`Seeded: ${item.name}`);
  }

  console.log('Done.');
}

async function main() {
  const cmd = process.argv[2] || 'help';

  if (cmd === 'help') return help();

  if (cmd === 'ping') {
    // Real ping: list pipelines for a location.
    const locationId = process.argv[3];
    if (!locationId) die('Usage: ping <locationId>');
    const data = await pipelinesList(locationId);
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (cmd === 'pipelines:list') {
    const locationId = process.argv[3];
    if (!locationId) die('Usage: pipelines:list <locationId>');
    const data = await pipelinesList(locationId);
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (cmd === 'contacts:upsert') {
    const locationId = process.argv[3];
    const json = process.argv[4];
    if (!locationId || !json) die('Usage: contacts:upsert <locationId> <json>');
    const data = await contactsUpsert(locationId, parseJsonArg(json));
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (cmd === 'opportunities:create') {
    const locationId = process.argv[3];
    const json = process.argv[4];
    if (!locationId || !json) die('Usage: opportunities:create <locationId> <json>');
    const data = await opportunitiesCreate(locationId, parseJsonArg(json));
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (cmd === 'seed:sb-electricians') {
    const locationId = process.argv[3];
    if (!locationId) die('Usage: seed:sb-electricians <locationId>');
    await seedSbElectricians(locationId);
    return;
  }

  help();
  process.exit(1);
}

main().catch((e) => {
  console.error(e?.stack || String(e));
  process.exit(1);
});
