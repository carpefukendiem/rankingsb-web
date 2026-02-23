const { memory } = require('./conversation-memory');

/**
 * Automatic Conversation Logger
 * Integrates with OpenClaw to store all conversations in Supabase
 */

class AutoMemory {
    constructor() {
        this.initialized = false;
        this.sessionId = null;
        this.userId = null;
    }

    async initialize(sessionId, userId = null) {
        const connected = await memory.initialize();
        if (!connected) {
            console.error('❌ AutoMemory: Could not connect to Supabase');
            return false;
        }

        this.sessionId = sessionId;
        this.userId = userId;
        memory.setSession(sessionId);
        this.initialized = true;

        console.log('✅ AutoMemory active — all conversations will be stored');
        return true;
    }

    /**
     * Log user message
     */
    async logUser(content, metadata = {}) {
        if (!this.initialized) return;

        await memory.storeMessage('user', content, {
            ...metadata,
            userId: this.userId,
            autoLogged: true
        });
    }

    /**
     * Log assistant message
     */
    async logAssistant(content, metadata = {}) {
        if (!this.initialized) return;

        await memory.storeMessage('assistant', content, {
            ...metadata,
            userId: this.userId,
            autoLogged: true
        });
    }

    /**
     * Log system event
     */
    async logSystem(content, metadata = {}) {
        if (!this.initialized) return;

        await memory.storeMessage('system', content, {
            ...metadata,
            userId: this.userId,
            autoLogged: true
        });
    }

    /**
     * Get recent conversation history
     */
    async getRecent(limit = 50) {
        if (!this.initialized) return [];
        return await memory.getRecentHistory(limit);
    }

    /**
     * Search past conversations
     */
    async search(query, limit = 20) {
        if (!this.initialized) return [];
        return await memory.searchConversations(query, limit);
    }

    /**
     * Store a key fact about the user
     */
    async rememberFact(fact, category = 'general') {
        if (!this.initialized) return;

        const context = await memory.getSessionContext() || {};
        const keyFacts = context.key_facts || [];
        
        keyFacts.push({
            fact,
            category,
            timestamp: new Date().toISOString()
        });

        await memory.updateSessionContext({
            key_facts: keyFacts
        });
    }

    /**
     * Get stored user preferences/facts
     */
    async getContext() {
        if (!this.initialized) return null;
        return await memory.getSessionContext();
    }
}

// Singleton instance
const autoMemory = new AutoMemory();

module.exports = { AutoMemory, autoMemory };
