import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface HazardReport {
  id: string;
  location: string;
  issue: string;
  description: string;
  status: 'active' | 'in-progress' | 'resolved';
  reported_at: string;
  reported_by: string;
  upvotes: number;
  latitude?: number;
  longitude?: number;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  posted_at: string;
  likes: number;
  replies: number;
  category: 'general' | 'travel-tips' | 'accessibility' | 'equipment';
}

// API functions
export const hazardReportsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('hazard_reports')
      .select('*')
      .order('reported_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(report: Omit<HazardReport, 'id' | 'reported_at' | 'upvotes'>) {
    const { data, error } = await supabase
      .from('hazard_reports')
      .insert([report])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async upvote(id: string) {
    const { data, error } = await supabase.rpc('increment_upvotes', {
      report_id: id
    });
    
    if (error) throw error;
    return data;
  }
};

export const forumApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('forum_posts')
      .select('*')
      .order('posted_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async create(post: Omit<ForumPost, 'id' | 'posted_at' | 'likes' | 'replies'>) {
    const { data, error } = await supabase
      .from('forum_posts')
      .insert([post])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async like(id: string) {
    const { data, error } = await supabase.rpc('increment_likes', {
      post_id: id
    });
    
    if (error) throw error;
    return data;
  }
};