import React from 'react';
import { Platform } from 'react-native';
import * as LucideReact from 'lucide-react';
import * as LucideReactNative from 'lucide-react-native';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// Platform-specific icon creation with static imports
const createIcon = (iconName: string) => {
  const IconComponent = React.forwardRef<any, IconProps>((props, ref) => {
    const { size = 24, color = 'currentColor', strokeWidth = 2, ...rest } = props;

    if (Platform.OS === 'web') {
      // Use lucide-react for web with static import
      const WebIcon = (LucideReact as any)[iconName];
      
      if (!WebIcon) {
        console.warn(`Icon ${iconName} not found in lucide-react`);
        // Return fallback icon instead of null
        const FallbackIcon = LucideReact.AlertCircle;
        return React.createElement(FallbackIcon, {
          ref,
          width: size,
          height: size,
          color: '#EF4444', // Red color to indicate missing icon
          strokeWidth,
          ...rest
        });
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
      // Use lucide-react-native for mobile with static import
      const NativeIcon = (LucideReactNative as any)[iconName];
      
      if (!NativeIcon) {
        console.warn(`Icon ${iconName} not found in lucide-react-native`);
        // Return fallback icon instead of null
        const FallbackIcon = LucideReactNative.AlertCircle;
        return React.createElement(FallbackIcon, {
          ref,
          size,
          color: '#EF4444', // Red color to indicate missing icon
          strokeWidth,
          ...rest
        });
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
export const Restroom = createIcon('Building'); // Use Building for Restroom
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