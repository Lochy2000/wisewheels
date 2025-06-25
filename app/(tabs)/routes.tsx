import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Zap,
  Settings,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  ArrowRight
} from 'lucide-react-native';

interface RouteOption {
  id: string;
  type: 'fastest' | 'accessible' | 'scenic';
  duration: string;
  distance: string;
  accessibilityScore: number;
  features: string[];
  warnings: string[];
}

interface RouteStep {
  id: string;
  instruction: string;
  distance: string;
  type: 'walk' | 'elevator' | 'ramp' | 'caution';
  accessibility: 'good' | 'fair' | 'caution';
}

export default function RoutesScreen() {
  const [fromLocation, setFromLocation] = useState('Current Location');
  const [toLocation, setToLocation] = useState('');
  const [avoidStairs, setAvoidStairs] = useState(true);
  const [smoothSurface, setSmoothSurface] = useState(true);
  const [publicTransport, setPublicTransport] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [routeOptions, setRouteOptions] = useState<RouteOption[]>([]);
  const [routeSteps, setRouteSteps] = useState<RouteStep[]>([]);
  const [isPlanning, setIsPlanning] = useState(false);

  const handlePlanRoute = async () => {
    if (!toLocation.trim()) {
      Alert.alert('Missing destination', 'Please enter a destination to plan your route.');
      return;
    }

    setIsPlanning(true);
    
    // Simulate API call to OpenRouteService
    setTimeout(() => {
      const mockRoutes: RouteOption[] = [
        {
          id: 'accessible',
          type: 'accessible',
          duration: '12 min',
          distance: '0.8 mi',
          accessibilityScore: 95,
          features: ['Level paths', 'Accessible crossings', 'Smooth surfaces'],
          warnings: []
        },
        {
          id: 'fastest',
          type: 'fastest',
          duration: '8 min',
          distance: '0.6 mi',
          accessibilityScore: 75,
          features: ['Direct route', 'Some inclines'],
          warnings: ['Steep incline (8°) for 30m']
        },
        {
          id: 'scenic',
          type: 'scenic',
          duration: '15 min',
          distance: '1.2 mi',
          accessibilityScore: 90,
          features: ['Park route', 'Accessible paths', 'Rest areas'],
          warnings: []
        }
      ];

      setRouteOptions(mockRoutes);
      setSelectedRoute('accessible');
      loadRouteSteps('accessible');
      setIsPlanning(false);
    }, 2000);
  };

  const loadRouteSteps = (routeId: string) => {
    const mockSteps: RouteStep[] = [
      {
        id: '1',
        instruction: 'Head south on Main Street',
        distance: '150m',
        type: 'walk',
        accessibility: 'good'
      },
      {
        id: '2',
        instruction: 'Use accessible crossing at traffic light',
        distance: '20m',
        type: 'walk',
        accessibility: 'good'
      },
      {
        id: '3',
        instruction: 'Take elevator to upper level',
        distance: '5m',
        type: 'elevator',
        accessibility: 'good'
      },
      {
        id: '4',
        instruction: 'Continue straight on accessible pathway',
        distance: '200m',
        type: 'walk',
        accessibility: 'good'
      },
      {
        id: '5',
        instruction: 'Gentle incline (3°) - assistance may be helpful',
        distance: '50m',
        type: 'ramp',
        accessibility: 'fair'
      },
      {
        id: '6',
        instruction: 'Arrive at destination - automatic doors available',
        distance: '0m',
        type: 'walk',
        accessibility: 'good'
      }
    ];
    setRouteSteps(mockSteps);
  };

  const selectRoute = (routeId: string) => {
    setSelectedRoute(routeId);
    loadRouteSteps(routeId);
  };

  const getRouteIcon = (type: string) => {
    switch (type) {
      case 'fastest': return <Zap size={20} color="#F59E0B" />;
      case 'accessible': return <CheckCircle size={20} color="#10B981" />;
      case 'scenic': return <MapPin size={20} color="#8B5CF6" />;
      default: return <Navigation size={20} color="#6B7280" />;
    }
  };

  const getAccessibilityColor = (accessibility: string) => {
    switch (accessibility) {
      case 'good': return '#10B981';
      case 'fair': return '#F59E0B';
      case 'caution': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'elevator': return <ArrowRight size={16} color="#4F46E5" />;
      case 'ramp': return <ArrowRight size={16} color="#F59E0B" />;
      case 'caution': return <AlertCircle size={16} color="#EF4444" />;
      default: return <ArrowRight size={16} color="#10B981" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Route Planner</Text>
          <Text style={styles.subtitle}>Find accessible paths to your destination</Text>
        </View>

        {/* Route Input Form */}
        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            <View style={styles.inputRow}>
              <View style={styles.locationIcon}>
                <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>From</Text>
                <TextInput
                  style={styles.textInput}
                  value={fromLocation}
                  onChangeText={setFromLocation}
                  placeholder="Starting location"
                />
              </View>
              <TouchableOpacity style={styles.currentLocationButton}>
                <MapPin size={20} color="#4F46E5" />
              </TouchableOpacity>
            </View>

            <View style={styles.connectionLine} />

            <View style={styles.inputRow}>
              <View style={styles.locationIcon}>
                <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>To</Text>
                <TextInput
                  style={styles.textInput}
                  value={toLocation}
                  onChangeText={setToLocation}
                  placeholder="Where are you going?"
                />
              </View>
              <TouchableOpacity style={styles.swapButton}>
                <RotateCcw size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Accessibility Options */}
          <View style={styles.optionsContainer}>
            <Text style={styles.optionsTitle}>Accessibility Preferences</Text>
            
            <TouchableOpacity 
              style={styles.optionRow}
              onPress={() => setAvoidStairs(!avoidStairs)}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionText}>Avoid stairs</Text>
                <Text style={styles.optionDescription}>Use ramps and elevators instead</Text>
              </View>
              <View style={[styles.checkbox, avoidStairs && styles.checkboxChecked]}>
                {avoidStairs && <CheckCircle size={16} color="#FFFFFF" />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionRow}
              onPress={() => setSmoothSurface(!smoothSurface)}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionText}>Smooth surfaces only</Text>
                <Text style={styles.optionDescription}>Avoid cobblestones and rough paths</Text>
              </View>
              <View style={[styles.checkbox, smoothSurface && styles.checkboxChecked]}>
                {smoothSurface && <CheckCircle size={16} color="#FFFFFF" />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionRow}
              onPress={() => setPublicTransport(!publicTransport)}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionText}>Include accessible transit</Text>
                <Text style={styles.optionDescription}>Use buses and trains with accessibility</Text>
              </View>
              <View style={[styles.checkbox, publicTransport && styles.checkboxChecked]}>
                {publicTransport && <CheckCircle size={16} color="#FFFFFF" />}
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.planButton, isPlanning && styles.planButtonDisabled]}
            onPress={handlePlanRoute}
            disabled={isPlanning}
          >
            <Navigation size={20} color="#FFFFFF" />
            <Text style={styles.planButtonText}>
              {isPlanning ? 'Planning Route...' : 'Plan My Route'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Route Options */}
        {routeOptions.length > 0 && (
          <View style={styles.routeOptionsSection}>
            <Text style={styles.sectionTitle}>Route Options</Text>
            
            {routeOptions.map((route) => (
              <TouchableOpacity
                key={route.id}
                style={[
                  styles.routeCard,
                  selectedRoute === route.id && styles.routeCardSelected
                ]}
                onPress={() => selectRoute(route.id)}
              >
                <View style={styles.routeHeader}>
                  <View style={styles.routeInfo}>
                    <View style={styles.routeTypeContainer}>
                      {getRouteIcon(route.type)}
                      <Text style={styles.routeTypeText}>
                        {route.type.charAt(0).toUpperCase() + route.type.slice(1)}
                      </Text>
                    </View>
                    <View style={styles.routeMetrics}>
                      <Text style={styles.routeDuration}>{route.duration}</Text>
                      <Text style={styles.routeDistance}>{route.distance}</Text>
                    </View>
                  </View>
                  <View style={styles.accessibilityScore}>
                    <Text style={styles.scoreText}>{route.accessibilityScore}%</Text>
                    <Text style={styles.scoreLabel}>Accessible</Text>
                  </View>
                </View>

                <View style={styles.routeFeatures}>
                  {route.features.map((feature, index) => (
                    <View key={index} style={styles.featureTag}>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                {route.warnings.length > 0 && (
                  <View style={styles.warningsContainer}>
                    {route.warnings.map((warning, index) => (
                      <View key={index} style={styles.warningItem}>
                        <AlertCircle size={14} color="#F59E0B" />
                        <Text style={styles.warningText}>{warning}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Route Steps */}
        {selectedRoute && routeSteps.length > 0 && (
          <View style={styles.stepsSection}>
            <Text style={styles.sectionTitle}>Turn-by-Turn Directions</Text>
            
            {routeSteps.map((step, index) => (
              <View key={step.id} style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.stepContent}>
                  <View style={styles.stepHeader}>
                    <Text style={styles.stepInstruction}>{step.instruction}</Text>
                    <Text style={styles.stepDistance}>{step.distance}</Text>
                  </View>
                  <View style={styles.stepFooter}>
                    <View style={styles.stepAccessibility}>
                      <View style={[
                        styles.accessibilityDot,
                        { backgroundColor: getAccessibilityColor(step.accessibility) }
                      ]} />
                      <Text style={styles.accessibilityText}>
                        {step.accessibility === 'good' ? 'Fully accessible' :
                         step.accessibility === 'fair' ? 'Mostly accessible' : 'Use caution'}
                      </Text>
                    </View>
                    {getStepIcon(step.type)}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

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
  formSection: {
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
  inputContainer: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 20,
    alignItems: 'center',
    marginRight: 16,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  connectionLine: {
    width: 2,
    height: 20,
    backgroundColor: '#D1D5DB',
    marginLeft: 6,
    marginVertical: 8,
  },
  inputWrapper: {
    flex: 1,
    marginRight: 12,
  },
  inputLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  textInput: {
    fontSize: 16,
    color: '#1F2937',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 8,
  },
  currentLocationButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  swapButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionContent: {
    flex: 1,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  optionDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  planButton: {
    backgroundColor: '#4F46E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  planButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  planButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  routeOptionsSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  routeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  routeCardSelected: {
    borderColor: '#4F46E5',
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeInfo: {
    flex: 1,
  },
  routeTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  routeTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  routeMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeDuration: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4F46E5',
    marginRight: 12,
  },
  routeDistance: {
    fontSize: 14,
    color: '#6B7280',
  },
  accessibilityScore: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  routeFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
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
  warningsContainer: {
    marginTop: 8,
  },
  warningItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  warningText: {
    fontSize: 12,
    color: '#F59E0B',
    marginLeft: 6,
    fontWeight: '500',
  },
  stepsSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepContent: {
    flex: 1,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  stepInstruction: {
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
    marginRight: 12,
  },
  stepDistance: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  stepFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepAccessibility: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accessibilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  accessibilityText: {
    fontSize: 12,
    color: '#6B7280',
  },
});