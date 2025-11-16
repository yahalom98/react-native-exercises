import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SecondaryButton({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#4b5563',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  label: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '500',
  },
});
