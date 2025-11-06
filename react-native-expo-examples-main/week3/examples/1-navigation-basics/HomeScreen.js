// Import React library for building components
import React from 'react';
// Import React Native core components for UI
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// Import SafeAreaView from react-native-safe-area-context (modern, recommended approach)
// This provides better safe area handling across all devices
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * HomeScreen Component
 * This is the main/home screen of the navigation example
 * @param {Object} navigation - Navigation object provided by React Navigation
 * @param {Function} navigation.navigate - Function to navigate to other screens
 */
function HomeScreen({ navigation }) {
  // Return the JSX for rendering the screen
  return (
    // SafeAreaView ensures content doesn't overlap with system UI (notch, status bar, etc.)
    // edges prop specifies which edges to apply safe area insets to
    // style prop applies custom styling to the container
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Main content container with centered layout */}
      <View style={styles.content}>
        {/* Screen title text */}
        <Text style={styles.title}>Home Screen</Text>
        {/* Subtitle explaining what this example demonstrates */}
        <Text style={styles.subtitle}>Navigation Basics Example</Text>
        
        {/* Touchable button to navigate to Profile screen */}
        <TouchableOpacity
          // Apply button styling from StyleSheet
          style={styles.button}
          // onPress handler that navigates to 'Profile' screen when button is pressed
          onPress={() => navigation.navigate('Profile')}
        >
          {/* Button label text */}
          <Text style={styles.buttonText}>Go to Profile</Text>
        </TouchableOpacity>

        {/* Touchable button to navigate to Settings screen */}
        <TouchableOpacity
          // Apply button styling from StyleSheet
          style={styles.button}
          // onPress handler that navigates to 'Settings' screen when button is pressed
          onPress={() => navigation.navigate('Settings')}
        >
          {/* Button label text */}
          <Text style={styles.buttonText}>Go to Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/**
 * StyleSheet object containing all component styles
 * Using StyleSheet.create() is more performant than inline styles
 * It validates styles and optimizes them for native rendering
 */
const styles = StyleSheet.create({
  // Container style for SafeAreaView
  container: {
    flex: 1, // Take up all available space
    backgroundColor: '#f5f5f5', // Light gray background color
  },
  // Content container style
  content: {
    flex: 1, // Take up all available space in container
    justifyContent: 'center', // Vertically center children
    alignItems: 'center', // Horizontally center children
    padding: 20, // Add 20px padding on all sides
  },
  // Title text style
  title: {
    fontSize: 28, // Text size in pixels
    fontWeight: 'bold', // Make text bold
    marginBottom: 10, // Space below title
    color: '#333', // Dark gray text color
  },
  // Subtitle text style
  subtitle: {
    fontSize: 16, // Text size in pixels
    color: '#666', // Medium gray text color
    marginBottom: 40, // Space below subtitle (larger gap before buttons)
  },
  // Button container style
  button: {
    backgroundColor: '#007AFF', // iOS blue color for primary actions
    paddingHorizontal: 30, // Horizontal padding inside button
    paddingVertical: 15, // Vertical padding inside button
    borderRadius: 8, // Rounded corners (8px radius)
    marginVertical: 10, // Vertical margin between buttons
    minWidth: 200, // Minimum button width for consistency
    alignItems: 'center', // Center content horizontally
  },
  // Button text style
  buttonText: {
    color: '#fff', // White text color
    fontSize: 16, // Text size in pixels
    fontWeight: '600', // Semi-bold text weight
  },
});

// Export the component as default export for use in other files
export default HomeScreen;

