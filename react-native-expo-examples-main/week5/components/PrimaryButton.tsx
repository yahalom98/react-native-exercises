import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PrimaryButton({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 16,
  },
  label: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '600',
  },
});
