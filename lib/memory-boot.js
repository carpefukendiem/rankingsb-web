/**
 * Memory Boot — Automatic Session Initialization
 * 
 * This module initializes Supabase conversation memory at session start.
 * Call this at the beginning of every session to enable automatic logging.
 * 
 * Usage: require('./lib/memory-boot').boot(sessionId, userId)
 */

const { autoMemory } = require('./auto-memory');

let memoryBooted = false;

async function bootMemory(sessionId, userId = null) {
  if (memoryBooted) {
    return { success: true, alreadyBooted: true };
  }

  try {
    const connected = await autoMemory.initialize(sessionId, userId);
    
    if (connected) {
      memoryBooted = true;
      console.log('🧠 Memory booted — all conversations will be stored in Supabase');
      
      // Log the session start
      await autoMemory.logSystem('Session started', {
        sessionId,
        userId,
        timestamp: new Date().toISOString()
      });
      
      return { success: true, alreadyBooted: false };
    } else {
      console.warn('⚠️ Memory boot failed — conversations will NOT be stored');
      return { success: false, error: 'Failed to connect to Supabase' };
    }
  } catch (err) {
    console.error('❌ Memory boot error:', err.message);
    return { success: false, error: err.message };
  }
}

async function logUserMessage(content, metadata = {}) {
  if (!memoryBooted) {
    console.warn('⚠️ Memory not booted — message not logged');
    return;
  }
  await autoMemory.logUser(content, metadata);
}

async function logAssistantMessage(content, metadata = {}) {
  if (!memoryBooted) {
    console.warn('⚠️ Memory not booted — message not logged');
    return;
  }
  await autoMemory.logAssistant(content, metadata);
}

module.exports = {
  bootMemory,
  logUserMessage,
  logAssistantMessage,
  autoMemory,
  get isBooted() { return memoryBooted; }
};
