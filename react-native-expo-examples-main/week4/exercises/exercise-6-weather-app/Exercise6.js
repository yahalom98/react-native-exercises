import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

function Exercise6() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Implement fetchWeather function
  // Requirements:
  // 1. Validate that city is not empty
  // 2. Set loading state
  // 3. Clear previous errors
  // 4. Make API call to OpenWeatherMap (or use simulated data)
  // 5. Handle success and error states
  // 6. Update weather state with response
  // 7. Show user-friendly error messages
  // 
  // API Info:
  // - URL: https://api.openweathermap.org/data/2.5/weather
  // - Params: q (city), appid (API key), units (metric)
  // - For demo, you can simulate the response
  const fetchWeather = async () => {
    // Your code here
  };

  // TODO: Implement displayWeather function
  // Create a nice UI to display weather information:
  // - City name
  // - Temperature
  // - Weather description
  // - Humidity
  // - Wind speed
  // - Feel free to add more details
  const displayWeather = () => {
    if (!weather) return null;
    
    // Your code here
    // Return JSX to display weather information
    return null;
  };

  // TODO: Implement getWeatherIcon function
  // Return an emoji or text based on weather condition
  // Use weather.weather[0].main to determine condition
  // Conditions: Clear, Clouds, Rain, Snow, etc.
  const getWeatherIcon = (condition) => {
    // Your code here
    return '🌤️';
  };

  // TODO: Implement getWeatherColor function
  // Return a color based on weather condition
  // Use different colors for different weather types
  const getWeatherColor = (condition) => {
    // Your code here
    return '#007AFF';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weather App Exercise</Text>
        <Text style={styles.headerSubtitle}>Complete the TODO items to build a weather app</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            value={city}
            onChangeText={setCity}
            onSubmitEditing={fetchWeather}
            returnKeyType="search"
          />
          <TouchableOpacity
            style={[styles.searchButton, loading && styles.buttonDisabled]}
            onPress={fetchWeather}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.searchButtonText}>Search</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Loading State */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Fetching weather data...</Text>
          </View>
        )}

        {/* Error State */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}

        {/* Weather Display - TODO: Implement displayWeather */}
        {weather && !loading && displayWeather()}

        {/* Instructions */}
        {!weather && !loading && !error && (
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>TODO Items:</Text>
            <Text style={styles.instructionItem}>1. Implement fetchWeather() function</Text>
            <Text style={styles.instructionItem}>2. Implement displayWeather() function</Text>
            <Text style={styles.instructionItem}>3. Implement getWeatherIcon() function</Text>
            <Text style={styles.instructionItem}>4. Implement getWeatherColor() function</Text>
            <Text style={styles.instructionItem}>5. Add proper error handling</Text>
            <Text style={styles.instructionItem}>6. Add loading states</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  searchSection: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f44336',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: '600',
  },
  instructionsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  instructionItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default Exercise6;

