# Architecture

## Technology Stack

### Frontend
- **Framework**: React Native 0.74.6
- **Platform**: Expo SDK 52.0.30
- **Navigation**: Expo Router 4.0.17
- **Language**: TypeScript
- **Styling**: React Native StyleSheet
- **Icons**: Lucide React Native

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (planned)
- **Real-time**: Supabase Realtime
- **File Storage**: Supabase Storage (planned)

### External APIs
- **Routing**: OpenRouteService API
- **Accessibility Data**: Wheelmap API
- **Map Data**: Overpass API (OpenStreetMap)
- **Location Services**: Expo Location

## Project Structure

```
wheelwise/
├── app/                          # Expo Router pages
│   ├── _layout.tsx              # Root layout
│   ├── (tabs)/                  # Tab navigation group
│   │   ├── _layout.tsx         # Tab bar configuration
│   │   ├── index.tsx           # Home/Map screen
│   │   ├── routes.tsx          # Route planning
│   │   ├── places.tsx          # Place discovery
│   │   ├── community.tsx       # Community features
│   │   └── profile.tsx         # User settings
│   └── +not-found.tsx          # 404 page
├── components/                   # Reusable components
│   └── LucideIcon.tsx          # Icon wrapper
├── hooks/                       # Custom React hooks
│   └── useFrameworkReady.ts    # Framework initialization
├── lib/                         # Utilities and services
│   ├── apis.ts                 # External API integrations
│   ├── database.ts             # Database operations
│   └── supabase.ts             # Supabase client
├── supabase/                    # Database schema
│   └── migrations/             # SQL migration files
└── docs/                        # Documentation
```

## Navigation Architecture

### Primary Navigation: Tabs
- **Map/Home**: Main dashboard and map view
- **Routes**: Route planning and navigation
- **Places**: Accessible place discovery
- **Community**: Hazard reports and forum
- **Profile**: User settings and preferences

### Secondary Navigation
- **Stack Navigation**: Within each tab for detailed views
- **Modal Navigation**: For forms and overlays
- **Deep Linking**: URL-based navigation (planned)

## Data Flow

### Client-Side State Management
- **Local State**: React useState for component state
- **Global State**: Context API for shared state (planned)
- **Caching**: In-memory caching for API responses

### Real-Time Updates
- **Supabase Realtime**: Live updates for hazard reports and forum posts
- **Optimistic Updates**: Immediate UI updates with rollback on failure
- **Background Sync**: Periodic data synchronization

## Security Architecture

### Data Protection
- **Row Level Security**: Supabase RLS policies
- **API Key Management**: Environment variables
- **Input Validation**: Client and server-side validation

### Privacy
- **Anonymous Usage**: No required authentication for basic features
- **Data Minimization**: Collect only necessary information
- **User Control**: Clear privacy settings and data deletion

## Performance Considerations

### Optimization Strategies
- **Lazy Loading**: Components and data loaded on demand
- **Image Optimization**: Compressed images from Pexels
- **Bundle Splitting**: Code splitting for web platform
- **Caching**: API response caching and offline storage

### Platform-Specific Optimizations
- **Web**: Service worker for offline capability (planned)
- **Mobile**: Native performance optimizations
- **Cross-Platform**: Shared business logic with platform-specific UI