# Mission Control (v1 — file-based)

This is the shared workspace that turns separate agent sessions into a coordinated squad.

## How it works
- **Tasks live in `mission-control/tasks/`** (one Markdown file per task).
- **Agent status lives in `mission-control/agents/`**.
- **Global priorities + routing live in `mission-control/WORKING.md`**.
- **Activity log is append-only in `mission-control/logs/activity.log`**.

Agents should:
1) Read `mission-control/WORKING.md`
2) Check `mission-control/tasks/` for assigned work
3) Update task files + log meaningful actions

## Task lifecycle
Inbox → Assigned → In Progress → Review → Done (or Blocked)
