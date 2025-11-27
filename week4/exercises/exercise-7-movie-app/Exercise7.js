import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

function Exercise7() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);

  // TODO: Implement loadTrendingMovies function
  // Fetch trending movies from TMDB API (or use simulated data)
  // URL: https://api.themoviedb.org/3/trending/movie/day
  // Requirements:
  // 1. Set loading state
  // 2. Make API call
  // 3. Handle success and error
  // 4. Update trendingMovies state
  const loadTrendingMovies = async () => {
    // Your code here
  };

  // TODO: Load trending movies when component mounts
  // Use useEffect hook
  useEffect(() => {
    // Your code here
  }, []);

  // TODO: Implement searchMovies function
  // Search for movies using TMDB API
  // URL: https://api.themoviedb.org/3/search/movie
  // Params: query (search term), api_key
  // Requirements:
  // 1. Validate search query
  // 2. Set loading state
  // 3. Clear previous results
  // 4. Make API call
  // 5. Handle errors with user-friendly messages
  // 6. Update movies state
  const searchMovies = async () => {
    // Your code here
  };

  // TODO: Implement getMovieDetails function
  // Fetch detailed information about a specific movie
  // URL: https://api.themoviedb.org/3/movie/{movieId}
  // Requirements:
  // 1. Set loading state
  // 2. Make API call with movie ID
  // 3. Handle errors
  // 4. Update selectedMovie state
  const getMovieDetails = async (movieId) => {
    // Your code here
  };

  // TODO: Implement renderMovieItem function
  // Render each movie item in the list
  // Should display:
  // - Movie poster (placeholder if no image)
  // - Movie title
  // - Release year
  // - Rating
  // - Overview (truncated)
  // - Make it tappable to show details
  const renderMovieItem = ({ item }) => {
    // Your code here
    return null;
  };

  // TODO: Implement renderMovieDetails function
  // Display detailed movie information in a modal/overlay
  // Should show:
  // - Title
  // - Release date
  // - Rating
  // - Overview
  // - Runtime (if available)
  // - Genres (if available)
  // - Close button
  const renderMovieDetails = () => {
    if (!selectedMovie) return null;
    
    // Your code here
    return null;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Movie App Exercise</Text>
        <Text style={styles.headerSubtitle}>Complete the TODO items to build a movie app</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder="Search for a movie..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={searchMovies}
            returnKeyType="search"
          />
          <TouchableOpacity
            style={[styles.searchButton, loading && styles.buttonDisabled]}
            onPress={searchMovies}
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
            <Text style={styles.loadingText}>Loading movies...</Text>
          </View>
        )}

        {/* Error State */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}

        {/* Movie Details Modal - TODO: Implement renderMovieDetails */}
        {renderMovieDetails()}

        {/* Search Results */}
        {movies.length > 0 && !loading && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            <FlatList
              data={movies}
              renderItem={renderMovieItem}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Trending Movies */}
        {trendingMovies.length > 0 && movies.length === 0 && !loading && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending Movies</Text>
            <FlatList
              data={trendingMovies}
              renderItem={renderMovieItem}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Instructions */}
        {movies.length === 0 && trendingMovies.length === 0 && !loading && !error && (
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>TODO Items:</Text>
            <Text style={styles.instructionItem}>1. Implement loadTrendingMovies() function</Text>
            <Text style={styles.instructionItem}>2. Load trending movies on mount (useEffect)</Text>
            <Text style={styles.instructionItem}>3. Implement searchMovies() function</Text>
            <Text style={styles.instructionItem}>4. Implement getMovieDetails() function</Text>
            <Text style={styles.instructionItem}>5. Implement renderMovieItem() function</Text>
            <Text style={styles.instructionItem}>6. Implement renderMovieDetails() function</Text>
            <Text style={styles.instructionItem}>7. Add proper error handling</Text>
            <Text style={styles.instructionItem}>8. Add loading states</Text>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
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

export default Exercise7;



