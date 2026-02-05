export const OWNER = process.env.GITHUB_OWNER || 'carpefukendiem';
export const REPO = process.env.GITHUB_REPO || 'mission-control';

export function ghHeaders() {
  const token = process.env.GITHUB_TOKEN;
  // GitHub accepts both `Bearer` and `token`. `token` tends to be the most compatible
  // across classic PATs and fine-grained tokens.
  return {
    Accept: 'application/vnd.github+json',
    ...(token ? { Authorization: `token ${token}` } : {}),
  };
}
