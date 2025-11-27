import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

function UseStateExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
  });
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  const updateUser = (field, value) => {
    setUser(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>useState Hook Examples</Text>

        {/* Counter Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Counter</Text>
          <Text style={styles.value}>Count: {count}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setCount(count - 1)}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setCount(0)}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setCount(count + 1)}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* String Input Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Text Input</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
          <Text style={styles.value}>Your name: {name || 'Not entered'}</Text>
        </View>

        {/* Boolean Toggle Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Boolean Toggle</Text>
          <TouchableOpacity
            style={[styles.button, isVisible && styles.buttonActive]}
            onPress={() => setIsVisible(!isVisible)}
          >
            <Text style={styles.buttonText}>
              {isVisible ? 'Hide' : 'Show'} Message
            </Text>
          </TouchableOpacity>
          {isVisible && (
            <Text style={styles.message}>This message is visible!</Text>
          )}
        </View>

        {/* Object State Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Object State</Text>
          <TextInput
            style={styles.input}
            value={user.firstName}
            onChangeText={(value) => updateUser('firstName', value)}
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            value={user.lastName}
            onChangeText={(value) => updateUser('lastName', value)}
            placeholder="Last Name"
          />
          <Text style={styles.value}>
            Full Name: {user.firstName} {user.lastName}
          </Text>
        </View>

        {/* Array State Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Array State</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={addItem}
          >
            <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
          <Text style={styles.value}>Items: {items.join(', ') || 'No items'}</Text>
          <Text style={styles.value}>Count: {items.length}</Text>
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
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  message: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default UseStateExample;

