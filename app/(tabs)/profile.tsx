import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Settings,
  Bell,
  MapPin,
  Heart,
  Shield,
  HelpCircle,
  Share,
  Moon,
  Volume2,
  Accessibility,
  ChevronRight,
  LogOut
} from '@/components/LucideIcon';

interface Setting {
  id: string;
  title: string;
  description?: string;
  type: 'toggle' | 'navigation' | 'action';
  icon: React.ReactNode;
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  color?: string;
}

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  const userStats = {
    routesPlanned: 47,
    placesVisited: 23,
    reportsSubmitted: 5,
    helpfulVotes: 18
  };

  const accessibilitySettings: Setting[] = [
    {
      id: 'voice-guidance',
      title: 'Voice Guidance',
      description: 'Audio directions and announcements',
      type: 'toggle',
      icon: <Volume2 size={20} color="#4F46E5" />,
      value: voiceGuidance,
      onToggle: setVoiceGuidance
    },
    {
      id: 'high-contrast',
      title: 'High Contrast Mode',
      description: 'Enhanced visibility for better readability',
      type: 'toggle',
      icon: <Accessibility size={20} color="#4F46E5" />,
      value: highContrast,
      onToggle: setHighContrast
    },
    {
      id: 'large-text',
      title: 'Large Text Size',
      description: 'Increase font size throughout the app',
      type: 'navigation',
      icon: <Settings size={20} color="#4F46E5" />,
      onPress: () => Alert.alert('Feature', 'Text size settings coming soon!')
    }
  ];

  const generalSettings: Setting[] = [
    {
      id: 'notifications',
      title: 'Push Notifications',
      description: 'Hazard alerts and community updates',
      type: 'toggle',
      icon: <Bell size={20} color="#4F46E5" />,
      value: notifications,
      onToggle: setNotifications
    },
    {
      id: 'location',
      title: 'Location Services',
      description: 'Required for route planning and nearby places',
      type: 'toggle',
      icon: <MapPin size={20} color="#4F46E5" />,
      value: locationServices,
      onToggle: setLocationServices
    },
    {
      id: 'dark-mode',
      title: 'Dark Mode',
      description: 'Use dark theme throughout the app',
      type: 'toggle',
      icon: <Moon size={20} color="#4F46E5" />,
      value: darkMode,
      onToggle: setDarkMode
    }
  ];

  const accountSettings: Setting[] = [
    {
      id: 'saved-places',
      title: 'Saved Places',
      description: 'Manage your favorite locations',
      type: 'navigation',
      icon: <Heart size={20} color="#4F46E5" />,
      onPress: () => Alert.alert('Feature', 'Saved places management coming soon!')
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      description: 'Control your data and privacy settings',
      type: 'navigation',
      icon: <Shield size={20} color="#4F46E5" />,
      onPress: () => Alert.alert('Feature', 'Privacy settings coming soon!')
    },
    {
      id: 'help',
      title: 'Help & Support',
      description: 'FAQs, contact us, and app tutorials',
      type: 'navigation',
      icon: <HelpCircle size={20} color="#4F46E5" />,
      onPress: () => Alert.alert('Help', 'Support center coming soon!')
    },
    {
      id: 'share',
      title: 'Share WheelWise',
      description: 'Invite friends to join the community',
      type: 'action',
      icon: <Share size={20} color="#4F46E5" />,
      onPress: () => Alert.alert('Share', 'Sharing functionality coming soon!')
    }
  ];

  const dangerousActions: Setting[] = [
    {
      id: 'logout',
      title: 'Sign Out',
      description: 'Log out of your account',
      type: 'action',
      icon: <LogOut size={20} color="#EF4444" />,
      color: '#EF4444',
      onPress: () => Alert.alert(
        'Sign Out',
        'Are you sure you want to sign out?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Sign Out', style: 'destructive', onPress: () => {} }
        ]
      )
    }
  ];

  const renderSetting = (setting: Setting) => (
    <TouchableOpacity
      key={setting.id}
      style={styles.settingItem}
      onPress={setting.onPress}
      disabled={setting.type === 'toggle'}
    >
      <View style={styles.settingIcon}>
        {setting.icon}
      </View>
      
      <View style={styles.settingContent}>
        <Text style={[
          styles.settingTitle,
          setting.color && { color: setting.color }
        ]}>
          {setting.title}
        </Text>
        {setting.description && (
          <Text style={styles.settingDescription}>{setting.description}</Text>
        )}
      </View>

      <View style={styles.settingAction}>
        {setting.type === 'toggle' ? (
          <Switch
            value={setting.value}
            onValueChange={setting.onToggle}
            trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
            thumbColor={setting.value ? '#FFFFFF' : '#F3F4F6'}
          />
        ) : (
          <ChevronRight size={20} color="#9CA3AF" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Manage your account and preferences</Text>
        </View>

        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <User size={40} color="#4F46E5" />
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>Welcome User!</Text>
              <Text style={styles.userEmail}>Sign in to access all features</Text>
              <TouchableOpacity style={styles.signInButton}>
                <Text style={styles.signInText}>Sign In / Register</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* User Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.routesPlanned}</Text>
              <Text style={styles.statLabel}>Routes Planned</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.placesVisited}</Text>
              <Text style={styles.statLabel}>Places Visited</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.reportsSubmitted}</Text>
              <Text style={styles.statLabel}>Reports Submitted</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.helpfulVotes}</Text>
              <Text style={styles.statLabel}>Helpful Votes</Text>
            </View>
          </View>
        </View>

        {/* Accessibility Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accessibility</Text>
          <View style={styles.settingsGroup}>
            {accessibilitySettings.map(renderSetting)}
          </View>
        </View>

        {/* General Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.settingsGroup}>
            {generalSettings.map(renderSetting)}
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingsGroup}>
            {accountSettings.map(renderSetting)}
          </View>
        </View>

        {/* Dangerous Actions */}
        <View style={styles.section}>
          <View style={styles.settingsGroup}>
            {dangerousActions.map(renderSetting)}
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>WheelWise v1.0.0</Text>
          <Text style={styles.appInfoText}>Built with accessibility in mind</Text>
          <TouchableOpacity>
            <Text style={styles.appInfoLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.appInfoLink}>Terms of Service</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  signInButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  settingsGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  settingAction: {
    marginLeft: 12,
  },
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  appInfoText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  appInfoLink: {
    fontSize: 12,
    color: '#4F46E5',
    marginBottom: 4,
  },
});