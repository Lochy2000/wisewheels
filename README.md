# WheelWise

![WheelWise Logo](https://github.com/user-attachments/assets/22abb1d8-86f3-431c-8358-24867c7e8979)

[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-52.0.30-blue.svg)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.74.6-green.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Your accessible travel companion for wheelchair users - Find accessible routes, places, and community support all in one app.

## 🚨 Current Status: Development Phase

**⚠️ Important Notice**: This project is currently experiencing critical dependency issues that prevent the app from starting. We recommend setting up a local development environment for full functionality. See [Known Issues](./docs/known-issues.md) for details.

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[📋 Project Overview](./docs/project-overview.md)** - Vision, goals, and value proposition
- **[🏗️ Architecture](./docs/architecture.md)** - Technical architecture and technology stack
- **[✨ Features](./docs/features.md)** - Detailed feature documentation and implementation status
- **[🗄️ Database Schema](./docs/database-schema.md)** - Complete database structure and relationships
- **[🔌 API Integration](./docs/api-integration.md)** - External API integrations and implementation
- **[⚙️ Development Setup](./docs/development-setup.md)** - Complete setup instructions and workflow
- **[🐛 Known Issues](./docs/known-issues.md)** - Current limitations and workarounds
- **[🗺️ Future Roadmap](./docs/future-roadmap.md)** - Planned features and development phases
- **[🚀 Deployment Guide](./docs/deployment-guide.md)** - Production deployment instructions
- **[🤝 Contributing](./docs/contributing.md)** - How to contribute to the project

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/wheelwise.git
cd wheelwise

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start development server
npm run dev
```

### Required Environment Variables

```env
# Supabase (Required)
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenRouteService (Required for routing)
EXPO_PUBLIC_OPENROUTESERVICE_API_KEY=your_ors_api_key

# Wheelmap (Optional)
EXPO_PUBLIC_WHEELMAP_API_KEY=your_wheelmap_api_key
```

## 🎯 Project Vision

WheelWise is an accessibility-focused travel companion app designed specifically for wheelchair users and people with mobility challenges. Our mission is to make navigation and travel planning more accessible by providing:

- **🗺️ Accessible Route Planning** - Find wheelchair-friendly paths using OpenRouteService API
- **📍 Discover Accessible Places** - Locate nearby accessible venues using Wheelmap and OpenStreetMap data
- **🚨 Real-time Hazard Reports** - Community-driven reporting of accessibility issues
- **💬 Community Forum** - Connect with other wheelchair users for tips and support
- **⚙️ Accessibility Settings** - Customizable preferences for individual needs

## 🏗️ Technology Stack

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

## 📱 Features Overview

### ✅ Implemented Features

#### 🏠 Home/Map Screen
- Location detection and display
- Quick action buttons for common tasks
- Nearby accessible places with ratings
- Real-time hazard reports feed

#### 🗺️ Community Features (Fully Functional)
- **Hazard Reports**: Real-time community reporting of accessibility issues
- **Forum**: Category-based discussions with real-time updates
- **Database Integration**: Full Supabase integration with live subscriptions

### 🚧 Partially Implemented

#### 🛣️ Route Planning
- Complete UI with accessibility preferences
- Multiple route options with scoring
- Turn-by-turn directions interface
- *Pending: OpenRouteService API integration*

#### 📍 Place Discovery
- Search and filtering functionality
- Category-based browsing
- Accessibility scoring system
- *Pending: Wheelmap API integration*

#### 👤 User Profile
- Accessibility settings interface
- App preferences and configuration
- *Pending: Authentication system*

### 📋 Planned Features
- User authentication and profiles
- Offline functionality
- Advanced navigation with voice guidance
- Social features and networking
- Business integration tools

## 🗄️ Database Schema

The app uses Supabase with PostgreSQL and includes:

### Tables
- **hazard_reports**: Community-reported accessibility issues
- **forum_posts**: Community discussions and tips

### Features
- Row Level Security (RLS) enabled
- Real-time subscriptions
- Automatic timestamp management
- Community voting and engagement systems

See [Database Schema Documentation](./docs/database-schema.md) for complete details.

## 🔌 API Integrations

### Current Integrations
- ✅ **Supabase**: Database and real-time backend
- ✅ **Expo Location**: Device location services

### Planned Integrations
- 📋 **OpenRouteService**: Wheelchair-accessible routing
- 📋 **Wheelmap API**: Crowdsourced accessibility data
- 📋 **Overpass API**: OpenStreetMap accessibility data

## 🚨 Known Issues

### Critical Issues
1. **Expo Router Configuration Error**: App fails to start due to dependency conflicts
2. **Mock Data Dependencies**: Most features use mock data instead of real APIs
3. **Missing Authentication**: No user authentication system implemented

See [Known Issues Documentation](./docs/known-issues.md) for complete list and workarounds.

## 🗺️ Development Roadmap

### Phase 1: Foundation (Immediate - 1 Month)
- Fix critical dependency issues
- Complete API integrations
- Implement authentication system

### Phase 2: Core Features (1-3 Months)
- Enhanced navigation with voice guidance
- Offline functionality
- Advanced community features

### Phase 3: Advanced Features (3-6 Months)
- AI-powered recommendations
- Social networking features
- Business integration tools

See [Future Roadmap Documentation](./docs/future-roadmap.md) for detailed timeline.

## 🤝 Contributing

We welcome contributions from developers, designers, accessibility experts, and community members!

### How to Contribute
1. Read our [Contributing Guide](./docs/contributing.md)
2. Check [Known Issues](./docs/known-issues.md) for areas needing help
3. Review [Development Setup](./docs/development-setup.md) for technical requirements
4. Join our community discussions

### Types of Contributions
- 🐛 Bug reports and fixes
- ✨ Feature development
- 📝 Documentation improvements
- 🎨 Design and UX enhancements
- ♿ Accessibility testing and improvements
- 🌍 Internationalization and localization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Wheelmap.org](https://wheelmap.org) for accessibility data
- [OpenRouteService](https://openrouteservice.org) for routing capabilities
- [OpenStreetMap](https://openstreetmap.org) community for map data
- Accessibility advocates and wheelchair users who inspire this work

## 📞 Support

- 📧 **Email**: support@wheelwise.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/wheelwise/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/wheelwise/discussions)
- 📚 **Documentation**: [Project Documentation](./docs/README.md)

---

**Made with ❤️ for the accessibility community**

*Building a more accessible world, one route at a time.*