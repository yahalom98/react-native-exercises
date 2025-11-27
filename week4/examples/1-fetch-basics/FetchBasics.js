import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

function FetchBasics() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Example 1: Basic GET request
  const fetchBasicData = () => {
    // Using the JSONPlaceholder API (free fake REST API)
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        // Check if response is ok (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse JSON response
        return response.json();
      })
      .then(json => {
        setData(json);
        setError(null);
        console.log('Data fetched:', json);
      })
      .catch(err => {
        setError(err.message);
        setData(null);
        console.error('Fetch error:', err);
      });
  };

  // Example 2: GET request with query parameters
  const fetchWithParams = () => {
    const userId = 1;
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .then(json => {
        setData({ posts: json, count: json.length });
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setData(null);
      });
  };

  // Example 3: POST request
  const postData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'My New Post',
        body: 'This is the content of my post',
        userId: 1,
      }),
    })
      .then(response => response.json())
      .then(json => {
        setData(json);
        setError(null);
        Alert.alert('Success', 'Post created successfully!');
      })
      .catch(err => {
        setError(err.message);
        setData(null);
      });
  };

  // Example 4: PUT request (update)
  const updateData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
        title: 'Updated Post Title',
        body: 'Updated content',
        userId: 1,
      }),
    })
      .then(response => response.json())
      .then(json => {
        setData(json);
        setError(null);
        Alert.alert('Success', 'Post updated successfully!');
      })
      .catch(err => {
        setError(err.message);
        setData(null);
      });
  };

  // Example 5: DELETE request
  const deleteData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setData({ message: 'Post deleted successfully' });
          setError(null);
          Alert.alert('Success', 'Post deleted successfully!');
        } else {
          throw new Error('Delete failed');
        }
      })
      .catch(err => {
        setError(err.message);
        setData(null);
      });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Fetch API Basics</Text>
        <Text style={styles.description}>
          The Fetch API is a modern way to make HTTP requests in JavaScript.
          It returns a Promise that resolves to the Response object.
        </Text>

        {/* Example Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HTTP Methods</Text>
          
          <TouchableOpacity style={styles.button} onPress={fetchBasicData}>
            <Text style={styles.buttonText}>1. GET Request</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={fetchWithParams}>
            <Text style={styles.buttonText}>2. GET with Query Params</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={postData}>
            <Text style={styles.buttonText}>3. POST Request</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={updateData}>
            <Text style={styles.buttonText}>4. PUT Request</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={deleteData}>
            <Text style={styles.buttonText}>5. DELETE Request</Text>
          </TouchableOpacity>
        </View>

        {/* Response Display */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Response</Text>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error: {error}</Text>
            </View>
          )}
          {data && (
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>
                {JSON.stringify(data, null, 2)}
              </Text>
            </View>
          )}
          {!data && !error && (
            <Text style={styles.placeholder}>
              Click a button above to make a request
            </Text>
          )}
        </View>

        {/* Code Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Syntax</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
{`fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });`}
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
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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

export default FetchBasics;



