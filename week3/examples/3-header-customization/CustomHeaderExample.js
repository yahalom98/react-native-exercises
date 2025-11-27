import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

function CustomHeader({ title, onBack }) {
  return (
    <View style={headerStyles.container}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={headerStyles.backButton}>
          <Text style={headerStyles.backButtonText}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={headerStyles.title}>{title}</Text>
      <View style={headerStyles.placeholder} />
    </View>
  );
}

function CustomHeaderWithLogo({ title, onBack }) {
  return (
    <View style={headerStyles.containerWithLogo}>
      <View style={headerStyles.logoContainer}>
        <View style={headerStyles.logo} />
      </View>
      <Text style={headerStyles.titleWithLogo}>{title}</Text>
      <TouchableOpacity onPress={onBack} style={headerStyles.closeButton}>
        <Text style={headerStyles.closeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

// Simple navigation with custom headers
function CustomHeaderExample() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const handleNavigate = (screen) => setCurrentScreen(screen);
  const handleBack = () => setCurrentScreen('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'profile':
        return (
          <>
            <CustomHeader title="Profile" onBack={handleBack} />
            <ProfileScreen onNavigate={handleNavigate} />
          </>
        );
      case 'settings':
        return (
          <>
            <CustomHeaderWithLogo title="Settings" onBack={handleBack} />
            <SettingsScreen onNavigate={handleNavigate} />
          </>
        );
      case 'home':
      default:
        return (
          <>
            <View style={headerStyles.defaultHeader}>
              <Text style={headerStyles.defaultHeaderTitle}>My App</Text>
              <TouchableOpacity style={headerStyles.headerButton}>
                <Text style={headerStyles.headerButtonText}>⚙️</Text>
              </TouchableOpacity>
            </View>
            <HomeScreen onNavigate={handleNavigate} />
          </>
        );
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer} edges={['top']}>
        {renderScreen()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  defaultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
  },
  defaultHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CustomHeaderExample;

