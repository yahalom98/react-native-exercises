import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

function UseEffectExample() {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Example 1: Effect that runs on every render
  useEffect(() => {
    console.log('Component rendered!');
  });

  // Example 2: Effect that runs only once (on mount)
  useEffect(() => {
    console.log('Component mounted!');
    return () => {
      console.log('Component will unmount!');
    };
  }, []);

  // Example 3: Effect that runs when count changes
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
  }, [count]);

  // Example 4: Timer effect
  useEffect(() => {
    let interval = null;
    
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }

    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerRunning]);

  // Example 5: Fetching data (simulated)
  const fetchData = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setData({
        message: 'Data fetched successfully!',
        timestamp: new Date().toLocaleTimeString(),
      });
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    // This could be an API call on mount
    // fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>useEffect Hook Examples</Text>

        {/* Counter Example with Effect */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Effect on State Change</Text>
          <Text style={styles.value}>Count: {count}</Text>
          <Text style={styles.hint}>
            Check console to see effect logs when count changes
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setCount(count - 1)}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setCount(count + 1)}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Timer Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Timer with useEffect</Text>
          <Text style={styles.value}>Timer: {timer} seconds</Text>
          <TouchableOpacity
            style={[styles.button, isTimerRunning && styles.buttonStop]}
            onPress={() => setIsTimerRunning(!isTimerRunning)}
          >
            <Text style={styles.buttonText}>
              {isTimerRunning ? 'Stop' : 'Start'} Timer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => {
              setTimer(0);
              setIsTimerRunning(false);
            }}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Data Fetching Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Simulated Data Fetching</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : data ? (
            <View>
              <Text style={styles.value}>{data.message}</Text>
              <Text style={styles.hint}>Fetched at: {data.timestamp}</Text>
            </View>
          ) : (
            <Text style={styles.value}>No data loaded</Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={fetchData}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Loading...' : 'Fetch Data'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cleanup Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Cleanup Function</Text>
          <Text style={styles.hint}>
            The timer above uses cleanup to clear intervals when component
            unmounts or timer stops. Check console for cleanup logs.
          </Text>
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
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
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
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#007AFF',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonStop: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
});

export default UseEffectExample;

