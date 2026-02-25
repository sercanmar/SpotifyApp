import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native"
import {LogoutIconButton} from '@/presentation/auth/components/LogoutIconButton'
const CheckAuthenticationLayout = () => {

    const { status, checkStatus } = useAuthStore();
    const backgroundColor = useThemeColor({}, 'background');

    useEffect(() => {
        checkStatus();

    }, []);

    if (status === 'checking') {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                <ActivityIndicator />
            </View>
        );
    }

    if (status === 'unauthenticated') {
        // TODO: Guardar la ruta del usuario desde la que accede para redirigirle después de loguearse
        return <Redirect href="/auth/login" />;
    }
    

   return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: '#121212', 
                },
                headerTintColor: '#FFFFFF', 
                contentStyle: {
                    backgroundColor: '#121212', 
                }
            }}>
            <Stack.Screen 
                name="(drawer)" 
                options={{ 
                    headerShown: false 
                }} 
            />
        </Stack>
    )
}

export default CheckAuthenticationLayout

