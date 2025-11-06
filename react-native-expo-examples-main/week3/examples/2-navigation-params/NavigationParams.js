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
import UserListScreen from './UserListScreen';
import UserDetailScreen from './UserDetailScreen';
import UserEditScreen from './UserEditScreen';

// Create a Stack Navigator instance
// This returns an object with Navigator and Screen components
const Stack = createStackNavigator();

/**
 * NavigationParams Component
 * This component demonstrates navigation with parameters (passing data between screens)
 * It sets up a navigation stack with three screens that pass user data via navigation params
 */
function NavigationParams() {
  // Return the navigation structure
  return (
    // SafeAreaProvider wraps the entire navigation to provide safe area context
    // This ensures all child screens can access safe area insets
    <SafeAreaProvider>
      {/* NavigationContainer is required - manages navigation state and context */}
      {/* It must wrap all navigators in your app */}
      <NavigationContainer>
        {/* Stack.Navigator creates a stack-based navigation structure */}
        {/* initialRouteName specifies which screen to show first */}
        <Stack.Navigator initialRouteName="UserList">
          {/* Stack.Screen defines a screen in the navigation stack */}
          {/* name: unique identifier for the screen (used in navigation.navigate()) */}
          {/* component: the React component to render for this screen */}
          {/* options: configuration object for screen appearance and behavior */}
          <Stack.Screen 
            name="UserList" // Screen identifier - use this in navigation.navigate('UserList')
            component={UserListScreen} // Component to render when this screen is active
            options={{
              title: 'Users', // Header title displayed at the top of the screen
            }}
          />
          {/* UserDetail screen definition - receives user data as params */}
          <Stack.Screen 
            name="UserDetail" // Screen identifier - use this in navigation.navigate('UserDetail')
            component={UserDetailScreen} // Component to render when this screen is active
            options={{
              title: 'User Details', // Header title displayed at the top of the screen
            }}
          />
          {/* UserEdit screen definition - receives user data as params */}
          <Stack.Screen 
            name="UserEdit" // Screen identifier - use this in navigation.navigate('UserEdit')
            component={UserEditScreen} // Component to render when this screen is active
            options={{
              title: 'Edit User', // Header title displayed at the top of the screen
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// Export the component as default export for use in other files
export default NavigationParams;

