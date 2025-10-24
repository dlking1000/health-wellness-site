import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ftfivtdofqnktacokgtj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0Zml2dGRvZnFua3RhY29rZ3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMDMyOTAsImV4cCI6MjA3Njg3OTI5MH0.4zjtYpTX18PlmYdfr-TlzrO9g1ZIKgkvTI859g359KQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Article {
  id: number;
  slug: string;
  keyword: string;
  title: string;
  content: string;
  format: string;
  word_count: number;
  products_mentioned: string[];
  created_at: string;
  updated_at: string;
}

