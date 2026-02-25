import { Stack } from 'expo-router';
import 'react-native-reanimated';
import "./global.css";
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';
import { useColorScheme } from '@/presentation/theme/hooks/use-color-scheme.web';
import { StatusBar } from 'expo-status-bar';

const queryClient = new QueryClient();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{
      flex: 1,
      backgroundColor: '#121212' 
    }}>
      <ThemeProvider value={DarkTheme}> 
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ 
            headerShown: false,
            contentStyle: { backgroundColor: '#121212' } 
          }} />
        </QueryClientProvider>
        <StatusBar style="light" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}



