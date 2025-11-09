import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

function LoadingStates() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example 1: Basic loading state
  const basicLoading = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Example 2: Loading with skeleton/placeholder
  const loadingWithPlaceholder = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Example 3: Button loading state
  const [buttonLoading, setButtonLoading] = useState(false);
  const buttonLoadingExample = async () => {
    setButtonLoading(true);
    setError(null);
    setData(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setButtonLoading(false);
    }
  };

  // Example 4: Multiple loading states
  const [loadingStates, setLoadingStates] = useState({
    posts: false,
    users: false,
    comments: false,
  });
  const multipleLoadingStates = async () => {
    setLoadingStates({ posts: true, users: false, comments: false });
    setError(null);
    setData(null);

    try {
      // Load posts
      const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      setLoadingStates({ posts: false, users: true, comments: false });

      // Load users
      await new Promise(resolve => setTimeout(resolve, 1000));
      const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users/1');
      setLoadingStates({ posts: false, users: false, comments: true });

      // Load comments
      await new Promise(resolve => setTimeout(resolve, 1000));
      const commentsResponse = await axios.get('https://jsonplaceholder.typicode.com/comments?postId=1');

      setData({
        post: postsResponse.data,
        user: usersResponse.data,
        comments: commentsResponse.data,
      });
      setLoadingStates({ posts: false, users: false, comments: false });
    } catch (err) {
      setError(err.message);
      setLoadingStates({ posts: false, users: false, comments: false });
    }
  };

  // Example 5: Pull to refresh loading
  const [refreshing, setRefreshing] = useState(false);
  const pullToRefresh = async () => {
    setRefreshing(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Loading States</Text>
        <Text style={styles.description}>
          Loading states provide visual feedback to users while data is being fetched.
          Good loading states improve user experience and make apps feel more responsive.
        </Text>

        {/* Best Practices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best Practices</Text>
          <Text style={styles.listItem}>✓ Show loading indicator immediately</Text>
          <Text style={styles.listItem}>✓ Disable buttons during loading</Text>
          <Text style={styles.listItem}>✓ Use skeleton screens for better UX</Text>
          <Text style={styles.listItem}>✓ Show progress for long operations</Text>
          <Text style={styles.listItem}>✓ Always use finally block to reset loading</Text>
          <Text style={styles.listItem}>✓ Handle loading errors gracefully</Text>
        </View>

        {/* Example Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Loading State Examples</Text>
          
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={basicLoading}
            disabled={loading}
          >
            {loading ? (
              <View style={styles.buttonLoading}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.buttonText}>Loading...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>1. Basic Loading State</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={loadingWithPlaceholder}
            disabled={loading}
          >
            <Text style={styles.buttonText}>2. Loading with Placeholder</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, buttonLoading && styles.buttonDisabled]}
            onPress={buttonLoadingExample}
            disabled={buttonLoading}
          >
            {buttonLoading ? (
              <View style={styles.buttonLoading}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.buttonText}>Loading...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>3. Button Loading State</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button]}
            onPress={multipleLoadingStates}
            disabled={loadingStates.posts || loadingStates.users || loadingStates.comments}
          >
            <Text style={styles.buttonText}>4. Multiple Loading States</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, refreshing && styles.buttonDisabled]}
            onPress={pullToRefresh}
            disabled={refreshing}
          >
            {refreshing ? (
              <View style={styles.buttonLoading}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.buttonText}>Refreshing...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>5. Pull to Refresh</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Multiple Loading States Display */}
        {(loadingStates.posts || loadingStates.users || loadingStates.comments) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Loading Progress</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>Posts</Text>
                {loadingStates.posts ? (
                  <ActivityIndicator size="small" color="#007AFF" />
                ) : (
                  <Text style={styles.progressCheck}>✓</Text>
                )}
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>Users</Text>
                {loadingStates.users ? (
                  <ActivityIndicator size="small" color="#007AFF" />
                ) : (
                  <Text style={styles.progressCheck}>✓</Text>
                )}
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>Comments</Text>
                {loadingStates.comments ? (
                  <ActivityIndicator size="small" color="#007AFF" />
                ) : (
                  <Text style={styles.progressCheck}>✓</Text>
                )}
              </View>
            </View>
          </View>
        )}

        {/* Result Display */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Result</Text>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Loading data...</Text>
            </View>
          )}
          {loading && (
            <View style={styles.skeletonContainer}>
              <View style={styles.skeletonLine} />
              <View style={[styles.skeletonLine, styles.skeletonLineShort]} />
              <View style={styles.skeletonLine} />
            </View>
          )}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error: {error}</Text>
            </View>
          )}
          {data && !loading && (
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>
                {JSON.stringify(data, null, 2)}
              </Text>
            </View>
          )}
          {!data && !loading && !error && (
            <Text style={styles.placeholder}>
              Click a button above to see loading states
            </Text>
          )}
        </View>

        {/* Code Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Loading State Pattern</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
{`const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);
const [error, setError] = useState(null);

const fetchData = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const response = await axios.get('https://api.example.com/data');
    setData(response.data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

// In render:
{loading && <ActivityIndicator />}
{error && <Text>Error: {error}</Text>}
{data && <Text>{JSON.stringify(data)}</Text>}`}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#007AFF',
  },
  listItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  buttonLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  skeletonContainer: {
    marginTop: 15,
  },
  skeletonLine: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 10,
  },
  skeletonLineShort: {
    width: '60%',
  },
  progressContainer: {
    gap: 10,
  },
  progressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#333',
  },
  progressCheck: {
    fontSize: 18,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  dataContainer: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dataText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#333',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f44336',
  },
  errorText: {
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: '600',
  },
  placeholder: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  codeContainer: {
    backgroundColor: '#2d2d2d',
    padding: 15,
    borderRadius: 6,
  },
  codeText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#f8f8f2',
    lineHeight: 18,
  },
});

export default LoadingStates;

