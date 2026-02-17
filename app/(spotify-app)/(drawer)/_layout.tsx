
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawer from '@/presentation/theme/components/shared/CustomDrawer';

const DrawerLayout = () => {
  return (
    <Drawer 
    drawerContent={CustomDrawer}
    screenOptions={{
      headerShown: false, 
      drawerActiveTintColor: '#1DB954', // Vverde Spotify
      drawerInactiveTintColor: 'white',
      drawerStyle: {
        backgroundColor: '#121212', 
      }
    }}>
        
      <Drawer.Screen
        name="configuracion/index"
        options={{
          drawerLabel: 'Configuracion',
          title: 'Configuracion',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='home-outline' color={color} size={size} />
          )
        }}
      />
      
      {/* "Configuración" "Perfil" */}
    </Drawer>
  );
}

export default DrawerLayout;