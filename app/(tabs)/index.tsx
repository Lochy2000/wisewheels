import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  MapPin, 
  Wheelchair, 
  AlertTriangle, 
  Navigation, 
  Search,
  Star,
  Clock,
  ChevronRight
} from '@/components/LucideIcon';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

interface AccessiblePlace {
  id: string;
  name: string;
  category: string;
  distance: string;
  accessibilityRating: 'high' | 'medium' | 'limited';
  features: string[];
  address: string;
}

interface HazardReport {
  id: string;
  location: string;
  issue: string;
  status: 'active' | 'in-progress' | 'resolved';
  reportedAt: string;
  description: string;
}

export default function MapScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState<string>('Getting location...');
  const [nearbyPlaces, setNearbyPlaces] = useState<AccessiblePlace[]>([]);
  const [recentHazards, setRecentHazards] = useState<HazardReport[]>([]);

  useEffect(() => {
    getCurrentLocation();
    loadNearbyPlaces();
    loadRecentHazards();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Allow location access to use WheelWise features.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address[0]) {
        setCurrentLocation(`${address[0].street}, ${address[0].city}`);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      setCurrentLocation('Location unavailable');
    }
  };

  const loadNearbyPlaces = () => {
    // Mock data - in real app, this would fetch from Wheelmap/Overpass API
    const mockPlaces: AccessiblePlace[] = [
      {
        id: '1',
        name: 'Central Shopping Mall',
        category: 'Shopping',
        distance: '0.3mi',
        accessibilityRating: 'high',
        features: ['Wheelchair parking', 'Accessible toilets', 'Elevators'],
        address: '123 Main Street',
      },
      {
        id: '2',
        name: 'Riverside Café',
        category: 'Restaurant',
        distance: '0.5mi',
        accessibilityRating: 'medium',
        features: ['Level entry', 'Wide doorways'],
        address: '45 River Road',
      },
      {
        id: '3',
        name: 'City Medical Center',
        category: 'Healthcare',
        distance: '0.8mi',
        accessibilityRating: 'high',
        features: ['Full accessibility', 'Drop-off zone', 'Accessible parking'],
        address: '78 Health Street',
      },
    ];
    setNearbyPlaces(mockPlaces);
  };

  const loadRecentHazards = () => {
    // Mock data - in real app, this would fetch from Supabase
    const mockHazards: HazardReport[] = [
      {
        id: '1',
        location: 'Main St Subway Station',
        issue: 'Elevator out of service',
        status: 'active',
        reportedAt: '2 hours ago',
        description: 'Main elevator not working, use alternative entrance',
      },
      {
        id: '2',
        location: 'Park Avenue',
        issue: 'Construction blocking sidewalk',
        status: 'in-progress',
        reportedAt: '1 day ago',
        description: 'Temporary ramp available on south side',
      },
    ];
    setRecentHazards(mockHazards);
  };

  const getAccessibilityColor = (rating: string) => {
    switch (rating) {
      case 'high': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'limited': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#EF4444';
      case 'in-progress': return '#F59E0B';
      case 'resolved': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
              <Wheelchair size={28} color="#4F46E5" />
              <Text style={styles.title}>WheelWise</Text>
            </View>
            <TouchableOpacity style={styles.locationButton}>
              <MapPin size={20} color="#4F46E5" />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Your accessible travel companion</Text>
        </View>

        {/* Hero Section */}
        <LinearGradient
          colors={['#4F46E5', '#10B981']}
          style={styles.heroSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Navigate with Confidence</Text>
            <Text style={styles.heroSubtitle}>
              Find accessible routes and places near you
            </Text>
            
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Where would you like to go?"
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity style={styles.searchButton}>
                <Search size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.currentLocationContainer}>
              <MapPin size={16} color="#FFFFFF" />
              <Text style={styles.currentLocationText}>{currentLocation}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#4F46E5' }]}>
                <Navigation size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.quickActionText}>Plan Route</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#10B981' }]}>
                <Search size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.quickActionText}>Find Toilets</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#F59E0B' }]}>
                <AlertTriangle size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.quickActionText}>Report Issue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#8B5CF6' }]}>
                <Star size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.quickActionText}>Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nearby Accessible Places */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Accessible Places</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {nearbyPlaces.map((place) => (
            <TouchableOpacity key={place.id} style={styles.placeCard}>
              <View style={styles.placeCardContent}>
                <View style={styles.placeInfo}>
                  <Text style={styles.placeName}>{place.name}</Text>
                  <Text style={styles.placeAddress}>{place.address}</Text>
                  <View style={styles.placeFeatures}>
                    {place.features.slice(0, 2).map((feature, index) => (
                      <View key={index} style={styles.featureTag}>
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                <View style={styles.placeMetrics}>
                  <View style={styles.distanceContainer}>
                    <Text style={styles.distanceText}>{place.distance}</Text>
                  </View>
                  <View style={[
                    styles.accessibilityBadge,
                    { backgroundColor: getAccessibilityColor(place.accessibilityRating) }
                  ]}>
                    <Wheelchair size={16} color="#FFFFFF" />
                  </View>
                  <ChevronRight size={20} color="#9CA3AF" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Hazard Reports */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Hazard Reports</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          {recentHazards.map((hazard) => (
            <View key={hazard.id} style={styles.hazardCard}>
              <View style={styles.hazardHeader}>
                <View style={styles.hazardInfo}>
                  <Text style={styles.hazardLocation}>{hazard.location}</Text>
                  <Text style={styles.hazardIssue}>{hazard.issue}</Text>
                </View>
                <View style={styles.hazardMeta}>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(hazard.status) }
                  ]}>
                    <Text style={styles.statusText}>
                      {hazard.status.replace('-', ' ')}
                    </Text>
                  </View>
                  <Text style={styles.timeText}>{hazard.reportedAt}</Text>
                </View>
              </View>
              <Text style={styles.hazardDescription}>{hazard.description}</Text>
            </View>
          ))}
        </View>

        {/* Bottom spacing for tab bar */}
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  locationButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  heroSection: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  heroContent: {
    padding: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#E5E7EB',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 12,
  },
  searchButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLocationText: {
    color: '#E5E7EB',
    fontSize: 14,
    marginLeft: 6,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '500',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: (width - 60) / 2,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  placeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeCardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  placeAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  placeFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureTag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '500',
  },
  placeMetrics: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  distanceContainer: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  accessibilityBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  hazardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hazardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  hazardInfo: {
    flex: 1,
  },
  hazardLocation: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  hazardIssue: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  hazardMeta: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  timeText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  hazardDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});