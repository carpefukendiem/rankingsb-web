import { NextResponse } from 'next/server';
import { OWNER, REPO, ghHeaders } from '../_github';

export async function GET() {
  try {
    const r = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/mission-control/WORKING.md`, {
      headers: ghHeaders(),
      next: { revalidate: 30 },
    });
    if (!r.ok) return NextResponse.json({ text: '', error: `github ${r.status}`, hasToken: !!process.env.GITHUB_TOKEN });
    const data: any = await r.json();
    const contentB64 = data?.content || '';
    const text = Buffer.from(String(contentB64), 'base64').toString('utf8');
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ text: '' });
  }
}
