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
import axios from 'axios';

function ErrorHandling() {
  const [errorInfo, setErrorInfo] = useState(null);
  const [successInfo, setSuccessInfo] = useState(null);

  // Example 1: Basic error handling with try/catch
  const basicErrorHandling = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      setSuccessInfo('Request successful!');
      setErrorInfo(null);
    } catch (error) {
      setErrorInfo(`Error: ${error.message}`);
      setSuccessInfo(null);
    }
  };

  // Example 2: Handling different error types
  const detailedErrorHandling = async () => {
    try {
      // This will fail (404)
      await axios.get('https://jsonplaceholder.typicode.com/posts/99999');
    } catch (error) {
      if (error.response) {
        // Server responded with error status (4xx, 5xx)
        setErrorInfo({
          type: 'Response Error',
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        });
      } else if (error.request) {
        // Request made but no response received
        setErrorInfo({
          type: 'Request Error',
          message: 'No response from server',
          request: error.request,
        });
      } else {
        // Error setting up the request
        setErrorInfo({
          type: 'Setup Error',
          message: error.message,
        });
      }
      setSuccessInfo(null);
    }
  };

  // Example 3: Network error handling
  const networkErrorHandling = async () => {
    try {
      // This will fail (invalid URL)
      await axios.get('https://invalid-url-that-does-not-exist.com/api');
    } catch (error) {
      if (error.code === 'NETWORK_ERROR' || error.message.includes('Network')) {
        setErrorInfo({
          type: 'Network Error',
          message: 'Unable to connect to server. Check your internet connection.',
          code: error.code,
        });
      } else {
        setErrorInfo({
          type: 'Error',
          message: error.message,
        });
      }
      setSuccessInfo(null);
    }
  };

  // Example 4: Timeout error handling
  const timeoutErrorHandling = async () => {
    try {
      await axios.get('https://jsonplaceholder.typicode.com/posts/1', {
        timeout: 1, // 1ms timeout (will definitely fail)
      });
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        setErrorInfo({
          type: 'Timeout Error',
          message: 'Request took too long. Please try again.',
        });
      } else {
        setErrorInfo({
          type: 'Error',
          message: error.message,
        });
      }
      setSuccessInfo(null);
    }
  };

  // Example 5: User-friendly error messages
  const userFriendlyErrors = async () => {
    try {
      await axios.get('https://jsonplaceholder.typicode.com/posts/99999');
    } catch (error) {
      let userMessage = 'Something went wrong. Please try again.';
      
      if (error.response) {
        switch (error.response.status) {
          case 404:
            userMessage = 'The requested resource was not found.';
            break;
          case 401:
            userMessage = 'You are not authorized. Please log in.';
            break;
          case 403:
            userMessage = 'You do not have permission to access this resource.';
            break;
          case 500:
            userMessage = 'Server error. Please try again later.';
            break;
          default:
            userMessage = `Error: ${error.response.statusText}`;
        }
      } else if (error.request) {
        userMessage = 'Unable to connect to server. Check your internet connection.';
      }

      setErrorInfo({
        type: 'User-Friendly Error',
        message: userMessage,
        technical: error.message,
      });
      setSuccessInfo(null);
      
      Alert.alert('Error', userMessage);
    }
  };

  // Example 6: Retry logic
  const retryLogic = async (retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        setSuccessInfo(`Request succeeded on attempt ${i + 1}`);
        setErrorInfo(null);
        return;
      } catch (error) {
        if (i === retries - 1) {
          setErrorInfo({
            type: 'Retry Failed',
            message: `Failed after ${retries} attempts`,
            error: error.message,
          });
          setSuccessInfo(null);
        } else {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
  };

  // Example 7: Error boundary pattern (simulated)
  const errorBoundaryPattern = async () => {
    try {
      // Simulate an error
      throw new Error('Simulated error for demonstration');
    } catch (error) {
      // Log error (in real app, send to error tracking service)
      console.error('Error caught:', error);
      
      // Show user-friendly message
      setErrorInfo({
        type: 'Error Boundary',
        message: 'An unexpected error occurred. The app will continue to work.',
        logged: true,
      });
      setSuccessInfo(null);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Error Handling</Text>
        <Text style={styles.description}>
          Proper error handling is crucial for a good user experience.
          Always handle errors gracefully and provide meaningful feedback to users.
        </Text>

        {/* Best Practices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best Practices</Text>
          <Text style={styles.listItem}>✓ Always use try/catch with async/await</Text>
          <Text style={styles.listItem}>✓ Check error types (response, request, setup)</Text>
          <Text style={styles.listItem}>✓ Provide user-friendly error messages</Text>
          <Text style={styles.listItem}>✓ Log errors for debugging</Text>
          <Text style={styles.listItem}>✓ Handle network errors gracefully</Text>
          <Text style={styles.listItem}>✓ Implement retry logic for transient errors</Text>
        </View>

        {/* Example Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Error Handling Examples</Text>
          
          <TouchableOpacity style={styles.button} onPress={basicErrorHandling}>
            <Text style={styles.buttonText}>1. Basic Error Handling</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={detailedErrorHandling}>
            <Text style={styles.buttonText}>2. Detailed Error Types</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={networkErrorHandling}>
            <Text style={styles.buttonText}>3. Network Error Handling</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={timeoutErrorHandling}>
            <Text style={styles.buttonText}>4. Timeout Error Handling</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={userFriendlyErrors}>
            <Text style={styles.buttonText}>5. User-Friendly Messages</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={retryLogic}>
            <Text style={styles.buttonText}>6. Retry Logic</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={errorBoundaryPattern}>
            <Text style={styles.buttonText}>7. Error Boundary Pattern</Text>
          </TouchableOpacity>
        </View>

        {/* Result Display */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Result</Text>
          {successInfo && (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>✓ {successInfo}</Text>
            </View>
          )}
          {errorInfo && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorTitle}>{errorInfo.type || 'Error'}</Text>
              <Text style={styles.errorText}>
                {typeof errorInfo === 'string' 
                  ? errorInfo 
                  : JSON.stringify(errorInfo, null, 2)}
              </Text>
            </View>
          )}
          {!errorInfo && !successInfo && (
            <Text style={styles.placeholder}>
              Click a button above to see error handling in action
            </Text>
          )}
        </View>

        {/* Code Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Error Handling Pattern</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>
{`try {
  const response = await axios.get('https://api.example.com/data');
  // Handle success
  console.log(response.data);
} catch (error) {
  if (error.response) {
    // Server responded with error status
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  } else if (error.request) {
    // Request made but no response
    console.error('No response:', error.request);
  } else {
    // Error setting up request
    console.error('Error:', error.message);
  }
  
  // Show user-friendly message
  Alert.alert('Error', 'Something went wrong');
}`}
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    backgroundColor: '#e8f5e9',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4caf50',
  },
  successText: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f44336',
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#d32f2f',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#c62828',
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

export default ErrorHandling;



