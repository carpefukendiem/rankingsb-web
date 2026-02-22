const { createClient } = require('@supabase/supabase-js');

/**
 * Johnny 5 Conversation Memory System
 * Stores and retrieves conversation history from Supabase
 */

class ConversationMemory {
    constructor() {
        this.supabase = null;
        this.sessionId = null;
        this.initialized = false;
    }

    /**
     * Initialize Supabase connection
     */
    async initialize() {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            console.error('❌ Supabase credentials not found in environment');
            console.error('   Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
            return false;
        }

        try {
            this.supabase = createClient(supabaseUrl, supabaseKey, {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            });

            // Test connection
            const { error } = await this.supabase.from('conversations').select('count', { count: 'exact', head: true });
            
            if (error) {
                console.error('❌ Supabase connection failed:', error.message);
                return false;
            }

            this.initialized = true;
            console.log('✅ Supabase conversation memory connected');
            return true;
        } catch (err) {
            console.error('❌ Failed to initialize Supabase:', err.message);
            return false;
        }
    }

    /**
     * Set current session ID
     */
    setSession(sessionId) {
        this.sessionId = sessionId;
    }

    /**
     * Store a message in the database
     */
    async storeMessage(role, content, metadata = {}) {
        if (!this.initialized) {
            console.warn('⚠️ Memory not initialized, message not stored');
            return null;
        }

        if (!this.sessionId) {
            console.warn('⚠️ No session ID set, message not stored');
            return null;
        }

        const message = {
            session_id: this.sessionId,
            role: role,
            content: content,
            metadata: {
                ...metadata,
                timestamp: new Date().toISOString()
            }
        };

        const { data, error } = await this.supabase
            .from('conversations')
            .insert(message)
            .select()
            .single();

        if (error) {
            console.error('❌ Failed to store message:', error.message);
            return null;
        }

        // Update last_accessed in session_context
        await this.supabase
            .from('session_context')
            .upsert({
                session_id: this.sessionId,
                last_accessed: new Date().toISOString()
            }, { onConflict: 'session_id' });

        return data;
    }

    /**
     * Retrieve recent conversation history
     */
    async getRecentHistory(limit = 50) {
        if (!this.initialized || !this.sessionId) {
            return [];
        }

        const { data, error } = await this.supabase
            .from('conversations')
            .select('*')
            .eq('session_id', this.sessionId)
            .order('created_at', { ascending: true })
            .limit(limit);

        if (error) {
            console.error('❌ Failed to retrieve history:', error.message);
            return [];
        }

        return data || [];
    }

    /**
     * Search through all conversations
     */
    async searchConversations(query, limit = 20) {
        if (!this.initialized) {
            return [];
        }

        const { data, error } = await this.supabase
            .from('conversations')
            .select('*')
            .textSearch('content', query, {
                type: 'websearch',
                config: 'english'
            })
            .limit(limit);

        if (error) {
            console.error('❌ Search failed:', error.message);
            return [];
        }

        return data || [];
    }

    /**
     * Get session summary/context
     */
    async getSessionContext() {
        if (!this.initialized || !this.sessionId) {
            return null;
        }

        const { data, error } = await this.supabase
            .from('session_context')
            .select('*')
            .eq('session_id', this.sessionId)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error('❌ Failed to get session context:', error.message);
        }

        return data;
    }

    /**
     * Update session context with new facts/preferences
     */
    async updateSessionContext(updates) {
        if (!this.initialized || !this.sessionId) {
            return false;
        }

        const { error } = await this.supabase
            .from('session_context')
            .upsert({
                session_id: this.sessionId,
                ...updates,
                last_accessed: new Date().toISOString()
            }, { onConflict: 'session_id' });

        if (error) {
            console.error('❌ Failed to update context:', error.message);
            return false;
        }

        return true;
    }

    /**
     * Store a conversation summary
     */
    async storeSummary(summary, keyPoints = []) {
        if (!this.initialized || !this.sessionId) {
            return null;
        }

        const { data, error } = await this.supabase
            .from('conversation_summaries')
            .insert({
                session_id: this.sessionId,
                summary: summary,
                key_points: keyPoints
            })
            .select()
            .single();

        if (error) {
            console.error('❌ Failed to store summary:', error.message);
            return null;
        }

        return data;
    }

    /**
     * Get conversations from a specific date range
     */
    async getConversationsByDate(startDate, endDate, limit = 100) {
        if (!this.initialized) {
            return [];
        }

        const { data, error } = await this.supabase
            .from('conversations')
            .select('*')
            .gte('created_at', startDate)
            .lte('created_at', endDate)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('❌ Failed to get conversations by date:', error.message);
            return [];
        }

        return data || [];
    }

    /**
     * Format conversation history for LLM context
     */
    formatForLLM(messages) {
        return messages.map(msg => ({
            role: msg.role,
            content: msg.content
        }));
    }

    /**
     * Close connection
     */
    async close() {
        this.initialized = false;
        this.supabase = null;
    }
}

// Singleton instance
const memory = new ConversationMemory();

module.exports = { ConversationMemory, memory };
