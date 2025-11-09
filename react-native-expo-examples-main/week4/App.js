import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

// Import Examples
import FetchBasics from './examples/1-fetch-basics/FetchBasics';
import AxiosSetup from './examples/2-axios-setup/AxiosSetup';
import AsyncAwait from './examples/3-async-await/AsyncAwait';
import ErrorHandling from './examples/4-error-handling/ErrorHandling';
import LoadingStates from './examples/5-loading-states/LoadingStates';
import EnvVariables from './examples/6-env-variables/EnvVariables';
import WeatherApp from './examples/7-weather-app/WeatherApp';
import MovieApp from './examples/8-movie-app/MovieApp';

// Import Exercises
import Exercise1 from './exercises/exercise-1-fetch/Exercise1';
import Exercise2 from './exercises/exercise-2-axios/Exercise2';
import Exercise3 from './exercises/exercise-3-error-handling/Exercise3';
import Exercise4 from './exercises/exercise-4-loading-states/Exercise4';
import Exercise5 from './exercises/exercise-5-env-variables/Exercise5';
import Exercise6 from './exercises/exercise-6-weather-app/Exercise6';
import Exercise7 from './exercises/exercise-7-movie-app/Exercise7';

const EXAMPLES = [
  {
    id: '1',
    title: 'Fetch Basics',
    component: FetchBasics,
    category: 'Networking',
  },
  {
    id: '2',
    title: 'Axios Setup',
    component: AxiosSetup,
    category: 'Networking',
  },
  {
    id: '3',
    title: 'Async/Await',
    component: AsyncAwait,
    category: 'Networking',
  },
  {
    id: '4',
    title: 'Error Handling',
    component: ErrorHandling,
    category: 'Networking',
  },
  {
    id: '5',
    title: 'Loading States',
    component: LoadingStates,
    category: 'UX',
  },
  {
    id: '6',
    title: 'Environment Variables',
    component: EnvVariables,
    category: 'Configuration',
  },
  {
    id: '7',
    title: 'Weather App',
    component: WeatherApp,
    category: 'Project',
  },
  {
    id: '8',
    title: 'Movie App',
    component: MovieApp,
    category: 'Project',
  },
];

const EXERCISES = [
  {
    id: 'e1',
    title: 'Exercise 1: Fetch API',
    component: Exercise1,
    category: 'Exercise',
  },
  {
    id: 'e2',
    title: 'Exercise 2: Axios',
    component: Exercise2,
    category: 'Exercise',
  },
  {
    id: 'e3',
    title: 'Exercise 3: Error Handling',
    component: Exercise3,
    category: 'Exercise',
  },
  {
    id: 'e4',
    title: 'Exercise 4: Loading States',
    component: Exercise4,
    category: 'Exercise',
  },
  {
    id: 'e5',
    title: 'Exercise 5: Environment Variables',
    component: Exercise5,
    category: 'Exercise',
  },
  {
    id: 'e6',
    title: 'Exercise 6: Weather App',
    component: Exercise6,
    category: 'Exercise',
  },
  {
    id: 'e7',
    title: 'Exercise 7: Movie App',
    component: Exercise7,
    category: 'Exercise',
  },
];

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  if (selectedItem) {
    const Component = selectedItem.component;
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <View style={styles.container}>
          <SafeAreaView style={styles.header} edges={['top']}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedItem(null)}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{selectedItem.title}</Text>
          </SafeAreaView>
          <Component />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Text style={styles.mainTitle}>Week 4: Networking & APIs</Text>
          <Text style={styles.subtitle}>
            Examples and Exercises for Fetch, Axios, Async/Await, Error Handling, and API Integration
          </Text>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Examples</Text>
            {EXAMPLES.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.item}
                onPress={() => setSelectedItem(item)}
              >
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                </View>
                <Text style={styles.arrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Exercises</Text>
            {EXERCISES.map(item => (
              <TouchableOpacity
                key={item.id}
                style={[styles.item, styles.exerciseItem]}
                onPress={() => setSelectedItem(item)}
              >
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                </View>
                <Text style={styles.arrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  itemCategory: {
    fontSize: 12,
    color: '#666',
  },
  arrow: {
    fontSize: 20,
    color: '#007AFF',
    marginLeft: 10,
  },
});

