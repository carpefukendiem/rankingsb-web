export const OWNER = process.env.GITHUB_OWNER || 'carpefukendiem';
export const REPO = process.env.GITHUB_REPO || 'mission-control';

export function ghHeaders() {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: 'application/vnd.github+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
