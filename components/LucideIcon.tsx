import React from 'react';
import { Platform } from 'react-native';

// Explicit imports for web (lucide-react)
import {
  MapPin as MapPinWeb,
  Route as RouteWeb,
  Search as SearchWeb,
  MessageSquare as MessageSquareWeb,
  Settings as SettingsWeb,
  Accessibility as AccessibilityWeb,
  AlertTriangle as AlertTriangleWeb,
  Plus as PlusWeb,
  Heart as HeartWeb,
  MessageCircle as MessageCircleWeb,
  Share as ShareWeb,
  Clock as ClockWeb,
  CheckCircle as CheckCircleWeb,
  X as XWeb,
  Send as SendWeb,
  Navigation as NavigationWeb,
  Star as StarWeb,
  ChevronRight as ChevronRightWeb,
  Zap as ZapWeb,
  Filter as FilterWeb,
  Utensils as UtensilsWeb,
  ShoppingBag as ShoppingBagWeb,
  Coffee as CoffeeWeb,
  Building as BuildingWeb,
  Car as CarWeb,
  User as UserWeb,
  Bell as BellWeb,
  Shield as ShieldWeb,
  HelpCircle as HelpCircleWeb,
  Moon as MoonWeb,
  Volume2 as Volume2Web,
  LogOut as LogOutWeb,
  RotateCcw as RotateCcwWeb,
  AlertCircle as AlertCircleWeb,
  ArrowRight as ArrowRightWeb,
} from 'lucide-react';

// Explicit imports for native (lucide-react-native)
import {
  MapPin as MapPinNative,
  Route as RouteNative,
  Search as SearchNative,
  MessageSquare as MessageSquareNative,
  Settings as SettingsNative,
  Accessibility as AccessibilityNative,
  AlertTriangle as AlertTriangleNative,
  Plus as PlusNative,
  Heart as HeartNative,
  MessageCircle as MessageCircleNative,
  Share as ShareNative,
  Clock as ClockNative,
  CheckCircle as CheckCircleNative,
  X as XNative,
  Send as SendNative,
  Navigation as NavigationNative,
  Star as StarNative,
  ChevronRight as ChevronRightNative,
  Zap as ZapNative,
  Filter as FilterNative,
  Utensils as UtensilsNative,
  ShoppingBag as ShoppingBagNative,
  Coffee as CoffeeNative,
  Building as BuildingNative,
  Car as CarNative,
  User as UserNative,
  Bell as BellNative,
  Shield as ShieldNative,
  HelpCircle as HelpCircleNative,
  Moon as MoonNative,
  Volume2 as Volume2Native,
  LogOut as LogOutNative,
  RotateCcw as RotateCcwNative,
  AlertCircle as AlertCircleNative,
  ArrowRight as ArrowRightNative,
} from 'lucide-react-native';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  [key: string]: any;
}

// Platform-specific icon creation with explicit imports
const createPlatformIcon = (WebIcon: any, NativeIcon: any) => {
  const IconComponent = React.forwardRef<any, IconProps>((props, ref) => {
    const { size = 24, color = 'currentColor', strokeWidth = 2, ...rest } = props;

    if (Platform.OS === 'web') {
      return React.createElement(WebIcon, {
        ref,
        width: size,
        height: size,
        color,
        strokeWidth,
        ...rest
      });
    } else {
      return React.createElement(NativeIcon, {
        ref,
        size,
        color,
        strokeWidth,
        ...rest
      });
    }
  });

  return IconComponent;
};

// Export all icons with explicit platform mappings
export const MapPin = createPlatformIcon(MapPinWeb, MapPinNative);
export const Route = createPlatformIcon(RouteWeb, RouteNative);
export const Search = createPlatformIcon(SearchWeb, SearchNative);
export const MessageSquare = createPlatformIcon(MessageSquareWeb, MessageSquareNative);
export const Settings = createPlatformIcon(SettingsWeb, SettingsNative);
export const Accessibility = createPlatformIcon(AccessibilityWeb, AccessibilityNative);
export const AlertTriangle = createPlatformIcon(AlertTriangleWeb, AlertTriangleNative);
export const Plus = createPlatformIcon(PlusWeb, PlusNative);
export const Heart = createPlatformIcon(HeartWeb, HeartNative);
export const MessageCircle = createPlatformIcon(MessageCircleWeb, MessageCircleNative);
export const Share = createPlatformIcon(ShareWeb, ShareNative);
export const Clock = createPlatformIcon(ClockWeb, ClockNative);
export const CheckCircle = createPlatformIcon(CheckCircleWeb, CheckCircleNative);
export const X = createPlatformIcon(XWeb, XNative);
export const Send = createPlatformIcon(SendWeb, SendNative);
export const Navigation = createPlatformIcon(NavigationWeb, NavigationNative);
export const Star = createPlatformIcon(StarWeb, StarNative);
export const ChevronRight = createPlatformIcon(ChevronRightWeb, ChevronRightNative);
export const Zap = createPlatformIcon(ZapWeb, ZapNative);
export const Filter = createPlatformIcon(FilterWeb, FilterNative);
export const Utensils = createPlatformIcon(UtensilsWeb, UtensilsNative);
export const ShoppingBag = createPlatformIcon(ShoppingBagWeb, ShoppingBagNative);
export const Coffee = createPlatformIcon(CoffeeWeb, CoffeeNative);
export const Building = createPlatformIcon(BuildingWeb, BuildingNative);
export const Car = createPlatformIcon(CarWeb, CarNative);
export const User = createPlatformIcon(UserWeb, UserNative);
export const Bell = createPlatformIcon(BellWeb, BellNative);
export const Shield = createPlatformIcon(ShieldWeb, ShieldNative);
export const HelpCircle = createPlatformIcon(HelpCircleWeb, HelpCircleNative);
export const Moon = createPlatformIcon(MoonWeb, MoonNative);
export const Volume2 = createPlatformIcon(Volume2Web, Volume2Native);
export const LogOut = createPlatformIcon(LogOutWeb, LogOutNative);
export const RotateCcw = createPlatformIcon(RotateCcwWeb, RotateCcwNative);
export const AlertCircle = createPlatformIcon(AlertCircleWeb, AlertCircleNative);
export const ArrowRight = createPlatformIcon(ArrowRightWeb, ArrowRightNative);

// Aliases for commonly used icons
export const Wheelchair = Accessibility; // Use Accessibility as Wheelchair
export const Restroom = Building; // Use Building for Restroom

// Default export for the createPlatformIcon function
export default createPlatformIcon;