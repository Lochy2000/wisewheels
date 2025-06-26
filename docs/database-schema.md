# Database Schema

## Overview

WheelWise uses Supabase (PostgreSQL) as its primary database with Row Level Security (RLS) enabled for all tables. The schema is designed to support community-driven accessibility data with real-time updates.

## Tables

### 1. hazard_reports

**Purpose**: Store community-reported accessibility issues and hazards.

```sql
CREATE TABLE hazard_reports (
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
```

**Columns**:
- `id`: Unique identifier (UUID)
- `location`: Human-readable location description
- `issue`: Brief description of the accessibility issue
- `description`: Detailed description (optional)
- `status`: Current status (active, in-progress, resolved)
- `reported_at`: Timestamp of report creation
- `reported_by`: Name/identifier of reporter
- `upvotes`: Community upvote count
- `latitude`: GPS latitude (optional)
- `longitude`: GPS longitude (optional)

**Indexes**:
- Primary key on `id`
- Planned: Spatial index on `latitude, longitude`
- Planned: Index on `status` for filtering

### 2. forum_posts

**Purpose**: Store community forum discussions and posts.

```sql
CREATE TABLE forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  posted_at timestamptz DEFAULT now(),
  likes integer DEFAULT 0,
  replies integer DEFAULT 0,
  category post_category DEFAULT 'general'
);
```

**Columns**:
- `id`: Unique identifier (UUID)
- `title`: Post title
- `content`: Post content/body
- `author`: Name/identifier of author
- `posted_at`: Timestamp of post creation
- `likes`: Community like count
- `replies`: Number of replies (updated via triggers)
- `category`: Post category (general, travel-tips, accessibility, equipment)

**Indexes**:
- Primary key on `id`
- Planned: Index on `category` for filtering
- Planned: Index on `posted_at` for sorting

## Enums

### hazard_status

```sql
CREATE TYPE hazard_status AS ENUM ('active', 'in-progress', 'resolved');
```

**Values**:
- `active`: Issue is currently present and unresolved
- `in-progress`: Issue is being addressed
- `resolved`: Issue has been fixed

### post_category

```sql
CREATE TYPE post_category AS ENUM ('general', 'travel-tips', 'accessibility', 'equipment');
```

**Values**:
- `general`: General discussions
- `travel-tips`: Travel advice and recommendations
- `accessibility`: Accessibility-related topics
- `equipment`: Wheelchair and mobility equipment discussions

## Row Level Security (RLS)

### hazard_reports Policies

```sql
-- Allow anyone to read hazard reports
CREATE POLICY "Anyone can read hazard reports"
  ON hazard_reports
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to create hazard reports
CREATE POLICY "Anyone can create hazard reports"
  ON hazard_reports
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to update hazard reports (for upvoting)
CREATE POLICY "Anyone can update hazard reports"
  ON hazard_reports
  FOR UPDATE
  TO public
  USING (true);
```

### forum_posts Policies

```sql
-- Allow anyone to read forum posts
CREATE POLICY "Anyone can read forum posts"
  ON forum_posts
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to create forum posts
CREATE POLICY "Anyone can create forum posts"
  ON forum_posts
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to update forum posts (for liking)
CREATE POLICY "Anyone can update forum posts"
  ON forum_posts
  FOR UPDATE
  TO public
  USING (true);
```

**Note**: Current policies allow public access for MVP. Future versions will implement user authentication and more restrictive policies.

## Functions

### increment_upvotes

```sql
CREATE OR REPLACE FUNCTION increment_upvotes(report_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE hazard_reports 
  SET upvotes = upvotes + 1 
  WHERE id = report_id;
END;
$$ LANGUAGE plpgsql;
```

**Purpose**: Safely increment upvote count for hazard reports.

### increment_likes

```sql
CREATE OR REPLACE FUNCTION increment_likes(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE forum_posts 
  SET likes = likes + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;
```

**Purpose**: Safely increment like count for forum posts.

## Sample Data

The migration includes sample data for testing and demonstration:

### Sample Hazard Reports
- Main Street Station elevator outage
- Central Park construction blocking path
- City Library automatic door repair (resolved)

### Sample Forum Posts
- London accessible hotel recommendations
- Lightweight wheelchair discussion
- New accessible restaurant review

## Planned Schema Extensions

### 1. User Authentication

```sql
-- Planned: User profiles table
CREATE TABLE user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE,
  display_name text,
  accessibility_needs jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 2. Places and Reviews

```sql
-- Planned: Accessible places table
CREATE TABLE accessible_places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  latitude decimal NOT NULL,
  longitude decimal NOT NULL,
  accessibility_score integer CHECK (accessibility_score >= 0 AND accessibility_score <= 100),
  features jsonb,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Planned: User reviews table
CREATE TABLE place_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id uuid REFERENCES accessible_places(id),
  user_id uuid REFERENCES user_profiles(id),
  rating integer CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  accessibility_notes text,
  created_at timestamptz DEFAULT now()
);
```

### 3. Route History

```sql
-- Planned: Saved routes table
CREATE TABLE saved_routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id),
  name text NOT NULL,
  start_location jsonb NOT NULL,
  end_location jsonb NOT NULL,
  route_data jsonb NOT NULL,
  accessibility_preferences jsonb,
  created_at timestamptz DEFAULT now()
);
```

## Migration Strategy

### Current Migration
- File: `supabase/migrations/20250607223555_mellow_dream.sql`
- Creates initial schema with sample data
- Enables RLS and creates basic policies

### Future Migrations
- User authentication integration
- Extended place and review system
- Route saving and history
- Advanced accessibility features
- Performance optimizations and indexes

## Backup and Recovery

### Automated Backups
- Supabase provides automated daily backups
- Point-in-time recovery available
- Cross-region backup replication (production)

### Data Export
- Regular exports of community data
- CSV export functionality for users
- API endpoints for data portability

## Performance Considerations

### Current Optimizations
- UUID primary keys for distributed scaling
- Timestamp defaults for automatic sorting
- Integer counters for efficient aggregation

### Planned Optimizations
- Spatial indexes for location-based queries
- Full-text search indexes for content
- Materialized views for complex aggregations
- Connection pooling and read replicas