import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { router } from 'expo-router';
import PrimaryButton from '../components/PrimaryButton';

export default function Index() {
  function goToUsers() {
    router.push('/users');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.title}>Week 5 – React Native Basics</Text>
        <Text style={styles.subtitle}>
          Styling, components, navigation & API calls
        </Text>
        <PrimaryButton label="Go to Users" onPress={goToUsers} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#e5e7eb',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 14,
    textAlign: 'center',
  },
});
