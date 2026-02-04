import { NextResponse } from 'next/server';
import { OWNER, REPO, ghHeaders } from '../_github';

async function fetchJson(u: string) {
  const r = await fetch(u, { headers: ghHeaders(), next: { revalidate: 30 } });
  if (!r.ok) throw new Error(`github ${r.status}`);
  return r.json();
}

async function fetchText(u: string) {
  const r = await fetch(u, { headers: ghHeaders(), next: { revalidate: 30 } });
  if (!r.ok) throw new Error(`text ${r.status}`);
  return r.text();
}

function parseTask(md: string, fallbackTitle: string) {
  const title = (md.match(/^#\s*Task:\s*(.+)$/m) || [])[1] || fallbackTitle;
  const status = (md.match(/^\*\*Status:\*\*\s*(.+)$/m) || [])[1] || 'unknown';
  const priority = (md.match(/^\*\*Priority:\*\*\s*(.+)$/m) || [])[1] || 'unknown';
  const assignees = (md.match(/^\*\*Assignees:\*\*\s*(.+)$/m) || [])[1] || '';
  return { title: title.trim(), status: status.trim(), priority: priority.trim(), assignees: assignees.trim() };
}

export async function GET() {
  try {
    const list = await fetchJson(`https://api.github.com/repos/${OWNER}/${REPO}/contents/mission-control/tasks`);
  const files = (Array.isArray(list) ? list : []).filter((x: any) => x?.type === 'file' && x?.name?.endsWith('.md') && x?.name !== 'TEMPLATE.md');

  const tasks = await Promise.all(
    files.map(async (f: any) => {
      const md = await fetchText(f.download_url);
      const parsed = parseTask(md, f.name.replace(/\.md$/i, ''));
      return {
        file: f.name,
        ...parsed,
        url: `https://github.com/${OWNER}/${REPO}/blob/main/mission-control/tasks/${encodeURIComponent(f.name)}`,
      };
    })
  );

    return NextResponse.json({ tasks });
  } catch (e: any) {
    return NextResponse.json({ tasks: [], error: String(e?.message || e) }, { status: 200 });
  }
}
