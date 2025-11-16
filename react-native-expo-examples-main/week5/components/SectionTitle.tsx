import { Text, StyleSheet } from 'react-native';

export default function SectionTitle({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: '#e5e7eb',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 16,
  },
});
