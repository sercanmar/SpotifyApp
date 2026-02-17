import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#1DB954',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#000000',
        borderTopWidth: 0,
      },
      headerShown: false,
    }}>
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(busqueda)/index"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="search-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(biblioteca)/index"
        options={{
          title: 'Tu Biblioteca',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="library-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}

export default TabsLayout;