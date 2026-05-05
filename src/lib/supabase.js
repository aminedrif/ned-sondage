import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Guard against missing/placeholder env vars — app still renders, just can't talk to Supabase
let supabase;
try {
  if (supabaseUrl && supabaseUrl !== 'your_url_here' && supabaseAnonKey && supabaseAnonKey !== 'your_anon_key_here') {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    console.warn('[Supabase] Missing or placeholder credentials in .env — running in offline mode');
    // Create a mock client so the app doesn't crash
    supabase = {
      from: () => ({
        insert: async () => ({ error: { message: 'Supabase not configured. Update .env with real credentials.' } }),
        select: () => ({
          order: async () => ({ data: [], error: null }),
        }),
      }),
      channel: () => ({
        on: function() { return this; },
        subscribe: () => {},
      }),
      removeChannel: () => {},
    };
  }
} catch (e) {
  console.error('[Supabase] Client init error:', e);
  supabase = {
    from: () => ({
      insert: async () => ({ error: { message: 'Supabase init failed: ' + e.message } }),
      select: () => ({
        order: async () => ({ data: [], error: null }),
      }),
    }),
    channel: () => ({
      on: function() { return this; },
      subscribe: () => {},
    }),
    removeChannel: () => {},
  };
}

export { supabase };
