import { NextResponse } from 'next/server';
import { OWNER, REPO } from '../_github';

async function fetchOk(url: string) {
  const r = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {}),
    },
    next: { revalidate: 0 },
  });
  return { ok: r.ok, status: r.status };
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || OWNER;
  const repo = process.env.GITHUB_REPO || REPO;

  const user = token ? await fetchOk('https://api.github.com/user') : { ok: false, status: 0 };
  const contents = await fetchOk(`https://api.github.com/repos/${owner}/${repo}/contents/mission-control/tasks`);

  return NextResponse.json({
    owner,
    repo,
    hasToken: !!token,
    tokenPrefix: token ? token.slice(0, 10) : null,
    githubUserOk: user.ok,
    githubUserStatus: user.status,
    contentsOk: contents.ok,
    contentsStatus: contents.status,
  });
}
