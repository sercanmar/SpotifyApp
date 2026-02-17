import { Stack } from 'expo-router';
import 'react-native-reanimated';
import "./global.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const RootLayout = () => {
  return (

    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  )
}

export default RootLayout;