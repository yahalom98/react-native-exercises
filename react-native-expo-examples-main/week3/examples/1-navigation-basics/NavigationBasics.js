// Import React library for building components
import React from 'react';
// Import NavigationContainer - required wrapper for all navigation in React Navigation
// This manages the navigation state and provides navigation context to all screens
import { NavigationContainer } from '@react-navigation/native';
// Import createStackNavigator - creates a stack-based navigation structure
// Stack navigation allows screens to be pushed/popped like a stack data structure
import { createStackNavigator } from '@react-navigation/stack';
// Import SafeAreaProvider - provides safe area context to all child components
// This is the modern way to handle safe areas in React Native
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Import screen components that will be part of the navigation stack
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

// Create a Stack Navigator instance
// This returns an object with Navigator and Screen components
const Stack = createStackNavigator();

/**
 * NavigationBasics Component
 * This component sets up the navigation structure using React Navigation Stack
 * It demonstrates basic screen navigation with three screens: Home, Profile, and Settings
 */
function NavigationBasics() {
  // Return the navigation structure
  return (
    // SafeAreaProvider wraps the entire app to provide safe area context
    // This ensures all child components can access safe area insets
    <SafeAreaProvider>
      {/* NavigationContainer is required - manages navigation state and context */}
      {/* It must wrap all navigators in your app */}
      <NavigationContainer>
        {/* Stack.Navigator creates a stack-based navigation structure */}
        {/* initialRouteName specifies which screen to show first */}
        <Stack.Navigator initialRouteName="Home">
          {/* Stack.Screen defines a screen in the navigation stack */}
          {/* name: unique identifier for the screen (used in navigation.navigate()) */}
          {/* component: the React component to render for this screen */}
          {/* options: configuration object for screen appearance and behavior */}
          <Stack.Screen 
            name="Home" // Screen identifier - use this in navigation.navigate('Home')
            component={HomeScreen} // Component to render when this screen is active
            options={{
              title: 'Home', // Header title displayed at the top of the screen
            }}
          />
          {/* Profile screen definition */}
          <Stack.Screen 
            name="Profile" // Screen identifier - use this in navigation.navigate('Profile')
            component={ProfileScreen} // Component to render when this screen is active
            options={{
              title: 'Profile', // Header title displayed at the top of the screen
            }}
          />
          {/* Settings screen definition */}
          <Stack.Screen 
            name="Settings" // Screen identifier - use this in navigation.navigate('Settings')
            component={SettingsScreen} // Component to render when this screen is active
            options={{
              title: 'Settings', // Header title displayed at the top of the screen
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// Export the component as default export for use in other files
export default NavigationBasics;

