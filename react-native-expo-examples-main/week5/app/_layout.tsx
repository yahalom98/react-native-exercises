import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#020617' },
        headerTintColor: '#f9fafb',
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: { backgroundColor: '#020617' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Week 5 Home', animation: 'fade_from_bottom' }} />
      <Stack.Screen name="users" options={{ title: 'Users', animation: 'slide_from_right' }} />
      <Stack.Screen name="user-details" options={{ title: 'User Details', animation: 'slide_from_right' }} />
      <Stack.Screen name="about" options={{ title: 'About Week 5', animation: 'fade_from_bottom' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings', animation: 'simple_push' }} />
      <Stack.Screen name="modal" options={{ title: 'Modal Demo', presentation: 'modal', animation: 'fade' }} />
    </Stack>
  );
}
