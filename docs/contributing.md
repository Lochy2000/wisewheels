# Contributing to WheelWise

## Welcome Contributors!

Thank you for your interest in contributing to WheelWise! This project aims to make the world more accessible for wheelchair users and people with mobility challenges. Every contribution, no matter how small, helps us achieve this goal.

## Code of Conduct

### Our Pledge

We are committed to making participation in this project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

## How to Contribute

### Types of Contributions

We welcome many types of contributions:

#### 🐛 Bug Reports
- Report bugs using GitHub Issues
- Include detailed reproduction steps
- Provide screenshots or videos when helpful
- Test on multiple platforms when possible

#### 💡 Feature Requests
- Suggest new features that improve accessibility
- Explain the use case and benefit to users
- Consider implementation complexity
- Discuss with maintainers before starting large features

#### 📝 Documentation
- Improve existing documentation
- Add missing documentation
- Fix typos and grammar
- Translate documentation to other languages

#### 🎨 Design Contributions
- UI/UX improvements
- Accessibility design enhancements
- Icon and graphic design
- User experience research

#### 🧪 Testing
- Manual testing on different devices
- Accessibility testing with screen readers
- Performance testing
- User acceptance testing

#### 💻 Code Contributions
- Bug fixes
- Feature implementations
- Performance improvements
- Accessibility enhancements

### Getting Started

#### 1. Set Up Development Environment

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/your-username/wheelwise.git
cd wheelwise

# Add upstream remote
git remote add upstream https://github.com/original-owner/wheelwise.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start development server
npm run dev
```

#### 2. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description
```

#### 3. Make Your Changes

Follow our coding standards and guidelines (see below).

#### 4. Test Your Changes

```bash
# Run tests (when available)
npm test

# Test on multiple platforms
npm run dev
# Test on web, iOS simulator, and Android emulator
```

#### 5. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "feat: add voice navigation for route planning

- Implement voice commands for hands-free navigation
- Add accessibility announcements for route changes
- Include haptic feedback for important waypoints
- Test with VoiceOver and TalkBack

Fixes #123"
```

#### 6. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create pull request on GitHub
# Fill out the pull request template
```

## Development Guidelines

### Code Style

#### TypeScript Standards
```typescript
// Use explicit types
interface UserPreferences {
  voiceGuidance: boolean;
  highContrast: boolean;
  textSize: 'small' | 'medium' | 'large';
}

// Avoid any type
const processData = (data: unknown): ProcessedData => {
  // Implementation
};

// Use proper imports
import type { HazardReport } from '@/lib/database';
import { hazardReportsApi } from '@/lib/database';
```

#### React Native Patterns
```typescript
// Component structure
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  title: string;
  onPress?: () => void;
}

export default function ComponentName({ title, onPress }: Props) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Side effects
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
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

#### Styling Guidelines
```typescript
// Use consistent color palette
const colors = {
  primary: '#4F46E5',
  secondary: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    // ... etc
  }
};

// Use StyleSheet.create
const styles = StyleSheet.create({
  // Styles here
});

// Avoid inline styles except for dynamic values
<View style={[styles.container, { opacity: isVisible ? 1 : 0.5 }]} />
```

### Accessibility Guidelines

#### Screen Reader Support
```typescript
// Always include accessibility labels
<TouchableOpacity
  accessibilityLabel="Report accessibility issue"
  accessibilityHint="Opens form to report a new accessibility hazard"
  accessibilityRole="button"
  onPress={openReportForm}
>
  <Text>Report Issue</Text>
</TouchableOpacity>

// Use semantic elements
<Text accessibilityRole="header" style={styles.title}>
  Page Title
</Text>
```

#### Keyboard Navigation
```typescript
// Ensure focusable elements are accessible
<TextInput
  accessibilityLabel="Location input"
  placeholder="Enter location"
  returnKeyType="next"
  onSubmitEditing={() => nextInput.current?.focus()}
/>
```

#### Color and Contrast
```typescript
// Ensure sufficient color contrast
const styles = StyleSheet.create({
  text: {
    color: '#1F2937', // High contrast on light background
  },
  errorText: {
    color: '#DC2626', // Sufficient contrast for error state
  },
});
```

### File Organization

```
app/
├── _layout.tsx              # Root layout (DO NOT MODIFY)
├── (tabs)/                  # Tab navigation
│   ├── _layout.tsx         # Tab configuration
│   └── [screen].tsx        # Individual screens
└── +not-found.tsx          # 404 page

components/
├── ui/                     # Reusable UI components
├── forms/                  # Form components
├── navigation/             # Navigation components
└── accessibility/          # Accessibility-specific components

lib/
├── apis.ts                 # External API integrations
├── database.ts             # Database operations
├── utils.ts                # Utility functions
└── types.ts                # TypeScript type definitions

hooks/
├── useFrameworkReady.ts    # Framework initialization (DO NOT MODIFY)
├── useLocation.ts          # Location-related hooks
└── useAccessibility.ts     # Accessibility hooks
```

### Testing Guidelines

#### Manual Testing Checklist
- [ ] Test on web browser
- [ ] Test on iOS simulator/device
- [ ] Test on Android emulator/device
- [ ] Test with screen reader enabled
- [ ] Test with high contrast mode
- [ ] Test with large text size
- [ ] Test keyboard navigation
- [ ] Test with poor network conditions

#### Accessibility Testing
```typescript
// Test with screen reader
// iOS: VoiceOver
// Android: TalkBack
// Web: NVDA, JAWS, or VoiceOver

// Test keyboard navigation
// Ensure all interactive elements are reachable
// Test tab order is logical
// Test escape key functionality

// Test color contrast
// Use tools like WebAIM Contrast Checker
// Ensure 4.5:1 ratio for normal text
// Ensure 3:1 ratio for large text
```

### Git Workflow

#### Commit Message Format
```
type(scope): brief description

Detailed description of changes made.
Include motivation and context.

- List specific changes
- Include any breaking changes
- Reference issues fixed

Fixes #123
Closes #456
```

#### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

#### Branch Naming
- `feature/description`: New features
- `fix/issue-description`: Bug fixes
- `docs/update-readme`: Documentation updates
- `refactor/component-cleanup`: Code refactoring

### Pull Request Guidelines

#### Pull Request Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Tested on web
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] Tested with screen reader
- [ ] Tested accessibility features

## Screenshots
Include screenshots or videos of changes.

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested accessibility features
```

#### Review Process
1. **Automated Checks**: Ensure all CI checks pass
2. **Code Review**: At least one maintainer review required
3. **Accessibility Review**: Accessibility features must be reviewed
4. **Testing**: Manual testing on multiple platforms
5. **Documentation**: Update documentation if needed

## Community Guidelines

### Communication Channels

#### GitHub Issues
- **Bug Reports**: Use bug report template
- **Feature Requests**: Use feature request template
- **Questions**: Use discussion template
- **Security Issues**: Email maintainers directly

#### Discussions
- **General Questions**: Use GitHub Discussions
- **Feature Ideas**: Discuss before implementing
- **Help Wanted**: Ask for help with contributions

### Recognition

#### Contributors
- All contributors are recognized in README
- Significant contributors may be invited as maintainers
- Annual contributor appreciation events

#### Types of Recognition
- **Code Contributors**: Listed in contributors section
- **Bug Reporters**: Credited in release notes
- **Documentation Contributors**: Recognized in docs
- **Community Helpers**: Special recognition for helping others

## Accessibility-Specific Contributions

### Accessibility Testing

#### Screen Reader Testing
```bash
# Enable screen reader
# iOS: Settings > Accessibility > VoiceOver
# Android: Settings > Accessibility > TalkBack
# Web: Use NVDA, JAWS, or browser screen reader

# Test navigation flow
# Ensure logical reading order
# Verify all interactive elements are announced
# Check for proper headings and landmarks
```

#### Keyboard Navigation Testing
```bash
# Test tab navigation
# Ensure all interactive elements are reachable
# Verify tab order is logical
# Test escape key to close modals
# Test enter/space to activate buttons
```

#### Color and Contrast Testing
```bash
# Use accessibility tools
# WebAIM Contrast Checker
# Colour Contrast Analyser
# Browser developer tools accessibility panel

# Test with different vision conditions
# Protanopia (red-blind)
# Deuteranopia (green-blind)
# Tritanopia (blue-blind)
# Monochromacy (color-blind)
```

### Accessibility Guidelines

#### WCAG 2.1 AA Compliance
- **Perceivable**: Information must be presentable in ways users can perceive
- **Operable**: Interface components must be operable
- **Understandable**: Information and UI operation must be understandable
- **Robust**: Content must be robust enough for various assistive technologies

#### Mobile Accessibility
- **Touch Targets**: Minimum 44x44 points on iOS, 48x48 dp on Android
- **Gestures**: Provide alternatives to complex gestures
- **Motion**: Respect reduced motion preferences
- **Audio**: Provide visual alternatives to audio cues

## Getting Help

### Documentation
- Read existing documentation thoroughly
- Check FAQ for common questions
- Review code examples and patterns

### Community Support
- **GitHub Discussions**: Ask questions and get help
- **Discord/Slack**: Real-time community chat (if available)
- **Email**: Contact maintainers for sensitive issues

### Mentorship
- **New Contributors**: Pair with experienced contributors
- **Accessibility Experts**: Get guidance on accessibility features
- **Code Reviews**: Learn from feedback on pull requests

## Recognition and Rewards

### Contributor Levels

#### First-Time Contributors
- Welcome package with project stickers
- Personalized thank you message
- Listed in contributors section

#### Regular Contributors
- Special recognition in release notes
- Invitation to contributor-only events
- Priority support for questions

#### Core Contributors
- Invitation to become project maintainer
- Recognition at conferences and events
- Opportunity to represent project publicly

### Annual Recognition
- **Contributor of the Year**: Outstanding overall contribution
- **Accessibility Champion**: Best accessibility contributions
- **Community Helper**: Most helpful to other contributors
- **Innovation Award**: Most creative or impactful feature

Thank you for contributing to WheelWise! Together, we can make the world more accessible for everyone.