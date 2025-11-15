import { useEffect, useState } from 'reactreact';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { fetchUsers } from '../lib/api';
import UserCard from '../components/UserCard';

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadUsers() {
    try {
      setLoading(true);
      setError('');
      const data = await fetchUsers();
      setUsers(data);
    } catch (e) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function openUserDetails(user) {
    router.push({
      pathname: '/user-details',
      params: {
        id: String(user.id),
        name: user.name,
        email: user.email,
      },
    });
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.loadingText}>Loading users...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.link} onPress={loadUsers}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <UserCard user={item} onPress={() => openUserDetails(item)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  center: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#9ca3af',
    marginTop: 8,
  },
  errorText: {
    color: '#f97373',
    marginBottom: 8,
  },
  link: {
    color: '#6366f1',
    textDecorationLine: 'underline',
  },
});
