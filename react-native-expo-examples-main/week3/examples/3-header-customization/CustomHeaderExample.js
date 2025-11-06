import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';

// Screen Components
function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Home Screen</Text>
        <Text style={styles.subtitle}>Custom Headers Example</Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>Go to Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.buttonText}>Go to Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile Screen</Text>
        <Text style={styles.subtitle}>This screen has a custom header</Text>
      </View>
    </SafeAreaView>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings Screen</Text>
        <Text style={styles.subtitle}>This screen has a custom header with logo</Text>
      </View>
    </SafeAreaView>
  );
}

// Custom Header Component
function CustomHeader({ navigation, title }) {
  return (
    <View style={headerStyles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={headerStyles.backButton}>
        <Text style={headerStyles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={headerStyles.title}>{title}</Text>
      <View style={headerStyles.placeholder} />
    </View>
  );
}

function CustomHeaderWithLogo({ navigation, title }) {
  return (
    <View style={headerStyles.containerWithLogo}>
      <View style={headerStyles.logoContainer}>
        <View style={headerStyles.logo} />
      </View>
      <Text style={headerStyles.titleWithLogo}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={headerStyles.closeButton}>
        <Text style={headerStyles.closeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();

function CustomHeaderExample() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'My App',
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerRight: () => (
              <TouchableOpacity style={headerStyles.headerButton}>
                <Text style={headerStyles.headerButtonText}>⚙️</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            header: ({ navigation }) => (
              <CustomHeader navigation={navigation} title="Profile" />
            ),
          }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            header: ({ navigation }) => (
              <CustomHeaderWithLogo navigation={navigation} title="Settings" />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  containerWithLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#007AFF',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  titleWithLogo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  logoContainer: {
    marginRight: 10,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  headerButton: {
    padding: 10,
    marginRight: 10,
  },
  headerButtonText: {
    fontSize: 20,
  },
});

export default CustomHeaderExample;

