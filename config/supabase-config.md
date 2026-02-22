# Supabase Configuration - OpenClaw Workspace
## Database Connection for Conversation Memory

---

## Project Details
**Project Name:** Johnny5-Memory
**Region:** us-west-1 (closest to Santa Barbara)
**Database:** PostgreSQL 15

---

## Connection Strings

### Transaction Pooler (Recommended for serverless)
```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true
```

### Direct Connection (For migrations/schema changes)
```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### Connection Pooler (Session mode)
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```

---

## Environment Variables

```bash
# Supabase
SUPABASE_URL=https://[PROJECT-REF].supabase.co
SUPABASE_ANON_KEY=[ANON-KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE-ROLE-KEY]
SUPABASE_DB_PASSWORD=[DB-PASSWORD]
```

---

## Database Schema

### Table: conversations
```sql
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    message_id TEXT,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for fast retrieval
CREATE INDEX idx_conversations_session_id ON conversations(session_id);
CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);
CREATE INDEX idx_conversations_role ON conversations(role);

-- Full-text search on content
CREATE INDEX idx_conversations_content_search ON conversations USING gin(to_tsvector('english', content));
```

### Table: session_context
```sql
CREATE TABLE session_context (
    session_id TEXT PRIMARY KEY,
    user_id TEXT,
    summary TEXT,
    key_facts JSONB DEFAULT '[]',
    preferences JSONB DEFAULT '{}',
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_session_context_user_id ON session_context(user_id);
CREATE INDEX idx_session_context_last_accessed ON session_context(last_accessed DESC);
```

### Table: conversation_summaries
```sql
CREATE TABLE conversation_summaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    summary TEXT NOT NULL,
    key_points JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_summaries_session_id ON conversation_summaries(session_id);
```

---

## RLS Policies (Row Level Security)

```sql
-- Enable RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_context ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role can do everything" ON conversations
    FOR ALL USING (auth.role() = 'service_role');
    
CREATE POLICY "Service role can do everything" ON session_context
    FOR ALL USING (auth.role() = 'service_role');
```

---

## API Usage

### Store Message
```javascript
await supabase
    .from('conversations')
    .insert({
        session_id: 'session-123',
        role: 'user',
        content: 'Hello Johnny',
        metadata: { channel: 'webchat', ip: '192.168.1.1' }
    });
```

### Retrieve Recent History
```javascript
const { data } = await supabase
    .from('conversations')
    .select('*')
    .eq('session_id', 'session-123')
    .order('created_at', { ascending: false })
    .limit(50);
```

### Search Conversations
```javascript
const { data } = await supabase
    .from('conversations')
    .select('*')
    .textSearch('content', 'supabase', {
        type: 'websearch',
        config: 'english'
    });
```

---

*Setup Date: February 22, 2026*
*Purpose: Persistent conversation memory for Johnny 5*
