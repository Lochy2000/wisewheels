# Deployment Guide

## Overview

This guide covers deployment strategies for WheelWise across different platforms and environments. The app is built with React Native and Expo, supporting web, iOS, and Android platforms.

## Prerequisites

### Required Accounts
- **Expo Account**: For mobile app builds and distribution
- **Supabase Account**: For backend services
- **Apple Developer Account**: For iOS App Store deployment (paid)
- **Google Play Console Account**: For Android Play Store deployment (paid)
- **Web Hosting Service**: For web deployment (Netlify, Vercel, etc.)

### Required Tools
- **Expo CLI**: Latest version
- **EAS CLI**: For production builds
- **Node.js**: Version 18+ for build processes
- **Git**: For version control and deployment

## Environment Configuration

### Environment Variables

Create environment-specific configuration files:

#### `.env.production`
```env
# Supabase Production
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key

# API Keys
EXPO_PUBLIC_OPENROUTESERVICE_API_KEY=your_production_ors_key
EXPO_PUBLIC_WHEELMAP_API_KEY=your_production_wheelmap_key

# App Configuration
EXPO_PUBLIC_APP_ENV=production
EXPO_PUBLIC_API_URL=https://api.wheelwise.app
```

#### `.env.staging`
```env
# Supabase Staging
EXPO_PUBLIC_SUPABASE_URL=https://your-staging-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_staging_anon_key

# API Keys (can use development keys)
EXPO_PUBLIC_OPENROUTESERVICE_API_KEY=your_development_ors_key
EXPO_PUBLIC_WHEELMAP_API_KEY=your_development_wheelmap_key

# App Configuration
EXPO_PUBLIC_APP_ENV=staging
EXPO_PUBLIC_API_URL=https://staging-api.wheelwise.app
```

### App Configuration

#### `app.json` Production Configuration
```json
{
  "expo": {
    "name": "WheelWise",
    "slug": "wheelwise",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "wheelwise",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#4F46E5"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.wheelwise.app",
      "buildNumber": "1"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#4F46E5"
      },
      "package": "com.wheelwise.app",
      "versionCode": 1
    },
    "web": {
      "bundler": "metro",
      "output": "single",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-font",
      "expo-location",
      "expo-camera"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "eas": {
        "projectId": "your-eas-project-id"
      }
    }
  }
}
```

## Web Deployment

### Build Process

```bash
# Install dependencies
npm install

# Build for production
npm run build:web

# Output will be in dist/ folder
```

### Netlify Deployment

#### Option 1: Git Integration
1. Connect repository to Netlify
2. Set build command: `npm run build:web`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

#### Option 2: Manual Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build:web

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

#### Netlify Configuration (`netlify.toml`)
```toml
[build]
  command = "npm run build:web"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

### Vercel Deployment

#### Configuration (`vercel.json`)
```json
{
  "buildCommand": "npm run build:web",
  "outputDirectory": "dist",
  "framework": "react",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### Deployment Commands
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## Mobile Deployment

### EAS Build Configuration

#### `eas.json`
```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m-medium"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### iOS Deployment

#### Prerequisites
- Apple Developer Account ($99/year)
- iOS Distribution Certificate
- App Store Connect app record

#### Build Process
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure project
eas build:configure

# Build for iOS
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios
```

#### App Store Connect Configuration
1. Create app record in App Store Connect
2. Fill in app information:
   - **Name**: WheelWise
   - **Category**: Navigation
   - **Age Rating**: 4+ (appropriate for all ages)
   - **Keywords**: accessibility, wheelchair, navigation, travel
3. Upload screenshots and app preview
4. Set pricing (free)
5. Submit for review

### Android Deployment

#### Prerequisites
- Google Play Console Account ($25 one-time fee)
- Android Keystore
- Google Play app record

#### Build Process
```bash
# Build for Android
eas build --platform android --profile production

# Submit to Google Play
eas submit --platform android
```

#### Google Play Console Configuration
1. Create app in Google Play Console
2. Fill in store listing:
   - **App name**: WheelWise
   - **Short description**: Accessible travel companion for wheelchair users
   - **Full description**: Comprehensive description of features
   - **Category**: Maps & Navigation
   - **Content rating**: Everyone
3. Upload screenshots and feature graphic
4. Set up pricing (free)
5. Submit for review

## Database Deployment

### Supabase Production Setup

#### 1. Create Production Project
```bash
# Create new Supabase project for production
# Use strong password and appropriate region
```

#### 2. Run Migrations
```sql
-- Copy and run the migration from:
-- supabase/migrations/20250607223555_mellow_dream.sql
-- In Supabase SQL Editor
```

#### 3. Configure Security
```sql
-- Enable additional security measures
ALTER DATABASE postgres SET log_statement = 'all';

-- Set up backup schedule
-- Configure in Supabase dashboard
```

#### 4. Environment Variables
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Database Backup Strategy

#### Automated Backups
- Supabase provides automated daily backups
- Configure backup retention period
- Set up cross-region backup replication

#### Manual Backup Process
```bash
# Export data using Supabase CLI (when available)
supabase db dump --file backup.sql

# Or use pg_dump directly
pg_dump "postgresql://user:pass@host:port/db" > backup.sql
```

## Monitoring and Analytics

### Error Tracking

#### Sentry Integration
```bash
# Install Sentry
npm install @sentry/react-native

# Configure in app
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'your-sentry-dsn',
});
```

### Performance Monitoring

#### Expo Analytics
```typescript
// Track app usage
import { Analytics } from 'expo-analytics';

const analytics = new Analytics('your-tracking-id');
analytics.hit('screen', { screen: 'Home' });
```

### Uptime Monitoring

#### Health Check Endpoints
```typescript
// Add health check endpoint
// app/health+api.ts
export function GET() {
  return Response.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}
```

## Security Considerations

### API Key Management

#### Production Security
- Use environment variables for all API keys
- Implement API key rotation strategy
- Monitor API usage and set up alerts

#### Server-Side Proxy (Recommended)
```typescript
// Implement server-side proxy for sensitive APIs
// app/api/route+api.ts
export async function POST(request: Request) {
  const body = await request.json();
  
  // Validate request
  if (!isValidRequest(body)) {
    return new Response('Invalid request', { status: 400 });
  }
  
  // Proxy to external API with server-side key
  const response = await fetch('https://api.external.com/endpoint', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.EXTERNAL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  
  return response;
}
```

### Data Protection

#### HTTPS Enforcement
- Ensure all API endpoints use HTTPS
- Implement HSTS headers
- Use secure cookie settings

#### Data Encryption
- Encrypt sensitive data at rest
- Use TLS for data in transit
- Implement proper key management

## Performance Optimization

### Build Optimization

#### Bundle Analysis
```bash
# Analyze bundle size
npx expo export --platform web --dev false
npx webpack-bundle-analyzer dist/static/js/*.js
```

#### Code Splitting
```typescript
// Implement lazy loading for routes
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### CDN Configuration

#### Asset Optimization
- Compress images and assets
- Use WebP format for images
- Implement lazy loading for images

#### Caching Strategy
```javascript
// Service worker for web caching
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open('images').then((cache) => {
        return cache.match(event.request).then((response) => {
          return response || fetch(event.request).then((fetchResponse) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
});
```

## Rollback Strategy

### Version Management

#### Semantic Versioning
- Use semantic versioning (MAJOR.MINOR.PATCH)
- Tag releases in Git
- Maintain changelog

#### Rollback Process
```bash
# Web rollback (Netlify)
netlify sites:list
netlify api listSiteDeploys --site-id=your-site-id
netlify api restoreSiteDeploy --site-id=your-site-id --deploy-id=previous-deploy-id

# Mobile rollback
# Use phased rollout in app stores
# Gradually increase rollout percentage
# Monitor crash rates and user feedback
```

### Database Rollback

#### Migration Rollback
```sql
-- Create rollback scripts for each migration
-- Store in version control
-- Test rollback procedures regularly
```

#### Data Backup Before Deployment
```bash
# Always backup before major deployments
pg_dump "connection-string" > pre-deployment-backup.sql
```

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Code review completed
- [ ] Environment variables configured
- [ ] Database migrations tested
- [ ] Performance testing completed
- [ ] Security scan completed
- [ ] Backup created

### Deployment
- [ ] Deploy to staging environment
- [ ] Smoke tests on staging
- [ ] Deploy to production
- [ ] Verify deployment health
- [ ] Monitor error rates
- [ ] Check performance metrics

### Post-Deployment
- [ ] Verify all features working
- [ ] Monitor user feedback
- [ ] Check analytics for anomalies
- [ ] Update documentation
- [ ] Communicate deployment to team
- [ ] Plan next release

## Troubleshooting

### Common Deployment Issues

#### Build Failures
```bash
# Clear cache and rebuild
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build:web
```

#### Environment Variable Issues
```bash
# Verify environment variables are set
echo $EXPO_PUBLIC_SUPABASE_URL

# Check for typos in variable names
# Ensure variables start with EXPO_PUBLIC_
```

#### Database Connection Issues
```bash
# Test database connection
curl -X POST 'https://your-project.supabase.co/rest/v1/hazard_reports' \
  -H "apikey: your-anon-key" \
  -H "Content-Type: application/json"
```

### Support and Escalation

#### Internal Support
1. Check deployment logs
2. Review error tracking (Sentry)
3. Check database logs
4. Verify external API status

#### External Support
1. **Expo Support**: For build and deployment issues
2. **Supabase Support**: For database and backend issues
3. **App Store Support**: For app review issues
4. **Hosting Provider Support**: For web deployment issues

This deployment guide should be updated as the project evolves and new deployment strategies are implemented.