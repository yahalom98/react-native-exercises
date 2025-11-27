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
import NavigationBasics from './examples/1-navigation-basics/NavigationBasics';
import NavigationParams from './examples/2-navigation-params/NavigationParams';
import CustomHeaderExample from './examples/3-header-customization/CustomHeaderExample';
import UseStateExample from './examples/4-hooks-usestate/UseStateExample';
import UseEffectExample from './examples/5-hooks-useeffect/UseEffectExample';
import UseRefExample from './examples/6-hooks-useref/UseRefExample';
import ConditionalRenderingExample from './examples/7-conditional-rendering/ConditionalRenderingExample';
import FlatListExample from './examples/8-flatlist/FlatListExample';
import SectionListExample from './examples/9-sectionlist/SectionListExample';
import FormExample from './examples/10-forms/FormExample';

// Import Exercises
import Exercise1 from './exercises/exercise-1-navigation/Exercise1';
import Exercise2 from './exercises/exercise-2-hooks/Exercise2';
import Exercise3 from './exercises/exercise-3-flatlist/Exercise3';
import Exercise4 from './exercises/exercise-4-forms/Exercise4';
import Exercise5 from './exercises/exercise-5-sectionlist/Exercise5';
import Exercise6 from './exercises/exercise-6-comprehensive/Exercise6';

const EXAMPLES = [
  {
    id: '1',
    title: 'Navigation Basics',
    component: NavigationBasics,
    category: 'Navigation',
  },
  {
    id: '2',
    title: 'Navigation with Params',
    component: NavigationParams,
    category: 'Navigation',
  },
  {
    id: '3',
    title: 'Custom Headers',
    component: CustomHeaderExample,
    category: 'Navigation',
  },
  {
    id: '4',
    title: 'useState Hook',
    component: UseStateExample,
    category: 'Hooks',
  },
  {
    id: '5',
    title: 'useEffect Hook',
    component: UseEffectExample,
    category: 'Hooks',
  },
  {
    id: '6',
    title: 'useRef Hook',
    component: UseRefExample,
    category: 'Hooks',
  },
  {
    id: '7',
    title: 'Conditional Rendering',
    component: ConditionalRenderingExample,
    category: 'React Concepts',
  },
  {
    id: '8',
    title: 'FlatList',
    component: FlatListExample,
    category: 'Lists',
  },
  {
    id: '9',
    title: 'SectionList',
    component: SectionListExample,
    category: 'Lists',
  },
  {
    id: '10',
    title: 'Forms & Input',
    component: FormExample,
    category: 'Forms',
  },
];

const EXERCISES = [
  {
    id: 'e1',
    title: 'Exercise 1: Navigation',
    component: Exercise1,
    category: 'Exercise',
  },
  {
    id: 'e2',
    title: 'Exercise 2: Hooks',
    component: Exercise2,
    category: 'Exercise',
  },
  {
    id: 'e3',
    title: 'Exercise 3: FlatList',
    component: Exercise3,
    category: 'Exercise',
  },
  {
    id: 'e4',
    title: 'Exercise 4: Forms',
    component: Exercise4,
    category: 'Exercise',
  },
  {
    id: 'e5',
    title: 'Exercise 5: SectionList',
    component: Exercise5,
    category: 'Exercise',
  },
  {
    id: 'e6',
    title: 'Exercise 6: Comprehensive',
    component: Exercise6,
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
        <Text style={styles.mainTitle}>Week 3: React Native Concepts</Text>
        <Text style={styles.subtitle}>
          Examples and Exercises for Navigation, Hooks, Lists, and Forms
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

