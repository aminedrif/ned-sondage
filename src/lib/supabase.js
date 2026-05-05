import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const mockAuth = {
  getSession: async () => ({ data: { session: null } }),
  signInWithPassword: async () => ({ data: {}, error: { message: 'Supabase not configured. Update .env with real credentials.' } }),
  signOut: async () => {},
  onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
};

const mockClient = {
  from: () => ({
    insert: async () => ({ error: { message: 'Supabase not configured. Update .env with real credentials.' } }),
    select: () => ({
      order: async () => ({ data: [], error: null }),
    }),
  }),
  channel: () => ({
    on: function () { return this; },
    subscribe: () => {},
  }),
  removeChannel: () => {},
  auth: mockAuth,
};

let supabase;
try {
  if (supabaseUrl && supabaseUrl !== 'your_url_here' && supabaseAnonKey && supabaseAnonKey !== 'your_anon_key_here') {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    console.warn('[Supabase] Missing or placeholder credentials in .env — running in offline mode');
    supabase = mockClient;
  }
} catch (e) {
  console.error('[Supabase] Client init error:', e);
  supabase = mockClient;
}

export { supabase };
