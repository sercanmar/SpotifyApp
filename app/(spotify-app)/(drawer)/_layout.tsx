
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawer from '@/presentation/theme/components/shared/CustomDrawer';

const DrawerLayout = () => {
  return (
    <Drawer 
    drawerContent={CustomDrawer}
    screenOptions={{
      headerShown: true, 
      drawerActiveTintColor: '#1DB954', // Vverde Spotify
      drawerInactiveTintColor: 'white',
      drawerStyle: {
        backgroundColor: '#121212', 
      }
    }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Inicio',
          drawerItemStyle: { display: 'none' },
          title: 'Inicio',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='home-outline' color={color} size={size} />
          )
        }}
      />
        
      <Drawer.Screen
        name="configuracion/index"
        options={{
          drawerLabel: 'Configuracion',
          title: 'Configuracion',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='settings-outline' color={color} size={size} />
          )
        }}
      />
       <Drawer.Screen
        name="perfil/index"
        options={{
          drawerLabel: 'Perfil',
          title: 'Perfil',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='person-outline' color={color} size={size} />
          )
        }}
      />

       <Drawer.Screen
        name="suscripciones/index"
        options={{
          drawerLabel: 'Suscripciones',
          title: 'Suscripciones',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='journal-outline' color={color} size={size} />
          )
        }}
      />
      
      
    </Drawer>
  );
}

export default DrawerLayout;