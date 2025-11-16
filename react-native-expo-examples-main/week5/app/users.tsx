import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import InputField from '../components/InputField';
import UserCard from '../components/UserCard';
import { fetchUsers } from '../lib/api';

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  async function loadUsers(isRefresh) {
    try {
      if (!isRefresh) {
        setLoading(true);
      }
      setError('');
      const data = await fetchUsers();
      setUsers(data);
      setDisplayUsers(data);
    } catch (e) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadUsers(false);
  }, []);

  useEffect(() => {
    if (!search) {
      setDisplayUsers(users);
      return;
    }
    const lower = search.toLowerCase();
    const filtered = users.filter(u =>
      u.name.toLowerCase().includes(lower) ||
      u.email.toLowerCase().includes(lower)
    );
    setDisplayUsers(filtered);
  }, [search, users]);

  function onRefresh() {
    setRefreshing(true);
    loadUsers(true);
  }

  function openUserDetails(user) {
    router.push({
      pathname: '/user-details',
      params: {
        id: String(user.id),
        name: user.name,
        email: user.email,
        city: user.address?.city || '',
        username: user.username || '',
      },
    });
  }

  if (loading) {
    return (
      <ScreenContainer>
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={styles.helper}>Loading users...</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer>
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.link} onPress={() => loadUsers(false)}>
            Tap to retry
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <SectionTitle>Users from API</SectionTitle>
      <Text style={styles.helper}>
        This screen demonstrates axios, useEffect, loading/error states, FlatList and pull-to-refresh.
      </Text>

      <InputField
        label="Search"
        placeholder="Search by name or email"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={displayUsers}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <UserCard user={item} onPress={() => openUserDetails(item)} />
        )}
        contentContainerStyle={{ paddingVertical: 12 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#e5e7eb" />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No users match this search.</Text>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helper: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 8,
    marginBottom: 4,
  },
  errorText: {
    color: '#f97373',
    marginBottom: 8,
  },
  link: {
    color: '#6366f1',
    textDecorationLine: 'underline',
  },
  emptyText: {
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 16,
  },
});
