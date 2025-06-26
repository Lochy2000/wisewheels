# Development Setup

## Prerequisites

### Required Software
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Git**: For version control
- **Expo CLI**: For React Native development

### Optional Tools
- **VS Code**: Recommended editor with React Native extensions
- **Android Studio**: For Android development and emulation
- **Xcode**: For iOS development (macOS only)
- **Flipper**: For debugging React Native apps

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/wheelwise.git
cd wheelwise
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Expo CLI (if not already installed)

```bash
npm install -g @expo/cli
```

### 4. Environment Setup

Create a `.env` file in the root directory:

```env
# Supabase Configuration (Required)
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenRouteService API (Required for routing features)
EXPO_PUBLIC_OPENROUTESERVICE_API_KEY=your_ors_api_key

# Wheelmap API (Optional, enhances place data)
EXPO_PUBLIC_WHEELMAP_API_KEY=your_wheelmap_api_key
```

### 5. Database Setup

#### Option A: Use Existing Supabase Project
1. Get Supabase credentials from project maintainer
2. Add to `.env` file
3. Database is already configured

#### Option B: Create New Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Run the migration:
   ```bash
   # Copy the SQL from supabase/migrations/20250607223555_mellow_dream.sql
   # Paste and run in Supabase SQL Editor
   ```

## Development Commands

### Start Development Server

```bash
npm run dev
# or
npm start
```

This will start the Expo development server and open the Expo DevTools in your browser.

### Platform-Specific Development

#### Web Development
```bash
npm run dev
# Press 'w' in terminal to open web version
```
- Opens in browser at `http://localhost:8081`
- Hot reloading enabled
- Chrome DevTools available

#### iOS Development (macOS only)
```bash
npm run dev
# Press 'i' in terminal to open iOS simulator
```
- Requires Xcode installed
- iOS Simulator will launch automatically
- Hot reloading enabled

#### Android Development
```bash
npm run dev
# Press 'a' in terminal to open Android emulator
```
- Requires Android Studio and emulator setup
- USB debugging for physical devices
- Hot reloading enabled

### Build Commands

#### Web Build
```bash
npm run build:web
```
- Creates production build in `dist/` folder
- Optimized for deployment

#### Mobile Builds
```bash
# Development build
expo build:android
expo build:ios

# Production build (requires Expo account)
expo build:android --type app-bundle
expo build:ios --type archive
```

## Development Workflow

### 1. Code Structure

Follow the established patterns:

```typescript
// Component structure
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ComponentName() {
  const [state, setState] = useState('');

  useEffect(() => {
    // Side effects
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Component Title</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
});
```

### 2. File Organization

```
app/
├── _layout.tsx              # Root layout (DO NOT MODIFY)
├── (tabs)/                  # Tab navigation
│   ├── _layout.tsx         # Tab configuration
│   ├── index.tsx           # Home screen
│   ├── routes.tsx          # Route planning
│   ├── places.tsx          # Place discovery
│   ├── community.tsx       # Community features
│   └── profile.tsx         # User settings
└── +not-found.tsx          # 404 page

components/
├── LucideIcon.tsx          # Icon wrapper
└── [ComponentName].tsx     # Reusable components

lib/
├── apis.ts                 # External API integrations
├── database.ts             # Database operations
└── supabase.ts             # Supabase client

hooks/
└── useFrameworkReady.ts    # Framework initialization (DO NOT MODIFY)
```

### 3. Styling Guidelines

- Use `StyleSheet.create` for all styles
- Follow the existing color palette:
  ```typescript
  const colors = {
    primary: '#4F46E5',
    secondary: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    }
  };
  ```

### 4. Icon Usage

Import icons from the wrapper component:

```typescript
import { MapPin, Search, Heart } from '@/components/LucideIcon';

// Usage
<MapPin size={24} color="#4F46E5" />
```

### 5. Database Operations

Use the provided API functions:

```typescript
import { hazardReportsApi, forumApi } from '@/lib/database';

// Fetch data
const reports = await hazardReportsApi.getAll();
const posts = await forumApi.getAll();

// Create data
const newReport = await hazardReportsApi.create({
  location: 'Main Street',
  issue: 'Blocked ramp',
  description: 'Construction blocking access',
  status: 'active',
  reported_by: 'User',
  latitude: null,
  longitude: null
});
```

## Debugging

### React Native Debugger

1. Install React Native Debugger
2. Start development server
3. Enable debugging in Expo DevTools
4. Use breakpoints and console logging

### Flipper (Advanced)

1. Install Flipper desktop app
2. Configure React Native integration
3. Use network inspector, layout inspector, and logs

### Console Logging

```typescript
// Development logging
console.log('Debug info:', data);
console.warn('Warning message');
console.error('Error details:', error);

// Production logging (remove before deployment)
if (__DEV__) {
  console.log('Development only log');
}
```

## Testing

### Manual Testing Checklist

#### Navigation
- [ ] All tabs accessible and functional
- [ ] Back navigation works correctly
- [ ] Deep linking works (if implemented)

#### Features
- [ ] Location permission handling
- [ ] Form submission and validation
- [ ] Real-time updates in community section
- [ ] Error handling for network failures

#### Accessibility
- [ ] Screen reader compatibility
- [ ] High contrast mode
- [ ] Large text support
- [ ] Keyboard navigation

#### Performance
- [ ] Fast app startup
- [ ] Smooth scrolling and animations
- [ ] Efficient memory usage
- [ ] Network request optimization

### Automated Testing (Planned)

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

## Troubleshooting

### Common Issues

#### 1. Metro bundler issues
```bash
# Clear cache and restart
npx expo start --clear
```

#### 2. Node modules issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

#### 3. iOS simulator issues
```bash
# Reset iOS simulator
xcrun simctl erase all
```

#### 4. Android emulator issues
```bash
# Cold boot Android emulator
# In Android Studio: AVD Manager > Cold Boot Now
```

#### 5. Environment variable issues
- Ensure `.env` file is in root directory
- Restart development server after changes
- Check variable names start with `EXPO_PUBLIC_`

### Getting Help

1. **Documentation**: Check this documentation first
2. **Expo Docs**: [docs.expo.dev](https://docs.expo.dev)
3. **React Native Docs**: [reactnative.dev](https://reactnative.dev)
4. **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
5. **GitHub Issues**: Create issue in project repository
6. **Community**: Expo Discord, React Native Community

## Code Quality

### Linting

```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

### Formatting

```bash
# Format code with Prettier
npm run format
```

### TypeScript

- Use TypeScript for all new code
- Define interfaces for data structures
- Avoid `any` type when possible
- Use proper type imports

```typescript
// Good
import type { HazardReport } from '@/lib/database';

// Avoid
import { HazardReport } from '@/lib/database';
```

## Deployment Preparation

### Environment Configuration

Create environment-specific files:
- `.env.development`
- `.env.staging`
- `.env.production`

### Build Optimization

1. Remove console logs
2. Optimize images and assets
3. Enable production optimizations
4. Test on multiple devices and platforms

### Pre-deployment Checklist

- [ ] All features working correctly
- [ ] No console errors or warnings
- [ ] Performance testing completed
- [ ] Accessibility testing completed
- [ ] Cross-platform testing completed
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] API keys and secrets secured