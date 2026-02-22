-- Supabase Schema for Johnny 5 Conversation Memory
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Main conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT NOT NULL,
    message_id TEXT,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_conversations_session_id ON conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_role ON conversations(role);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_conversations_content_search 
    ON conversations 
    USING gin(to_tsvector('english', content));

-- Session context table (stores summaries, preferences, key facts)
CREATE TABLE IF NOT EXISTS session_context (
    session_id TEXT PRIMARY KEY,
    user_id TEXT,
    summary TEXT,
    key_facts JSONB DEFAULT '[]',
    preferences JSONB DEFAULT '{}',
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_session_context_user_id ON session_context(user_id);
CREATE INDEX IF NOT EXISTS idx_session_context_last_accessed ON session_context(last_accessed DESC);

-- Conversation summaries table
CREATE TABLE IF NOT EXISTS conversation_summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT NOT NULL REFERENCES session_context(session_id) ON DELETE CASCADE,
    summary TEXT NOT NULL,
    key_points JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_summaries_session_id ON conversation_summaries(session_id);

-- Row Level Security (RLS) policies
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_context ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_summaries ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role full access on conversations" 
    ON conversations FOR ALL 
    USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on session_context" 
    ON session_context FOR ALL 
    USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on summaries" 
    ON conversation_summaries FOR ALL 
    USING (auth.role() = 'service_role');

-- Function to update last_accessed timestamp
CREATE OR REPLACE FUNCTION update_last_accessed()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_accessed = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update last_accessed
DROP TRIGGER IF EXISTS trigger_update_last_accessed ON session_context;
CREATE TRIGGER trigger_update_last_accessed
    BEFORE UPDATE ON session_context
    FOR EACH ROW
    EXECUTE FUNCTION update_last_accessed();

-- Function to search conversations
CREATE OR REPLACE FUNCTION search_conversations(search_query TEXT, limit_count INT DEFAULT 20)
RETURNS TABLE (
    id UUID,
    session_id TEXT,
    role TEXT,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    rank real
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.session_id,
        c.role,
        c.content,
        c.created_at,
        ts_rank(to_tsvector('english', c.content), plainto_tsquery('english', search_query)) as rank
    FROM conversations c
    WHERE to_tsvector('english', c.content) @@ plainto_tsquery('english', search_query)
    ORDER BY rank DESC, c.created_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Grant access to authenticated users (adjust as needed)
GRANT SELECT, INSERT ON conversations TO authenticated;
GRANT SELECT, INSERT, UPDATE ON session_context TO authenticated;
GRANT SELECT, INSERT ON conversation_summaries TO authenticated;

-- Success message
SELECT 'Johnny 5 Memory Schema Created Successfully!' as status;
