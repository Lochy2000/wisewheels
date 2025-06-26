# Features

## Implemented Features

### 1. Home/Map Screen (`app/(tabs)/index.tsx`)

**Status**: ✅ Implemented

**Description**: Central dashboard providing quick access to all app features with location-based information.

**Key Components**:
- Location detection and display
- Quick action buttons (Plan Route, Find Toilets, Report Issue, Favorites)
- Nearby accessible places list with ratings
- Recent hazard reports feed
- Search functionality

**Data Sources**:
- Mock data for nearby places
- Real Supabase data for hazard reports
- Expo Location for current position

**Features**:
- Responsive design for all screen sizes
- Real-time hazard report updates
- Accessibility scoring for places
- Distance calculations

### 2. Route Planning (`app/(tabs)/routes.tsx`)

**Status**: 🚧 Partially Implemented (UI Complete, API Integration Pending)

**Description**: Comprehensive route planning with accessibility preferences.

**Key Components**:
- From/To location inputs with current location detection
- Accessibility preference toggles (avoid stairs, smooth surfaces, public transit)
- Multiple route options with accessibility scores
- Turn-by-turn directions with accessibility notes
- Route comparison (fastest vs. most accessible vs. scenic)

**Planned Integrations**:
- OpenRouteService API for wheelchair-accessible routing
- Real-time traffic and accessibility updates
- Offline route caching

**Current Limitations**:
- Uses mock data for route options
- No actual navigation integration
- No real-time updates

### 3. Place Discovery (`app/(tabs)/places.tsx`)

**Status**: 🚧 Partially Implemented (UI Complete, API Integration Pending)

**Description**: Discover and filter wheelchair-accessible venues and services.

**Key Components**:
- Search and filter functionality
- Category-based browsing (restaurants, shopping, transport, healthcare, recreation)
- Accessibility scoring and feature tags
- Detailed place information with reviews
- Save favorites functionality (planned)

**Planned Integrations**:
- Wheelmap API for accessibility data
- Overpass API for OpenStreetMap data
- User reviews and ratings system

**Current Limitations**:
- Uses mock data for places
- No real-time availability information
- No user-generated content

### 4. Community Features (`app/(tabs)/community.tsx`)

**Status**: ✅ Fully Implemented

**Description**: Community-driven hazard reporting and discussion forum.

**Key Components**:

#### Hazard Reports
- Real-time hazard report submission
- Status tracking (active, in-progress, resolved)
- Community upvoting system
- Location-based reporting
- Automatic timestamp formatting

#### Forum
- Category-based discussions (general, travel-tips, accessibility, equipment)
- Post creation with rich content
- Like and reply system (replies UI pending)
- Real-time post updates

**Database Integration**:
- Full Supabase integration with real-time subscriptions
- Row Level Security policies
- Automatic data validation

**Features**:
- Real-time updates via Supabase subscriptions
- Optimistic UI updates
- Error handling and loading states
- Modal-based forms for content creation

### 5. User Profile (`app/(tabs)/profile.tsx`)

**Status**: 🚧 Partially Implemented (UI Complete, Backend Integration Pending)

**Description**: User settings, preferences, and accessibility customization.

**Key Components**:
- Accessibility settings (voice guidance, high contrast, large text)
- General app settings (notifications, location services, dark mode)
- Account management (saved places, privacy settings)
- App information and support links

**Planned Features**:
- User authentication integration
- Personalized accessibility profiles
- Usage statistics and achievements
- Data export and privacy controls

**Current Limitations**:
- No user authentication
- Settings don't persist
- No actual functionality behind most settings

## Planned Features

### 6. Authentication System

**Status**: 📋 Planned

**Description**: User accounts with personalized experiences.

**Components**:
- Email/password authentication via Supabase Auth
- Social login options (Google, Apple)
- Anonymous usage with optional account creation
- Profile management and data synchronization

### 7. Offline Functionality

**Status**: 📋 Planned

**Description**: Core features available without internet connection.

**Components**:
- Offline map caching
- Downloaded route storage
- Cached place information
- Offline hazard report queue

### 8. Advanced Navigation

**Status**: 📋 Planned

**Description**: Turn-by-turn navigation with accessibility features.

**Components**:
- Voice guidance with accessibility announcements
- Visual navigation with accessibility warnings
- Real-time route adjustments
- Integration with device accessibility features

### 9. Social Features

**Status**: 📋 Planned

**Description**: Enhanced community interaction and networking.

**Components**:
- User profiles and following system
- Private messaging for accessibility tips
- Group planning for accessible trips
- Local accessibility meetups and events

### 10. Business Integration

**Status**: 📋 Planned

**Description**: Tools for businesses to improve and showcase accessibility.

**Components**:
- Business dashboard for accessibility information
- Verification system for accessibility claims
- Analytics for accessibility improvements
- Integration with booking and reservation systems

## Feature Dependencies

### External API Dependencies
- **OpenRouteService**: Route planning functionality
- **Wheelmap**: Accessibility data for places
- **Overpass API**: OpenStreetMap data integration
- **Expo Location**: GPS and location services

### Internal Dependencies
- **Supabase**: Database, authentication, real-time updates
- **Expo Router**: Navigation and deep linking
- **React Native**: Cross-platform mobile development

## Accessibility Compliance

All features are designed to meet WCAG 2.1 AA standards:
- Screen reader compatibility
- High contrast mode support
- Large text options
- Keyboard navigation support
- Voice control integration (planned)