import { supabase } from './supabase';

export interface HazardReport {
  id: string;
  location: string;
  issue: string;
  description: string | null;
  status: 'active' | 'in-progress' | 'resolved';
  reported_at: string;
  reported_by: string;
  upvotes: number;
  latitude: number | null;
  longitude: number | null;
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

// Hazard Reports API
export const hazardReportsApi = {
  async getAll(): Promise<HazardReport[]> {
    try {
      const { data, error } = await supabase
        .from('hazard_reports')
        .select('*')
        .order('reported_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching hazard reports:', error);
      return [];
    }
  },

  async create(report: Omit<HazardReport, 'id' | 'reported_at' | 'upvotes'>): Promise<HazardReport | null> {
    try {
      const { data, error } = await supabase
        .from('hazard_reports')
        .insert([{
          location: report.location,
          issue: report.issue,
          description: report.description,
          status: report.status || 'active',
          reported_by: report.reported_by,
          latitude: report.latitude,
          longitude: report.longitude
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating hazard report:', error);
      return null;
    }
  },

  async updateStatus(id: string, status: 'active' | 'in-progress' | 'resolved'): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('hazard_reports')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating hazard report status:', error);
      return false;
    }
  },

  async incrementUpvotes(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.rpc('increment_upvotes', {
        report_id: id
      });
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error incrementing upvotes:', error);
      return false;
    }
  }
};

// Forum Posts API
export const forumApi = {
  async getAll(): Promise<ForumPost[]> {
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .select('*')
        .order('posted_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching forum posts:', error);
      return [];
    }
  },

  async getByCategory(category: string): Promise<ForumPost[]> {
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .select('*')
        .eq('category', category)
        .order('posted_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching forum posts by category:', error);
      return [];
    }
  },

  async create(post: Omit<ForumPost, 'id' | 'posted_at' | 'likes' | 'replies'>): Promise<ForumPost | null> {
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .insert([{
          title: post.title,
          content: post.content,
          author: post.author,
          category: post.category || 'general'
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating forum post:', error);
      return null;
    }
  },

  async incrementLikes(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.rpc('increment_likes', {
        post_id: id
      });
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error incrementing likes:', error);
      return false;
    }
  }
};

// Real-time subscriptions
export const subscriptions = {
  subscribeToHazardReports(callback: (reports: HazardReport[]) => void) {
    return supabase
      .channel('hazard_reports_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'hazard_reports' },
        () => {
          // Refetch all reports when changes occur
          hazardReportsApi.getAll().then(callback);
        }
      )
      .subscribe();
  },

  subscribeToForumPosts(callback: (posts: ForumPost[]) => void) {
    return supabase
      .channel('forum_posts_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'forum_posts' },
        () => {
          // Refetch all posts when changes occur
          forumApi.getAll().then(callback);
        }
      )
      .subscribe();
  }
};