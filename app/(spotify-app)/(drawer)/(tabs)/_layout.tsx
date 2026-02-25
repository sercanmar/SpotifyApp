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
        elevation: 0, 
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
       <Tabs.Screen
        name="(anyadir)/index"
        options={{
          title: 'Añadir',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="add-circle-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(biblioteca)/(playlist)/index"
        options={{
          title: 'Añadir',
          
          tabBarIcon: ({ color }) => <Ionicons size={28} name="add-circle-outline" color={color} />,
        }}
      />

   <Tabs.Screen
        name="(biblioteca)/(capitulo)/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="(biblioteca)/(playlist)/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="(biblioteca)/(album)/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="(biblioteca)/(podcast)/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="(biblioteca)/(artista)/[id]"
        options={{ href: null }}
      />
       <Tabs.Screen
        name="(biblioteca)/(canciones)/[id]"
        options={{ href: null }}
      />
       <Tabs.Screen
        name="(busqueda)/album/[id]"
        options={{ href: null }}
      />
       <Tabs.Screen
        name="(busqueda)/albumes/index"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="(busqueda)/artistas/index"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="(busqueda)/artista/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="(busqueda)/playlist/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="(busqueda)/capitulo/[id]"
        options={{ href: null }}
      />
       <Tabs.Screen
        name="(busqueda)/playlists/index"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="(busqueda)/podcast/[id]"
        options={{ href: null }}
      />
       <Tabs.Screen
        name="(busqueda)/podcasts/index"
        options={{ href: null }}
      />
    </Tabs>
    
  );
}

export default TabsLayout;