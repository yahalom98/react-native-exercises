import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function UserDetailsScreen() {
  const params = useLocalSearchParams();
  const { id, name, email } = params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.label}>
        ID: <Text style={styles.value}>{id}</Text>
      </Text>
      <Text style={styles.label}>
        Email: <Text style={styles.value}>{email}</Text>
      </Text>
      <Text style={styles.hint}>
        This screen slid in using Stack animation: slide_from_right
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 24,
  },
  title: {
    color: '#e5e7eb',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  label: {
    color: '#9ca3af',
    fontSize: 16,
    marginBottom: 8,
  },
  value: {
    color: '#f9fafb',
    fontWeight: '600',
  },
  hint: {
    color: '#4b5563',
    marginTop: 24,
  },
});
