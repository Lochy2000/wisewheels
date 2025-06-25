/*
  # Create tables for WheelWise app

  1. New Tables
    - `hazard_reports`
      - `id` (uuid, primary key)
      - `location` (text, not null)
      - `issue`(text, not null)
      - `description` (text)
      - `status` (enum: active, in-progress, resolved)
      - `reported_at` (timestamp)
      - `reported_by` (text)
      - `upvotes` (integer, default 0)
      - `latitude` (decimal)
      - `longitude` (decimal)
    
    - `forum_posts`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `content` (text, not null)
      - `author` (text, not null)
      - `posted_at` (timestamp)
      - `likes` (integer, default 0)
      - `replies` (integer, default 0)
      - `category` (enum: general, travel-tips, accessibility, equipment)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated users to create posts/reports
*/

-- Create enum types
CREATE TYPE hazard_status AS ENUM ('active', 'in-progress', 'resolved');
CREATE TYPE post_category AS ENUM ('general', 'travel-tips', 'accessibility', 'equipment');

-- Create hazard_reports table
CREATE TABLE IF NOT EXISTS hazard_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location text NOT NULL,
  issue text NOT NULL,
  description text,
  status hazard_status DEFAULT 'active',
  reported_at timestamptz DEFAULT now(),
  reported_by text NOT NULL,
  upvotes integer DEFAULT 0,
  latitude decimal,
  longitude decimal
);

-- Create forum_posts table
CREATE TABLE IF NOT EXISTS forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  posted_at timestamptz DEFAULT now(),
  likes integer DEFAULT 0,
  replies integer DEFAULT 0,
  category post_category DEFAULT 'general'
);

-- Enable Row Level Security
ALTER TABLE hazard_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for hazard_reports
CREATE POLICY "Anyone can read hazard reports"
  ON hazard_reports
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create hazard reports"
  ON hazard_reports
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update hazard reports"
  ON hazard_reports
  FOR UPDATE
  TO public
  USING (true);

-- Create policies for forum_posts
CREATE POLICY "Anyone can read forum posts"
  ON forum_posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create forum posts"
  ON forum_posts
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update forum posts"
  ON forum_posts
  FOR UPDATE
  TO public
  USING (true);

-- Create functions for incrementing counters
CREATE OR REPLACE FUNCTION increment_upvotes(report_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE hazard_reports 
  SET upvotes = upvotes + 1 
  WHERE id = report_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_likes(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE forum_posts 
  SET likes = likes + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Insert sample data
INSERT INTO hazard_reports (location, issue, description, status, reported_by, upvotes) VALUES
  ('Main Street Station', 'Elevator out of service', 'The main elevator has been broken for 2 days. Using the service elevator requires asking staff.', 'active', 'Sarah M.', 8),
  ('Central Park West Entrance', 'Construction blocking path', 'Temporary construction has blocked the accessible path. Alternative route via east entrance is available.', 'in-progress', 'Mike R.', 12),
  ('City Library', 'Automatic door repaired', 'The front entrance automatic door is now working properly again.', 'resolved', 'Lisa K.', 5);

INSERT INTO forum_posts (title, content, author, likes, replies, category) VALUES
  ('Best accessible hotels in London?', 'Planning a trip next month and looking for recommendations for wheelchair-friendly hotels with good accessibility features.', 'TravelLover23', 7, 12, 'travel-tips'),
  ('Lightweight wheelchair recommendations', 'My current chair is getting heavy for daily use. Looking for lightweight options that are still durable.', 'ActiveLife', 15, 8, 'equipment'),
  ('New accessible restaurant opened downtown', 'Just visited "The Inclusive Table" - amazing food and excellent accessibility. Wide doorways, accessible bathrooms, and staff trained in accessibility awareness.', 'FoodieWheels', 23, 6, 'general');