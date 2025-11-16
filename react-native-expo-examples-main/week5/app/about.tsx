import { Text, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';

export default function AboutScreen() {
  return (
    <ScreenContainer scrollable>
      <Text style={styles.badge}>Overview</Text>
      <Text style={styles.title}>Week 5 – React Native Basics</Text>
      <Text style={styles.subtitle}>
        This screen is a static page that explains what students practice in this example.
      </Text>

      <SectionTitle>What They Learn</SectionTitle>
      <Text style={styles.paragraph}>
        • Styling with StyleSheet and flexbox{'
'}
        • Layout with SafeAreaView and StatusBar{'
'}
        • Reusable components (buttons, inputs, cards){'
'}
        • File-based routing with Expo Router{'
'}
        • Stack navigation animations and a modal screen{'
'}
        • Fetching data from an API using axios{'
'}
        • Search, pull-to-refresh, and list rendering with FlatList{'
'}
        • Simple animations using Animated and FadeInView
      </Text>

      <SectionTitle>How to Use in Class</SectionTitle>
      <Text style={styles.paragraph}>
        You can start the lesson from the Home screen, walk through each page, and then gradually
        comment out or remove pieces of code to let students rebuild them:
        header options, navigation, API calls, animations, and so on.
      </Text>

      <SectionTitle>Suggested Flow</SectionTitle>
      <Text style={styles.paragraph}>
        1. Show the final app.{'
'}
        2. Rebuild the Home screen styling.{'
'}
        3. Add navigation and see transitions.{'
'}
        4. Implement the Users screen with API.{'
'}
        5. Add search and pull-to-refresh.{'
'}
        6. Add User Details with params and FadeInView.{'
'}
        7. Finish with Settings state and the modal demo.
      </Text>
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
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 12,
  },
  paragraph: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 10,
  },
});
