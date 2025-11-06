// Import React library for building components
import React from 'react';
// Import React Native core components for UI
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// Import SafeAreaView from react-native-safe-area-context (modern, recommended approach)
// This provides better safe area handling across all devices
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample user data array - in a real app, this would come from an API or database
// Each user object contains id, name, email, and age properties
const USERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 28 }, // User 1
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 32 }, // User 2
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', age: 25 }, // User 3
  { id: '4', name: 'Alice Williams', email: 'alice@example.com', age: 30 }, // User 4
];

/**
 * UserListScreen Component
 * This screen displays a list of users and demonstrates passing params via navigation
 * When a user is tapped, it navigates to UserDetailScreen with the selected user data
 * @param {Object} navigation - Navigation object provided by React Navigation
 * @param {Function} navigation.navigate - Function to navigate to other screens with params
 */
function UserListScreen({ navigation }) {
  /**
   * renderUser Function
   * Renders each user item in the FlatList
   * @param {Object} param0 - FlatList renderItem callback parameter
   * @param {Object} param0.item - The user object from the data array
   * @returns {JSX.Element} - TouchableOpacity containing user information
   */
  const renderUser = ({ item }) => (
    // TouchableOpacity makes the user card tappable
    <TouchableOpacity
      // Apply user card styling from StyleSheet
      style={styles.userCard}
      // onPress handler that navigates to UserDetail screen with user data as params
      // navigation.navigate('ScreenName', { params }) passes data to the destination screen
      // The user object will be accessible via route.params.user in UserDetailScreen
      onPress={() => navigation.navigate('UserDetail', { user: item })}
    >
      {/* Display user's name */}
      <Text style={styles.userName}>{item.name}</Text>
      {/* Display user's email */}
      <Text style={styles.userEmail}>{item.email}</Text>
    </TouchableOpacity>
  );

  // Return the JSX for rendering the screen
  return (
    // SafeAreaView ensures content doesn't overlap with system UI (notch, status bar, etc.)
    // edges prop specifies which edges to apply safe area insets to
    // style prop applies custom styling to the container
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Main content container */}
      <View style={styles.content}>
        {/* Screen title text */}
        <Text style={styles.title}>User List</Text>
        {/* Subtitle providing user instruction */}
        <Text style={styles.subtitle}>Tap a user to see details</Text>
        
        {/* FlatList component for efficiently rendering the user list */}
        <FlatList
          data={USERS} // Array of data to render (user objects)
          renderItem={renderUser} // Function that renders each item
          keyExtractor={item => item.id} // Function that returns unique key for each item
          // contentContainerStyle applies styles to the scrollable content container
          contentContainerStyle={styles.list}
        />
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
    marginBottom: 20, // Space below subtitle
  },
  // FlatList content container style
  list: {
    paddingBottom: 20, // Padding at the bottom of the list
  },
  // User card container style
  userCard: {
    backgroundColor: '#fff', // White background for cards
    padding: 20, // Internal padding inside card
    marginBottom: 10, // Space below each card
    borderRadius: 8, // Rounded corners (8px radius)
    // Shadow properties for iOS
    shadowColor: '#000', // Shadow color (black)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (moves shadow down 2px)
    shadowOpacity: 0.1, // Shadow opacity (10% opacity)
    shadowRadius: 4, // Shadow blur radius
    // Elevation for Android (creates shadow effect)
    elevation: 3, // Elevation level (higher = more shadow)
  },
  // User name text style
  userName: {
    fontSize: 18, // Text size in pixels
    fontWeight: '600', // Semi-bold text weight
    color: '#333', // Dark gray text color
    marginBottom: 5, // Space below name
  },
  // User email text style
  userEmail: {
    fontSize: 14, // Text size in pixels
    color: '#666', // Medium gray text color
  },
});

// Export the component as default export for use in other files
export default UserListScreen;

