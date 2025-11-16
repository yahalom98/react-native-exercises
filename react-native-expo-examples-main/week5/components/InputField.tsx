import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function InputField({ label, placeholder, value, onChangeText }) {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#6b7280"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  label: {
    color: '#9ca3af',
    fontSize: 13,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#e5e7eb',
    fontSize: 14,
  },
});
