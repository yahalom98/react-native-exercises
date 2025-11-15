import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#f9fafb',
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: { backgroundColor: '#020617' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="users"
        options={{ title: 'Users' }}
      />
      <Stack.Screen
        name="user-details"
        options={{ title: 'User Details' }}
      />
    </Stack>
  );
}
