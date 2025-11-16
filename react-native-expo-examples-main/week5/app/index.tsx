import { Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import FadeInView from '../components/FadeInView';

export default function IndexScreen() {
  return (
    <ScreenContainer>
      <FadeInView duration={500}>
        <Text style={styles.badge}>WEEK 5</Text>
        <Text style={styles.title}>React Native Basics</Text>
        <Text style={styles.subtitle}>
          Styling, components, navigation, API calls, and simple animations with Expo.
        </Text>

        <SectionTitle>Start Here</SectionTitle>
        <PrimaryButton label="Go to Users (API + List)" onPress={() => router.push('/users')} />
        <SecondaryButton label="About this Week" onPress={() => router.push('/about')} />

        <SectionTitle>More Screens</SectionTitle>
        <SecondaryButton label="Settings (state demo)" onPress={() => router.push('/settings')} />
        <SecondaryButton label="Open Modal Demo" onPress={() => router.push('/modal')} />
      </FadeInView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#111827',
    color: '#9ca3af',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
    marginBottom: 8,
  },
  title: {
    color: '#e5e7eb',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 16,
  },
});
