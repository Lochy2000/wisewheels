# API Integration

## Overview

WheelWise integrates with multiple external APIs to provide comprehensive accessibility data and routing capabilities. This document outlines the current integrations, planned integrations, and implementation details.

## Current Integrations

### 1. Supabase

**Status**: ✅ Fully Implemented

**Purpose**: Primary database and real-time backend services.

**Implementation**: `lib/supabase.ts`, `lib/database.ts`

**Features**:
- PostgreSQL database with Row Level Security
- Real-time subscriptions for live updates
- RESTful API with automatic TypeScript types
- Built-in authentication (planned)

**Configuration**:
```typescript
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**API Operations**:
- `hazardReportsApi.getAll()`: Fetch all hazard reports
- `hazardReportsApi.create()`: Create new hazard report
- `hazardReportsApi.incrementUpvotes()`: Upvote a report
- `forumApi.getAll()`: Fetch all forum posts
- `forumApi.create()`: Create new forum post
- `forumApi.incrementLikes()`: Like a post

### 2. Expo Location

**Status**: ✅ Implemented

**Purpose**: Device location services for current position and navigation.

**Implementation**: `app/(tabs)/index.tsx`

**Features**:
- Current location detection
- Reverse geocoding for address display
- Permission handling
- Cross-platform compatibility

**Usage**:
```typescript
const { status } = await Location.requestForegroundPermissionsAsync();
const location = await Location.getCurrentPositionAsync({});
const address = await Location.reverseGeocodeAsync({
  latitude: location.coords.latitude,
  longitude: location.coords.longitude,
});
```

## Planned Integrations

### 1. OpenRouteService API

**Status**: 📋 Planned (Implementation Ready)

**Purpose**: Wheelchair-accessible route planning and navigation.

**Implementation**: `lib/apis.ts` (prepared)

**Features**:
- Wheelchair-specific routing profiles
- Avoid stairs and steep inclines
- Surface type preferences (paved, unpaved)
- Isochrone analysis for reachable areas
- Turn-by-turn directions with accessibility notes

**Configuration**:
```typescript
const ORS_API_KEY = process.env.EXPO_PUBLIC_OPENROUTESERVICE_API_KEY;
const ORS_BASE_URL = 'https://api.openrouteservice.org/v2';
```

**API Endpoints**:
- `/directions/wheelchair`: Wheelchair-accessible routing
- `/isochrones/wheelchair`: Reachable area analysis
- `/geocode/search`: Address to coordinates conversion

**Request Example**:
```typescript
const routeRequest = {
  coordinates: [[startLon, startLat], [endLon, endLat]],
  profile: 'wheelchair',
  options: {
    avoid_features: ['steps'],
    surface_type: ['paved']
  }
};
```

### 2. Wheelmap API

**Status**: 📋 Planned (Implementation Ready)

**Purpose**: Crowdsourced accessibility data for venues and places.

**Implementation**: `lib/apis.ts` (prepared)

**Features**:
- Wheelchair accessibility ratings (yes/limited/no)
- Accessible toilet information
- Venue categories and types
- Community-verified data
- Geographic search capabilities

**Configuration**:
```typescript
const WHEELMAP_API_KEY = process.env.EXPO_PUBLIC_WHEELMAP_API_KEY;
const WHEELMAP_BASE_URL = 'https://wheelmap.org/api';
```

**API Endpoints**:
- `/nodes`: Search for accessible places
- `/categories`: Get place categories
- `/node_types`: Get specific place types

**Search Example**:
```typescript
const accessiblePlaces = await wheelmapApi.searchNodes(
  latitude,
  longitude,
  1000, // radius in meters
  'yes' // wheelchair accessibility level
);
```

### 3. Overpass API (OpenStreetMap)

**Status**: 📋 Planned (Implementation Ready)

**Purpose**: Detailed accessibility data from OpenStreetMap.

**Implementation**: `lib/apis.ts` (prepared)

**Features**:
- Wheelchair-accessible POIs
- Accessible toilet locations
- Public transport accessibility
- Real-time data updates
- Custom query capabilities

**Query Examples**:
```typescript
// Find accessible toilets
const accessibleToilets = await overpassApi.queryAccessibleToilets(
  latitude,
  longitude,
  2000 // radius in meters
);

// Find accessible POIs
const accessiblePOIs = await overpassApi.queryAccessiblePOIs(
  latitude,
  longitude,
  1000
);
```

## API Integration Architecture

### Error Handling Strategy

```typescript
// Consistent error handling across all APIs
export const apiErrorHandler = {
  async handleRequest<T>(request: Promise<T>): Promise<T | null> {
    try {
      return await request;
    } catch (error) {
      console.error('API Error:', error);
      // Log to error tracking service
      return null;
    }
  }
};
```

### Caching Strategy

```typescript
// In-memory caching for API responses
class APICache {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private TTL = 5 * 60 * 1000; // 5 minutes

  get(key: string) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.TTL) {
      return cached.data;
    }
    return null;
  }

  set(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
}
```

### Rate Limiting

```typescript
// Rate limiting for external APIs
class RateLimiter {
  private requests = new Map<string, number[]>();
  private limits = {
    openrouteservice: { requests: 40, window: 60000 }, // 40 per minute
    wheelmap: { requests: 100, window: 60000 }, // 100 per minute
    overpass: { requests: 10, window: 60000 } // 10 per minute
  };

  async checkLimit(api: string): Promise<boolean> {
    const now = Date.now();
    const limit = this.limits[api];
    const requests = this.requests.get(api) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < limit.window);
    
    if (validRequests.length >= limit.requests) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    this.requests.set(api, validRequests);
    return true;
  }
}
```

## Environment Variables

### Required Variables

```env
# Supabase (Required)
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenRouteService (Required for routing)
EXPO_PUBLIC_OPENROUTESERVICE_API_KEY=your_ors_api_key

# Wheelmap (Optional, enhances place data)
EXPO_PUBLIC_WHEELMAP_API_KEY=your_wheelmap_api_key
```

### API Key Setup Instructions

#### Supabase
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings > API
4. Copy Project URL and anon/public key

#### OpenRouteService
1. Register at [openrouteservice.org](https://openrouteservice.org)
2. Create API key in dashboard
3. Free tier: 2,000 requests/day
4. Rate limit: 40 requests/minute

#### Wheelmap
1. Contact [wheelmap.org](https://wheelmap.org) for API access
2. API is primarily for non-commercial use
3. Rate limit: 100 requests/minute

## Data Flow

### Real-Time Updates

```typescript
// Supabase real-time subscriptions
const subscription = supabase
  .channel('hazard_reports_changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'hazard_reports' },
    (payload) => {
      // Handle real-time updates
      updateLocalState(payload);
    }
  )
  .subscribe();
```

### Offline Handling

```typescript
// Offline queue for API requests
class OfflineQueue {
  private queue: Array<{ api: string; method: string; data: any }> = [];

  add(api: string, method: string, data: any) {
    this.queue.push({ api, method, data });
    // Store in AsyncStorage for persistence
  }

  async processQueue() {
    while (this.queue.length > 0) {
      const request = this.queue.shift();
      try {
        await this.executeRequest(request);
      } catch (error) {
        // Re-queue failed requests
        this.queue.unshift(request);
        break;
      }
    }
  }
}
```

## Testing Strategy

### Mock Data
- Development uses mock data when API keys unavailable
- Consistent data structure for seamless switching
- Realistic test scenarios for edge cases

### API Testing
- Unit tests for API wrapper functions
- Integration tests with actual API endpoints
- Error handling and timeout testing
- Rate limiting validation

### Performance Testing
- Response time monitoring
- Concurrent request handling
- Cache effectiveness measurement
- Network failure recovery testing

## Security Considerations

### API Key Protection
- Environment variables for all sensitive keys
- No API keys in client-side code
- Server-side proxy for sensitive operations (planned)

### Data Validation
- Input sanitization for all API requests
- Response validation against expected schemas
- SQL injection prevention in database queries

### Privacy Protection
- Minimal data collection from external APIs
- User consent for location-based requests
- Data anonymization where possible

## Future Enhancements

### Planned API Integrations
- **Google Places API**: Enhanced place information
- **Transit APIs**: Real-time public transport accessibility
- **Weather APIs**: Weather impact on accessibility
- **Emergency Services**: Integration with local emergency systems

### Advanced Features
- **GraphQL Gateway**: Unified API interface
- **Webhook Integration**: Real-time external data updates
- **API Analytics**: Usage monitoring and optimization
- **Custom API**: WheelWise API for third-party integrations