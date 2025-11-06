import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';

function ConditionalRenderingExample() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('guest');
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setUserRole('user');
      setIsLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('guest');
    setItems([]);
    setShowDetails(false);
  };

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  // Example 1: If/Else with early return
  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }

    if (!isLoggedIn) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.message}>Please log in to continue</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.centerContainer}>
        <Text style={styles.welcomeText}>Welcome! You are logged in.</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Conditional Rendering Examples</Text>

        {/* Example 1: If/Else with function */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. If/Else with Function</Text>
          {renderContent()}
        </View>

        {/* Example 2: Ternary Operator */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Ternary Operator</Text>
          <Text style={styles.value}>
            Status: {isLoggedIn ? 'Logged In' : 'Logged Out'}
          </Text>
          <Text style={styles.value}>
            Role: {userRole === 'admin' ? 'Administrator' : userRole === 'user' ? 'User' : 'Guest'}
          </Text>
        </View>

        {/* Example 3: Logical AND (&&) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Logical AND (&&)</Text>
          {isLoggedIn && (
            <View>
              <Text style={styles.value}>This message only shows when logged in!</Text>
              <TouchableOpacity style={styles.button} onPress={addItem}>
                <Text style={styles.buttonText}>Add Item</Text>
              </TouchableOpacity>
            </View>
          )}
          {items.length > 0 && (
            <View style={styles.itemsContainer}>
              <Text style={styles.value}>Items:</Text>
              {items.map((item, index) => (
                <Text key={index} style={styles.itemText}>• {item}</Text>
              ))}
            </View>
          )}
        </View>

        {/* Example 4: Multiple Conditions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Multiple Conditions</Text>
          {userRole === 'admin' && (
            <View style={styles.adminContainer}>
              <Text style={styles.adminText}>🔑 Admin Panel</Text>
              <Text style={styles.hint}>Only admins see this</Text>
            </View>
          )}
          {(userRole === 'admin' || userRole === 'user') && (
            <View style={styles.userContainer}>
              <Text style={styles.userText}>👤 User Dashboard</Text>
              <Text style={styles.hint}>Admins and users see this</Text>
            </View>
          )}
          <View style={styles.guestContainer}>
            <Text style={styles.guestText}>👁️ Guest View</Text>
            <Text style={styles.hint}>Everyone sees this</Text>
          </View>
        </View>

        {/* Example 5: Conditional Styling */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Conditional Styling</Text>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              showDetails && styles.toggleButtonActive,
            ]}
            onPress={() => setShowDetails(!showDetails)}
          >
            <Text
              style={[
                styles.toggleButtonText,
                showDetails && styles.toggleButtonTextActive,
              ]}
            >
              {showDetails ? 'Hide' : 'Show'} Details
            </Text>
          </TouchableOpacity>
          {showDetails && (
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsText}>
                This is a detailed view that appears conditionally.
              </Text>
              <Text style={styles.detailsText}>
                You can show/hide content based on state.
              </Text>
            </View>
          )}
        </View>

        {/* Example 6: Null/Undefined Handling */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Null/Undefined Handling</Text>
          <Text style={styles.value}>
            Items count: {items.length || 'No items'}
          </Text>
          <Text style={styles.value}>
            {items.length > 0 ? `You have ${items.length} item(s)` : 'Your list is empty'}
          </Text>
        </View>
      </View>
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
  centerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 15,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    minWidth: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  itemsContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  adminContainer: {
    backgroundColor: '#FFE5E5',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  adminText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  userContainer: {
    backgroundColor: '#E5F3FF',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  userText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  guestContainer: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  guestText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
  toggleButton: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#4CAF50',
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  toggleButtonTextActive: {
    color: '#fff',
  },
  detailsContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
  },
  detailsText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
});

export default ConditionalRenderingExample;

