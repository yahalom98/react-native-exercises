import { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import FadeInView from '../components/FadeInView';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(false);

  return (
    <ScreenContainer>
      <FadeInView duration={350}>
        <SectionTitle>Settings (State Demo)</SectionTitle>
        <Text style={styles.helper}>
          This screen demonstrates basic local state with useState and Switch components.
        </Text>

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Dark mode</Text>
            <Text style={styles.subLabel}>This app uses a dark theme by design.</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor={darkMode ? '#6366f1' : '#e5e7eb'}
          />
        </View>

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Push notifications</Text>
            <Text style={styles.subLabel}>Fake toggle to showcase state changes.</Text>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            thumbColor={pushEnabled ? '#22c55e' : '#e5e7eb'}
          />
        </View>

        <Text style={styles.statePreview}>
          Dark mode: {darkMode ? 'ON' : 'OFF'} · Notifications: {pushEnabled ? 'ON' : 'OFF'}
        </Text>
      </FadeInView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  helper: {
    color: '#9ca3af',
    fontSize: 13,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#111827',
  },
  label: {
    color: '#e5e7eb',
    fontSize: 15,
    fontWeight: '500',
  },
  subLabel: {
    color: '#6b7280',
    fontSize: 12,
  },
  statePreview: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 20,
  },
});
