import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UserListScreen from './UserListScreen';
import UserDetailScreen from './UserDetailScreen';
import UserEditScreen from './UserEditScreen';

// Simple navigation with params
function NavigationParams() {
  const [currentScreen, setCurrentScreen] = useState('users');
  const [params, setParams] = useState({});

  const handleNavigate = (screen, data = {}) => {
    setParams(data);
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'user-detail':
        return <UserDetailScreen user={params.user} onNavigate={handleNavigate} />;
      case 'user-edit':
        return <UserEditScreen userId={params.userId} userName={params.userName} onNavigate={handleNavigate} />;
      case 'users':
      default:
        return <UserListScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <SafeAreaProvider>
      {renderScreen()}
    </SafeAreaProvider>
  );
}

export default NavigationParams;

