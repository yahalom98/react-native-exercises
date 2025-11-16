import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function UserCard({ user, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.meta}>{user.username} · {user.address?.city}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#020617',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#111827',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  name: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    color: '#9ca3af',
    fontSize: 13,
    marginBottom: 2,
  },
  meta: {
    color: '#6b7280',
    fontSize: 12,
  },
});
