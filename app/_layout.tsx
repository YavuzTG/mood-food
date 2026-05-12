import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  initialRouteName: 'screens/home',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name="screens/home" 
          options={{ 
            headerShown: false,
            title: 'Mood Food'
          }} 
        />
        <Stack.Screen 
          name="screens/mood-select" 
          options={{ 
            headerShown: false,
            animationEnabled: true
          }} 
        />
        <Stack.Screen 
          name="screens/budget" 
          options={{ 
            headerShown: false,
            animationEnabled: true
          }} 
        />
        <Stack.Screen 
          name="screens/choice" 
          options={{ 
            headerShown: false,
            animationEnabled: true
          }} 
        />
        <Stack.Screen 
          name="screens/create-recipe" 
          options={{ 
            headerShown: false,
            animationEnabled: true
          }} 
        />
        <Stack.Screen 
          name="screens/recommendations/order" 
          options={{ 
            headerShown: false,
            animationEnabled: true
          }} 
        />
        <Stack.Screen 
          name="screens/recommendations/dine-out" 
          options={{ 
            headerShown: false,
            animationEnabled: true
          }} 
        />
        <Stack.Screen 
          name="screens/recommendations/recipes" 
          options={{ 
            headerShown: false,
            animationEnabled: true
          }} 
        />
        <Stack.Screen 
          name="screens/recommendations/order-detail" 
          options={{ 
            headerShown: false,
            animationEnabled: true
          }} 
        />
        <Stack.Screen 
          name="screens/recommendations/dine-out-detail" 
          options={{ 
            headerShown: false,
            animationEnabled: true
          }} 
        />
        <Stack.Screen 
          name="screens/recommendations/recipe-detail" 
          options={{ 
            headerShown: false,
            animationEnabled: true
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
