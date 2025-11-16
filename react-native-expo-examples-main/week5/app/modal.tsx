import { Text, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';

export default function ModalScreen() {
  return (
    <ScreenContainer>
      <View style={styles.modal}>
        <Text style={styles.title}>Modal Presentation</Text>
        <Text style={styles.subtitle}>
          This screen is presented as a modal using Stack presentation="modal" and fade animation.
        </Text>
        <PrimaryButton label="Close" onPress={() => router.back()} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#020617',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#111827',
    marginTop: 40,
  },
  title: {
    color: '#e5e7eb',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 16,
  },
});
