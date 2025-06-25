# WheelWise

[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-52.0.30-blue.svg)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.74.6-green.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Your accessible travel companion for wheelchair users - Find accessible routes, places, and community support all in one app.

## Overview

WheelWise is a comprehensive accessibility-focused travel companion app built with React Native and Expo. It helps wheelchair users navigate the world with confidence by providing accessible route planning, discovering wheelchair-friendly places, and connecting with a supportive community.

### Key Features

- **🗺️ Accessible Route Planning** - Find wheelchair-friendly paths using OpenRouteService API
- **📍 Discover Accessible Places** - Locate nearby accessible venues using Wheelmap and OpenStreetMap data
- **🚨 Real-time Hazard Reports** - Community-driven reporting of accessibility issues
- **💬 Community Forum** - Connect with other wheelchair users for tips and support
- **⚙️ Accessibility Settings** - Customizable preferences for individual needs

## Tech Stack

### Frontend
- **React Native** 0.74.6 with Expo SDK 52.0.30
- **Expo Router** 4.0.17 for file-based navigation
- **TypeScript** for type safety
- **Lucide React Native** for consistent iconography

### Backend & APIs
- **Supabase** for database and real-time features
- **OpenRouteService** for accessible routing
- **Wheelmap API** for accessibility data
- **Overpass API** for OpenStreetMap queries

### Navigation
- Tab-based primary navigation
- Stack navigation within tabs
- Modal overlays for forms and details

## Project Structure

```
app/
├── _layout.tsx                 # Root layout with Stack navigator
├── (tabs)/                     # Tab-based navigation group
│   ├── _layout.tsx            # Tab bar configuration
│   ├── index.tsx              # Home/Map screen
│   ├── routes.tsx             # Route planning
│   ├── places.tsx             # Accessible places discovery
│   ├── community.tsx          # Community forum and reports
│   └── profile.tsx            # User settings and preferences
├── +not-found.tsx             # 404 error page
hooks/
├── useFrameworkReady.ts       # Framework initialization hook
lib/
├── apis.ts                    # External API integrations
└── supabase.ts               # Supabase client and types
supabase/
└── migrations/               # Database schema migrations
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wheelwise.git
   cd wheelwise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   EXPO_PUBLIC_OPENROUTESERVICE_API_KEY=your_ors_api_key
   EXPO_PUBLIC_WHEELMAP_API_KEY=your_wheelmap_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### API Keys Setup

#### Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Run the migration in `supabase/migrations/` to set up the database schema

#### OpenRouteService
1. Sign up at [openrouteservice.org](https://openrouteservice.org)
2. Create an API key for routing services
3. Free tier includes 2,000 requests/day

#### Wheelmap (Optional)
1. Request API access at [wheelmap.org](https://wheelmap.org)
2. Used for enhanced accessibility data

## Development

### Available Scripts

- `npm run dev` - Start Expo development server
- `npm run build:web` - Build for web deployment
- `npm run lint` - Run ESLint

### Code Style

- **TypeScript** for all new code
- **StyleSheet.create** for component styling
- **Functional components** with hooks
- **File-based routing** with Expo Router

### Component Guidelines

```typescript
// Example component structure
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExampleScreen() {
  const [state, setState] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Screen Title</Text>
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

## Database Schema

The app uses Supabase with the following main tables:

### `hazard_reports`
- Community-reported accessibility issues
- Real-time status updates
- Geographic coordinates for mapping

### `forum_posts`
- Community discussions and tips
- Categorized by topic (travel, equipment, etc.)
- Like and reply functionality

## API Integration

### Route Planning
```typescript
import { openRouteServiceApi } from '@/lib/apis';

const route = await openRouteServiceApi.getDirections({
  coordinates: [[startLon, startLat], [endLon, endLat]],
  profile: 'wheelchair',
  options: {
    avoid_features: ['steps'],
    surface_type: ['paved']
  }
});
```

### Accessibility Data
```typescript
import { wheelmapApi } from '@/lib/apis';

const places = await wheelmapApi.searchNodes(
  latitude,
  longitude,
  1000, // radius in meters
  'yes' // wheelchair accessibility
);
```

## Platform Support

- **Web** - Primary development platform
- **iOS** - Full native support
- **Android** - Full native support

### Web Limitations
- No native haptic feedback
- Limited location services
- No camera access in browser

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and patterns
- Add TypeScript types for all new code
- Test on multiple platforms when possible
- Update documentation for new features
- Ensure accessibility compliance

## Deployment

### Web Deployment
```bash
npm run build:web
# Deploy the dist/ folder to your hosting provider
```

### Mobile Deployment
1. Configure app.json for your target platforms
2. Use EAS Build for production builds
3. Submit to app stores following platform guidelines

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Wheelmap.org](https://wheelmap.org) for accessibility data
- [OpenRouteService](https://openrouteservice.org) for routing capabilities
- [OpenStreetMap](https://openstreetmap.org) community for map data
- Accessibility advocates and wheelchair users who inspire this work

## Support

- 📧 Email: support@wheelwise.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/wheelwise/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/wheelwise/discussions)

---

**Made with ❤️ for the accessibility community**