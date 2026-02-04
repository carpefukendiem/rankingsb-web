import { NextResponse } from 'next/server';
import { OWNER, REPO, ghHeaders } from '../_github';

export async function GET() {
  const r = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/commits?per_page=10`, {
    headers: ghHeaders(),
    next: { revalidate: 15 },
  });
  if (!r.ok) return NextResponse.json({ headline: 'idle' });
  const commits = await r.json();
  const head = Array.isArray(commits) && commits[0] ? commits[0] : null;
  const msg = head?.commit?.message ? String(head.commit.message).split('\n')[0] : 'idle';
  return NextResponse.json({ headline: msg });
}
