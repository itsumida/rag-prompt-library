// Supabase Configuration
const SUPABASE_URL = 'https://vfookygzjbcmgvmfgvwf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_2ZTGPumK-9eaKCRL3kUQcQ_9TB7xcAU';

// Initialize Supabase client
// The CDN library exposes 'supabase' globally, so we use 'supabaseClient' instead
let supabaseClient;
try {
    if (window.supabase && window.supabase.createClient) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase client initialized successfully');
    } else {
        console.error('Supabase library not loaded');
    }
} catch (err) {
    console.error('Error initializing Supabase:', err);
}
