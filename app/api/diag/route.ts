import { NextResponse } from 'next/server';
import { OWNER, REPO } from '../_github';

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || OWNER;
  const repo = process.env.GITHUB_REPO || REPO;
  return NextResponse.json({
    owner,
    repo,
    hasToken: !!token,
    tokenPrefix: token ? token.slice(0, 4) : null,
  });
}
