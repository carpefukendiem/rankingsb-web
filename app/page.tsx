'use client';

import { useEffect, useMemo, useState } from 'react';

type Task = {
  file: string;
  title: string;
  status: string;
  priority: string;
  assignees: string;
  url: string;
};

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [working, setWorking] = useState<string>('');
  const [ticker, setTicker] = useState<string>('loading…');

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data.tasks || []);
    })().catch(() => {});

    (async () => {
      const res = await fetch('/api/working');
      const data = await res.json();
      setWorking(data.text || '');
    })().catch(() => {});

    let stop = false;
    const tick = async () => {
      try {
        const res = await fetch('/api/ticker');
        const data = await res.json();
        if (!stop) setTicker(data.headline || 'idle');
      } catch {
        if (!stop) setTicker('idle');
      }
    };

    tick();
    const t = setInterval(tick, 15000);
    return () => {
      stop = true;
      clearInterval(t);
    };
  }, []);

  const byPriority = useMemo(() => {
    const rank: Record<string, number> = { urgent: 1, high: 2, med: 3, low: 4 };
    return [...tasks].sort((a, b) => (rank[a.priority] || 99) - (rank[b.priority] || 99));
  }, [tasks]);

  return (
    <div style={{ background: '#0b0f17', color: '#e5e7eb', minHeight: '100vh' }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '14px 16px',
          borderBottom: '1px solid #1f2937',
          background: 'rgba(11,15,23,0.9)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700 }}>
          Mission Control
          <span
            title="Live ticker (commit-based)"
            style={{
              fontWeight: 500,
              fontSize: 12,
              color: '#94a3b8',
              border: '1px solid #1f2937',
              background: '#111827',
              padding: '4px 8px',
              borderRadius: 999,
              maxWidth: '62vw',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {ticker}
          </span>
        </div>
        <nav style={{ display: 'flex', gap: 10, fontSize: 14 }}>
          <a style={{ color: '#60a5fa', textDecoration: 'none' }} href="https://clawdcontrol.com" target="_blank" rel="noreferrer">
            Clawd Control
          </a>
          <a
            style={{ color: '#60a5fa', textDecoration: 'none' }}
            href="https://github.com/carpefukendiem/mission-control"
            target="_blank"
            rel="noreferrer"
          >
            Repo
          </a>
        </nav>
      </header>

      <main style={{ padding: 16, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14 }}>
          <section style={{ border: '1px solid #1f2937', borderRadius: 14, background: '#111827', padding: 14 }}>
            <h3 style={{ margin: '0 0 8px 0' }}>Tasks</h3>
            <div style={{ color: '#94a3b8', marginBottom: 10 }}>Live from GitHub: <code>mission-control/tasks/</code></div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {byPriority.length === 0 ? (
                <div style={{ color: '#94a3b8' }}>No tasks yet.</div>
              ) : (
                byPriority.map((t) => (
                  <div key={t.file} style={{ border: '1px solid #1f2937', borderRadius: 12, padding: 10, background: '#0f172a' }}>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: 14 }}>{t.title}</h4>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 12, color: '#94a3b8' }}>
                      <div>
                        <b>Status:</b> {t.status}
                      </div>
                      <div>
                        <b>Priority:</b> {t.priority}
                      </div>
                      <div>
                        <b>Assignees:</b> {t.assignees}
                      </div>
                      <div>
                        <a style={{ color: '#60a5fa', textDecoration: 'none' }} href={t.url} target="_blank" rel="noreferrer">
                          open
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section style={{ border: '1px solid #1f2937', borderRadius: 14, background: '#111827', padding: 14 }}>
            <h3 style={{ margin: '0 0 8px 0' }}>Working</h3>
            <div style={{ color: '#94a3b8', marginBottom: 10 }}>Live from GitHub: <code>mission-control/WORKING.md</code></div>
            <pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontSize: 12, color: '#cbd5e1' }}>{working}</pre>
          </section>
        </div>

        <div style={{ marginTop: 14, color: '#94a3b8', fontSize: 12 }}>
          Public dashboard. Ticker shows latest Git commits (safe). Want a private version later with auth + richer telemetry? We can.
        </div>
      </main>

      <style>{`@media (max-width: 900px){ main > div { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
