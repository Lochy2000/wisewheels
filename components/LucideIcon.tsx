import React from 'react';
import { Platform } from 'react-native';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// Platform-specific icon imports
const createIcon = (iconName: string) => {
  const IconComponent = React.forwardRef<any, IconProps>((props, ref) => {
    const { size = 24, color = 'currentColor', strokeWidth = 2, ...rest } = props;

    if (Platform.OS === 'web') {
      // Use lucide-react for web
      const LucideReact = require('lucide-react');
      const WebIcon = LucideReact[iconName];
      
      if (!WebIcon) {
        console.warn(`Icon ${iconName} not found in lucide-react`);
        return null;
      }

      return React.createElement(WebIcon, {
        ref,
        width: size,
        height: size,
        color,
        strokeWidth,
        ...rest
      });
    } else {
      // Use lucide-react-native for mobile
      const LucideReactNative = require('lucide-react-native');
      const NativeIcon = LucideReactNative[iconName];
      
      if (!NativeIcon) {
        console.warn(`Icon ${iconName} not found in lucide-react-native`);
        return null;
      }

      return React.createElement(NativeIcon, {
        ref,
        size,
        color,
        strokeWidth,
        ...rest
      });
    }
  });

  IconComponent.displayName = `LucideIcon(${iconName})`;
  return IconComponent;
};

// Export commonly used icons
export const MapPin = createIcon('MapPin');
export const Route = createIcon('Route');
export const Search = createIcon('Search');
export const MessageSquare = createIcon('MessageSquare');
export const Settings = createIcon('Settings');
export const Accessibility = createIcon('Accessibility');
export const AlertTriangle = createIcon('AlertTriangle');
export const Plus = createIcon('Plus');
export const Heart = createIcon('Heart');
export const MessageCircle = createIcon('MessageCircle');
export const Share = createIcon('Share');
export const Clock = createIcon('Clock');
export const CheckCircle = createIcon('CheckCircle');
export const X = createIcon('X');
export const Send = createIcon('Send');
export const Navigation = createIcon('Navigation');
export const Star = createIcon('Star');
export const ChevronRight = createIcon('ChevronRight');
export const Wheelchair = createIcon('Accessibility'); // Use Accessibility as Wheelchair
export const Zap = createIcon('Zap');
export const Filter = createIcon('Filter');
export const Utensils = createIcon('Utensils');
export const ShoppingBag = createIcon('ShoppingBag');
export const Coffee = createIcon('Coffee');
export const Building = createIcon('Building');
export const Car = createIcon('Car');
export const ListRestart = createIcon('ListRestart');
export const Restroom = createIcon('ListRestart'); // Use ListRestart for Restroom
export const User = createIcon('User');
export const Bell = createIcon('Bell');
export const Shield = createIcon('Shield');
export const HelpCircle = createIcon('HelpCircle');
export const Moon = createIcon('Moon');
export const Volume2 = createIcon('Volume2');
export const LogOut = createIcon('LogOut');
export const RotateCcw = createIcon('RotateCcw');
export const AlertCircle = createIcon('AlertCircle');
export const ArrowRight = createIcon('ArrowRight');

// Default export for custom icon creation
export default createIcon;