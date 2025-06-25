import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, 
  Filter,
  MapPin,
  Star,
  Wheelchair,
  Restroom,
  Car,
  Utensils,
  ShoppingBag,
  Coffee,
  Building,
  Heart,
  Navigation
} from 'lucide-react-native';

interface AccessiblePlace {
  id: string;
  name: string;
  category: 'restaurant' | 'shopping' | 'transport' | 'healthcare' | 'accommodation' | 'recreation';
  rating: number;
  distance: string;
  address: string;
  accessibilityScore: number;
  features: string[];
  description: string;
  price?: '$' | '$$' | '$$$';
  openNow: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  count: number;
}

export default function PlacesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [places, setPlaces] = useState<AccessiblePlace[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<AccessiblePlace[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'accessibility'>('distance');

  const categories: Category[] = [
    {
      id: 'all',
      name: 'All',
      icon: <Search size={20} color="#6B7280" />,
      color: '#6B7280',
      count: 42
    },
    {
      id: 'restaurant',
      name: 'Food',
      icon: <Utensils size={20} color="#EF4444" />,
      color: '#EF4444',
      count: 12
    },
    {
      id: 'shopping',
      name: 'Shopping',
      icon: <ShoppingBag size={20} color="#8B5CF6" />,
      color: '#8B5CF6',
      count: 8
    },
    {
      id: 'transport',
      name: 'Transport',
      icon: <Car size={20} color="#3B82F6" />,
      color: '#3B82F6',
      count: 6
    },
    {
      id: 'healthcare',
      name: 'Health',
      icon: <Heart size={20} color="#EF4444" />,
      color: '#EF4444',
      count: 5
    },
    {
      id: 'recreation',
      name: 'Fun',
      icon: <Star size={20} color="#F59E0B" />,
      color: '#F59E0B',
      count: 11
    }
  ];

  useEffect(() => {
    loadPlaces();
  }, []);

  useEffect(() => {
    filterPlaces();
  }, [searchQuery, selectedCategory, places, sortBy]);

  const loadPlaces = () => {
    // Mock data - in real app, this would fetch from Wheelmap/Overpass API
    const mockPlaces: AccessiblePlace[] = [
      {
        id: '1',
        name: 'The Accessible Café',
        category: 'restaurant',
        rating: 4.8,
        distance: '0.2 mi',
        address: '123 Inclusive Street',
        accessibilityScore: 95,
        features: ['Level entry', 'Accessible toilets', 'Wide aisles', 'Lowered counter'],
        description: 'A cozy café with full wheelchair access and inclusive design.',
        price: '$$',
        openNow: true
      },
      {
        id: '2',
        name: 'Central Shopping Mall',
        category: 'shopping',
        rating: 4.6,
        distance: '0.4 mi',
        address: '456 Commerce Ave',
        accessibilityScore: 90,
        features: ['Wheelchair parking', 'Elevators', 'Accessible toilets', 'Smooth floors'],
        description: 'Large shopping center with excellent accessibility features.',
        openNow: true
      },
      {
        id: '3',
        name: 'Metro Station - Central',
        category: 'transport',
        rating: 4.2,
        distance: '0.1 mi',
        address: 'Central Plaza',
        accessibilityScore: 85,
        features: ['Elevator access', 'Audio announcements', 'Tactile surfaces'],
        description: 'Fully accessible metro station with step-free access.',
        openNow: true
      },
      {
        id: '4',
        name: 'Riverside Medical Center',
        category: 'healthcare',
        rating: 4.9,
        distance: '0.8 mi',
        address: '789 Health Boulevard',
        accessibilityScore: 98,
        features: ['Accessible parking', 'Ramp access', 'Wide corridors', 'Accessible equipment'],
        description: 'Medical facility designed with universal accessibility principles.',
        openNow: true
      },
      {
        id: '5',
        name: 'Inclusive Fitness Center',
        category: 'recreation',
        rating: 4.7,
        distance: '0.6 mi',
        address: '321 Wellness Street',
        accessibilityScore: 92,
        features: ['Accessible equipment', 'Pool lift', 'Changing rooms', 'Personal training'],
        description: 'Fitness center with adaptive equipment and inclusive programs.',
        openNow: false
      },
      {
        id: '6',
        name: 'Book & Beyond',
        category: 'shopping',
        rating: 4.4,
        distance: '0.3 mi',
        address: '654 Literature Lane',
        accessibilityScore: 80,
        features: ['Level entrance', 'Wide aisles', 'Accessible seating'],
        description: 'Independent bookstore with reading areas and accessible design.',
        openNow: true
      }
    ];
    setPlaces(mockPlaces);
  };

  const filterPlaces = () => {
    let filtered = places;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(place => place.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(place =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.features.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Sort places
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'accessibility':
          return b.accessibilityScore - a.accessibilityScore;
        case 'distance':
        default:
          return parseFloat(a.distance) - parseFloat(b.distance);
      }
    });

    setFilteredPlaces(filtered);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'restaurant': return <Utensils size={16} color="#EF4444" />;
      case 'shopping': return <ShoppingBag size={16} color="#8B5CF6" />;
      case 'transport': return <Car size={16} color="#3B82F6" />;
      case 'healthcare': return <Heart size={16} color="#EF4444" />;
      case 'recreation': return <Star size={16} color="#F59E0B" />;
      default: return <MapPin size={16} color="#6B7280" />;
    }
  };

  const getAccessibilityColor = (score: number) => {
    if (score >= 90) return '#10B981';
    if (score >= 75) return '#F59E0B';
    return '#EF4444';
  };

  const renderPlace = ({ item }: { item: AccessiblePlace }) => (
    <TouchableOpacity style={styles.placeCard}>
      <View style={styles.placeHeader}>
        <View style={styles.placeInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.placeName}>{item.name}</Text>
            <View style={styles.categoryBadge}>
              {getCategoryIcon(item.category)}
            </View>
          </View>
          <Text style={styles.placeAddress}>{item.address}</Text>
          <View style={styles.ratingRow}>
            <Star size={14} color="#F59E0B" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.distanceText}>{item.distance}</Text>
            {item.price && (
              <>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.priceText}>{item.price}</Text>
              </>
            )}
          </View>
        </View>
        
        <View style={styles.accessibilityContainer}>
          <View style={[
            styles.accessibilityScore,
            { backgroundColor: getAccessibilityColor(item.accessibilityScore) }
          ]}>
            <Wheelchair size={16} color="#FFFFFF" />
            <Text style={styles.accessibilityText}>{item.accessibilityScore}%</Text>
          </View>
          <View style={[styles.statusDot, { backgroundColor: item.openNow ? '#10B981' : '#EF4444' }]} />
        </View>
      </View>

      <Text style={styles.placeDescription}>{item.description}</Text>

      <View style={styles.featuresContainer}>
        {item.features.slice(0, 3).map((feature, index) => (
          <View key={index} style={styles.featureTag}>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
        {item.features.length > 3 && (
          <Text style={styles.moreFeatures}>+{item.features.length - 3} more</Text>
        )}
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Navigation size={16} color="#4F46E5" />
          <Text style={styles.actionText}>Directions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Heart size={16} color="#6B7280" />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Accessible Places</Text>
        <Text style={styles.subtitle}>Discover wheelchair-friendly locations nearby</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search places, features, or services..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color="#4F46E5" />
          </TouchableOpacity>
        </View>

        {/* Filter Options */}
        {showFilters && (
          <View style={styles.filtersContainer}>
            <Text style={styles.filterTitle}>Sort by:</Text>
            <View style={styles.sortOptions}>
              {[
                { key: 'distance', label: 'Distance' },
                { key: 'rating', label: 'Rating' },
                { key: 'accessibility', label: 'Accessibility' }
              ].map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.sortOption,
                    sortBy === option.key && styles.sortOptionSelected
                  ]}
                  onPress={() => setSortBy(option.key as any)}
                >
                  <Text style={[
                    styles.sortOptionText,
                    sortBy === option.key && styles.sortOptionTextSelected
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                selectedCategory === category.id && styles.categoryCardSelected
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <View style={[
                styles.categoryIcon,
                selectedCategory === category.id && { backgroundColor: category.color }
              ]}>
                {category.icon}
              </View>
              <Text style={[
                styles.categoryName,
                selectedCategory === category.id && styles.categoryNameSelected
              ]}>
                {category.name}
              </Text>
              <Text style={styles.categoryCount}>({category.count})</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results */}
      <View style={styles.resultsSection}>
        <Text style={styles.resultsText}>
          {filteredPlaces.length} accessible places found
        </Text>
        
        <FlatList
          data={filteredPlaces}
          renderItem={renderPlace}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.placesList}
        />
      </View>
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
  searchSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
  filterButton: {
    padding: 4,
  },
  filtersContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  sortOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  sortOptionSelected: {
    backgroundColor: '#4F46E5',
  },
  sortOptionText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  sortOptionTextSelected: {
    color: '#FFFFFF',
  },
  categoriesSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryCard: {
    alignItems: 'center',
    marginHorizontal: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 80,
  },
  categoryCardSelected: {
    backgroundColor: '#EEF2FF',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  categoryNameSelected: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  categoryCount: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
  },
  resultsSection: {
    flex: 1,
    padding: 20,
  },
  resultsText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  placesList: {
    paddingBottom: 20,
  },
  placeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  placeInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  categoryBadge: {
    marginLeft: 8,
  },
  placeAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginLeft: 4,
  },
  separator: {
    fontSize: 14,
    color: '#9CA3AF',
    marginHorizontal: 6,
  },
  distanceText: {
    fontSize: 14,
    color: '#6B7280',
  },
  priceText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  accessibilityContainer: {
    alignItems: 'center',
  },
  accessibilityScore: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  accessibilityText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  placeDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 12,
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
  moreFeatures: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  actionText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    marginLeft: 6,
  },
});