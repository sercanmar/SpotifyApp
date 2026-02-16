import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "./global.css";
import { Slot } from 'expo-router';
import { useColorScheme } from '@/presentation/theme/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};
<Stack screenOptions={{
    headerShown: false,
  }}>
</Stack>

const RootLayout = () => {
return <Slot/>;
}

 export default RootLayout;


