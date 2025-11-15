import { View, Text, StyleSheet } from 'react-native';

export default function UserCard({ user, onPress }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name} onPress={onPress}>
        {user.name}
      </Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.city}>{user.address?.city}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#020617',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  name: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 2,
  },
  city: {
    color: '#4b5563',
    fontSize: 12,
  },
});
