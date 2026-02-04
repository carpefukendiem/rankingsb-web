import { NextResponse } from 'next/server';
import { OWNER, REPO, ghHeaders } from '../_github';

export async function GET() {
  const r = await fetch(`https://raw.githubusercontent.com/${OWNER}/${REPO}/main/mission-control/WORKING.md`, {
    headers: ghHeaders(),
    next: { revalidate: 30 },
  });
  const text = r.ok ? await r.text() : '';
  return NextResponse.json({ text });
}
