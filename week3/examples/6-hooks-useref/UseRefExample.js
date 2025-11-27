import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

function UseRefExample() {
  // Ref for accessing TextInput
  const inputRef = useRef(null);
  
  // Ref for storing previous value
  const prevCountRef = useRef();
  const [count, setCount] = useState(0);
  
  // Ref for interval ID
  const intervalRef = useRef(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // Ref for tracking render count
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  // Update previous count value
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  // Timer using ref
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const clearInput = () => {
    inputRef.current?.clear();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>useRef Hook Examples</Text>

        {/* Example 1: Accessing DOM/Native Elements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Accessing TextInput with Ref</Text>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Click buttons below to control this input"
            placeholderTextColor="#999"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={focusInput}
            >
              <Text style={styles.buttonText}>Focus Input</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={clearInput}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Clear Input</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Example 2: Storing Previous Values */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Storing Previous Values</Text>
          <Text style={styles.value}>Current Count: {count}</Text>
          <Text style={styles.value}>
            Previous Count: {prevCountRef.current ?? 'N/A'}
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

        {/* Example 3: Storing Mutable Values */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Storing Interval ID (Mutable Value)</Text>
          <Text style={styles.value}>Timer: {timer} seconds</Text>
          <Text style={styles.hint}>
            The interval ID is stored in a ref, not state, so it doesn't cause re-renders
          </Text>
          <TouchableOpacity
            style={[styles.button, isRunning && styles.buttonStop]}
            onPress={() => setIsRunning(!isRunning)}
          >
            <Text style={styles.buttonText}>
              {isRunning ? 'Stop' : 'Start'} Timer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => {
              setTimer(0);
              setIsRunning(false);
            }}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Example 4: Tracking Render Count */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Tracking Render Count</Text>
          <Text style={styles.value}>
            Component has rendered {renderCountRef.current} times
          </Text>
          <Text style={styles.hint}>
            This count is stored in a ref, so updating it doesn't cause re-renders
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCount(count + 1)}
          >
            <Text style={styles.buttonText}>Force Re-render</Text>
          </TouchableOpacity>
        </View>

        {/* Key Points */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Points about useRef:</Text>
          <Text style={styles.hint}>
            • Refs don't cause re-renders when their value changes{'\n'}
            • Refs persist across re-renders{'\n'}
            • Use refs to access DOM/native elements{'\n'}
            • Use refs to store mutable values that don't need to trigger renders{'\n'}
            • Use refs to store previous values
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
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

export default UseRefExample;

