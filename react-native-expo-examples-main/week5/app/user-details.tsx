import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import FadeInView from '../components/FadeInView';

export default function UserDetailsScreen() {
  const params = useLocalSearchParams();
  const { id, name, email, city, username } = params;

  return (
    <ScreenContainer>
      <FadeInView duration={350}>
        <SectionTitle>User Details</SectionTitle>
        <View style={styles.card}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.value}>{username}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{email}</Text>

          <Text style={styles.label}>City</Text>
          <Text style={styles.value}>{city}</Text>

          <Text style={styles.id}>ID: {id}</Text>
        </View>
        <Text style={styles.hint}>
          This screen fades in using the Animated API (FadeInView) and slides in via stack animation.
        </Text>
      </FadeInView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#020617',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#111827',
    marginTop: 4,
  },
  name: {
    color: '#e5e7eb',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  label: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 6,
  },
  value: {
    color: '#e5e7eb',
    fontSize: 14,
  },
  id: {
    color: '#4b5563',
    fontSize: 12,
    marginTop: 12,
  },
  hint: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 16,
  },
});
