import { ReactNode } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, ScrollView } from 'react-native';

export default function ScreenContainer({ children, scrollable }) {
  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#020617',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
  },
});
