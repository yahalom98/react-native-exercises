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
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

// Using OpenWeatherMap API (free tier available)
// Sign up at: https://openweathermap.org/api
// For demo purposes, we'll use a public API endpoint
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Note: In production, API key should be in environment variables
  // For demo, we'll use a test approach
  const API_KEY = 'demo_key'; // Replace with actual API key from OpenWeatherMap

  const fetchWeather = async () => {
    if (!city.trim()) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      // Note: This will fail without a real API key
      // For demo, we'll simulate the response
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulated weather data for demo
      // In production, uncomment the axios call below
      /*
      const response = await axios.get(WEATHER_API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });
      */

      // Simulated response for demo
      const simulatedWeather = {
        name: city,
        main: {
          temp: Math.floor(Math.random() * 30) + 10,
          feels_like: Math.floor(Math.random() * 30) + 10,
          humidity: Math.floor(Math.random() * 50) + 30,
          pressure: Math.floor(Math.random() * 200) + 1000,
        },
        weather: [
          {
            main: ['Clear', 'Clouds', 'Rain', 'Snow'][Math.floor(Math.random() * 4)],
            description: 'partly cloudy',
            icon: '02d',
          },
        ],
        wind: {
          speed: (Math.random() * 10).toFixed(1),
        },
        visibility: Math.floor(Math.random() * 5000) + 5000,
      };

      setWeather(simulatedWeather);
      // setWeather(response.data); // Use this in production
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.statusText}`);
      } else if (err.request) {
        setError('Unable to connect to weather service. Please check your internet connection.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    // In production, you'd use actual weather icons
    return condition;
  };

  const getWeatherColor = (condition) => {
    switch (condition) {
      case 'Clear':
        return '#FFD700';
      case 'Clouds':
        return '#87CEEB';
      case 'Rain':
        return '#4682B4';
      case 'Snow':
        return '#E0E0E0';
      default:
        return '#007AFF';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weather App</Text>
        <Text style={styles.headerSubtitle}>Get real-time weather information</Text>
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
            <Text style={styles.errorHint}>
              Note: This demo uses simulated data. In production, you need an API key from OpenWeatherMap.
            </Text>
          </View>
        )}

        {/* Weather Display */}
        {weather && !loading && (
          <View style={styles.weatherContainer}>
            <View style={styles.cityHeader}>
              <Text style={styles.cityName}>{weather.name}</Text>
              <Text style={styles.weatherMain}>{weather.weather[0].main}</Text>
            </View>

            <View style={[styles.temperatureCard, { backgroundColor: getWeatherColor(weather.weather[0].main) }]}>
              <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
              <Text style={styles.feelsLike}>
                Feels like {Math.round(weather.main.feels_like)}°C
              </Text>
              <Text style={styles.description}>
                {weather.weather[0].description.charAt(0).toUpperCase() + 
                 weather.weather[0].description.slice(1)}
              </Text>
            </View>

            <View style={styles.detailsGrid}>
              <View style={styles.detailCard}>
                <Text style={styles.detailLabel}>Humidity</Text>
                <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
              </View>
              <View style={styles.detailCard}>
                <Text style={styles.detailLabel}>Pressure</Text>
                <Text style={styles.detailValue}>{weather.main.pressure} hPa</Text>
              </View>
              <View style={styles.detailCard}>
                <Text style={styles.detailLabel}>Wind Speed</Text>
                <Text style={styles.detailValue}>{weather.wind.speed} m/s</Text>
              </View>
              <View style={styles.detailCard}>
                <Text style={styles.detailLabel}>Visibility</Text>
                <Text style={styles.detailValue}>{(weather.visibility / 1000).toFixed(1)} km</Text>
              </View>
            </View>
          </View>
        )}

        {/* Instructions */}
        {!weather && !loading && !error && (
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>How to use:</Text>
            <Text style={styles.instructionItem}>1. Enter a city name</Text>
            <Text style={styles.instructionItem}>2. Tap Search or press Enter</Text>
            <Text style={styles.instructionItem}>3. View weather information</Text>
            <Text style={styles.note}>
              Note: This demo uses simulated data. To use real weather data:
            </Text>
            <Text style={styles.noteItem}>
              • Sign up at openweathermap.org
            </Text>
            <Text style={styles.noteItem}>
              • Get your free API key
            </Text>
            <Text style={styles.noteItem}>
              • Store it in environment variables
            </Text>
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
    marginBottom: 8,
  },
  errorHint: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  weatherContainer: {
    marginTop: 10,
  },
  cityHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cityName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  weatherMain: {
    fontSize: 18,
    color: '#666',
    textTransform: 'capitalize',
  },
  temperatureCard: {
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  feelsLike: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textTransform: 'capitalize',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailCard: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
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
  note: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  noteItem: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    marginLeft: 10,
  },
});

export default WeatherApp;

