#!/usr/bin/env node

/**
 * Test script for Johnny 5 Conversation Memory
 * Verifies Supabase connection and tests CRUD operations
 */

require('dotenv').config();
const { memory } = require('../lib/conversation-memory');

async function runTests() {
    console.log('🧪 Testing Johnny 5 Conversation Memory\n');
    console.log('=====================================\n');

    // Test 1: Initialize connection
    console.log('Test 1: Initialize Supabase connection');
    const initialized = await memory.initialize();
    if (!initialized) {
        console.error('❌ FAILED: Could not initialize Supabase');
        console.error('   Make sure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
        process.exit(1);
    }
    console.log('✅ PASSED: Connected to Supabase\n');

    // Set test session
    const testSessionId = `test-session-${Date.now()}`;
    memory.setSession(testSessionId);
    console.log(`Test session ID: ${testSessionId}\n`);

    // Test 2: Store messages
    console.log('Test 2: Store conversation messages');
    const messages = [
        { role: 'user', content: 'Hey Johnny, I need help with my SEO strategy' },
        { role: 'assistant', content: 'I\'d be happy to help! Let me look at your current setup...' },
        { role: 'user', content: 'My website is rankingsb.com and I want to rank for "Santa Barbara SEO"' },
        { role: 'assistant', content: 'Great target keyword. I see you\'re not currently in the top 10...' }
    ];

    for (const msg of messages) {
        const result = await memory.storeMessage(msg.role, msg.content, { test: true });
        if (!result) {
            console.error('❌ FAILED: Could not store message');
            process.exit(1);
        }
    }
    console.log(`✅ PASSED: Stored ${messages.length} messages\n`);

    // Test 3: Retrieve recent history
    console.log('Test 3: Retrieve conversation history');
    const history = await memory.getRecentHistory(10);
    if (history.length !== messages.length) {
        console.error(`❌ FAILED: Expected ${messages.length} messages, got ${history.length}`);
        process.exit(1);
    }
    console.log(`✅ PASSED: Retrieved ${history.length} messages`);
    console.log('   Sample:', history[0].content.substring(0, 50) + '...\n');

    // Test 4: Update session context
    console.log('Test 4: Update session context');
    const contextUpdated = await memory.updateSessionContext({
        summary: 'User wants help with SEO for rankingsb.com',
        key_facts: ['Website: rankingsb.com', 'Target: Santa Barbara SEO', 'Industry: Digital marketing'],
        preferences: { response_style: 'detailed', expertise_level: 'intermediate' }
    });
    if (!contextUpdated) {
        console.error('❌ FAILED: Could not update session context');
        process.exit(1);
    }
    console.log('✅ PASSED: Session context updated\n');

    // Test 5: Retrieve session context
    console.log('Test 5: Retrieve session context');
    const context = await memory.getSessionContext();
    if (!context || !context.summary) {
        console.error('❌ FAILED: Could not retrieve session context');
        process.exit(1);
    }
    console.log('✅ PASSED: Retrieved context');
    console.log('   Summary:', context.summary.substring(0, 50) + '...\n');

    // Test 6: Store summary
    console.log('Test 6: Store conversation summary');
    const summary = await memory.storeSummary(
        'User is starting an SEO agency in Santa Barbara. Needs help with ranking for local keywords.',
        ['SEO agency', 'Santa Barbara', 'local SEO', 'rankingsb.com']
    );
    if (!summary) {
        console.error('❌ FAILED: Could not store summary');
        process.exit(1);
    }
    console.log('✅ PASSED: Summary stored\n');

    // Test 7: Search conversations
    console.log('Test 7: Search conversations');
    const searchResults = await memory.searchConversations('SEO', 5);
    if (searchResults.length === 0) {
        console.error('❌ FAILED: Search returned no results');
        process.exit(1);
    }
    console.log(`✅ PASSED: Found ${searchResults.length} matching conversations\n`);

    // Test 8: Format for LLM
    console.log('Test 8: Format for LLM context');
    const formatted = memory.formatForLLM(history);
    if (formatted.length !== messages.length) {
        console.error('❌ FAILED: Format output incorrect');
        process.exit(1);
    }
    console.log('✅ PASSED: Formatted for LLM');
    console.log('   Sample:', JSON.stringify(formatted[0]).substring(0, 60) + '...\n');

    // All tests passed
    console.log('=====================================');
    console.log('✅ ALL TESTS PASSED!');
    console.log('=====================================');
    console.log('\nYour Supabase memory system is working correctly.');
    console.log('Every conversation will now be stored and retrievable.');
    
    // Cleanup
    await memory.close();
    process.exit(0);
}

// Run tests
runTests().catch(err => {
    console.error('❌ Test failed with error:', err);
    process.exit(1);
});
