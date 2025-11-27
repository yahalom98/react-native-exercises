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
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

// Using The Movie Database (TMDB) API
// Sign up at: https://www.themoviedb.org/settings/api
// For demo, we'll use simulated data
const TMDB_API_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

function MovieApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);

  // Note: In production, API key should be in environment variables
  const API_KEY = 'demo_key'; // Replace with actual TMDB API key

  // Load trending movies on mount
  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const loadTrendingMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulated trending movies data
      const simulatedTrending = [
        {
          id: 1,
          title: 'The Matrix',
          release_date: '1999-03-31',
          vote_average: 8.7,
          overview: 'A computer hacker learns about the true nature of reality.',
          poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
        },
        {
          id: 2,
          title: 'Inception',
          release_date: '2010-07-16',
          vote_average: 8.8,
          overview: 'A thief who steals corporate secrets through dream-sharing technology.',
          poster_path: '/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
        },
        {
          id: 3,
          title: 'Interstellar',
          release_date: '2014-11-07',
          vote_average: 8.6,
          overview: 'A team of explorers travel through a wormhole in space.',
          poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        },
      ];

      setTrendingMovies(simulatedTrending);
      // In production: const response = await axios.get(`${TMDB_API_URL}/trending/movie/day?api_key=${API_KEY}`);
    } catch (err) {
      setError('Failed to load trending movies');
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a movie title');
      return;
    }

    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulated search results
      const simulatedResults = [
        {
          id: 101,
          title: `${searchQuery} - Movie 1`,
          release_date: '2020-01-15',
          vote_average: 7.5,
          overview: `A great movie about ${searchQuery}`,
          poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
        },
        {
          id: 102,
          title: `${searchQuery} - Movie 2`,
          release_date: '2021-06-20',
          vote_average: 8.2,
          overview: `Another amazing movie featuring ${searchQuery}`,
          poster_path: '/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
        },
      ];

      setMovies(simulatedResults);
      // In production: const response = await axios.get(`${TMDB_API_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.statusText}`);
      } else if (err.request) {
        setError('Unable to connect to movie database. Please check your internet connection.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const getMovieDetails = async (movieId) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulated movie details
      const simulatedDetails = {
        id: movieId,
        title: 'Movie Details',
        release_date: '2020-01-15',
        vote_average: 8.5,
        overview: 'This is a detailed description of the movie with all the information you need.',
        poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
        runtime: 120,
        genres: [{ name: 'Action' }, { name: 'Sci-Fi' }],
        production_companies: [{ name: 'Warner Bros' }],
      };

      setSelectedMovie(simulatedDetails);
      // In production: const response = await axios.get(`${TMDB_API_URL}/movie/${movieId}?api_key=${API_KEY}`);
    } catch (err) {
      setError('Failed to load movie details');
    } finally {
      setLoading(false);
    }
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => getMovieDetails(item.id)}
    >
      <View style={styles.movieCardContent}>
        <View style={styles.posterPlaceholder}>
          <Text style={styles.posterText}>🎬</Text>
        </View>
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.movieDate}>
            {new Date(item.release_date).getFullYear()}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {item.vote_average.toFixed(1)}</Text>
          </View>
          <Text style={styles.movieOverview} numberOfLines={3}>
            {item.overview}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Movie Database</Text>
        <Text style={styles.headerSubtitle}>Search and discover movies</Text>
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
            <Text style={styles.errorHint}>
              Note: This demo uses simulated data. In production, you need an API key from TMDB.
            </Text>
          </View>
        )}

        {/* Movie Details Modal */}
        {selectedMovie && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedMovie(null)}
              >
                <Text style={styles.closeButtonText}>✕ Close</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedMovie.title}</Text>
              <Text style={styles.modalDate}>
                {new Date(selectedMovie.release_date).toLocaleDateString()}
              </Text>
              <Text style={styles.modalRating}>
                ⭐ {selectedMovie.vote_average.toFixed(1)} / 10
              </Text>
              <Text style={styles.modalOverview}>{selectedMovie.overview}</Text>
              {selectedMovie.runtime && (
                <Text style={styles.modalRuntime}>
                  Runtime: {selectedMovie.runtime} minutes
                </Text>
              )}
              {selectedMovie.genres && (
                <View style={styles.genresContainer}>
                  {selectedMovie.genres.map((genre, index) => (
                    <View key={index} style={styles.genreTag}>
                      <Text style={styles.genreText}>{genre.name}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}

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
            <Text style={styles.instructionsTitle}>How to use:</Text>
            <Text style={styles.instructionItem}>1. Browse trending movies below</Text>
            <Text style={styles.instructionItem}>2. Or search for a specific movie</Text>
            <Text style={styles.instructionItem}>3. Tap a movie to see details</Text>
            <Text style={styles.note}>
              Note: This demo uses simulated data. To use real movie data:
            </Text>
            <Text style={styles.noteItem}>• Sign up at themoviedb.org</Text>
            <Text style={styles.noteItem}>• Get your free API key</Text>
            <Text style={styles.noteItem}>• Store it in environment variables</Text>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  movieCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  movieCardContent: {
    flexDirection: 'row',
    padding: 15,
  },
  posterPlaceholder: {
    width: 80,
    height: 120,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  posterText: {
    fontSize: 40,
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  movieDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: '#FF9500',
    fontWeight: '600',
  },
  movieOverview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  modalDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  modalRating: {
    fontSize: 18,
    color: '#FF9500',
    fontWeight: '600',
    marginBottom: 15,
  },
  modalOverview: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    marginBottom: 15,
  },
  modalRuntime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  genreTag: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: '#fff',
    fontSize: 12,
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

export default MovieApp;



