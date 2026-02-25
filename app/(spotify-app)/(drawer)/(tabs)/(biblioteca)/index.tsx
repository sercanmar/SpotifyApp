import { View, Text, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { 
  getPlaylistSeguidas, 
  getAlbumesSeguidos, 
  getCancionesSeguidas, 
  getPodcastsSeguidos, 
  getArtistasSeguidos 
} from '@/core/auth/actions/spotify.action';
import { router } from 'expo-router';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';

export default function BibliotecaScreen() {
  const { user } = useAuthStore();
  const userId = user?.id?.toString() || '0';
  
  const [filtro, setFiltro] = useState('playlists');

  const { data: playlists } = useQuery({
    queryKey: ['playlists', userId],
    queryFn: () => getPlaylistSeguidas(userId),
    enabled: !!user?.id,
  });

  const { data: albumes } = useQuery({
    queryKey: ['albumes', userId],
    queryFn: () => getAlbumesSeguidos(userId),
    enabled: !!user?.id,
  });

  const { data: canciones } = useQuery({
    queryKey: ['canciones', userId],
    queryFn: () => getCancionesSeguidas(userId),
    enabled: !!user?.id,
  });

  const { data: podcasts } = useQuery({
    queryKey: ['podcasts', userId],
    queryFn: () => getPodcastsSeguidos(userId),
    enabled: !!user?.id,
  });

  const { data: artistas } = useQuery({
    queryKey: ['artistas', userId],
    queryFn: () => getArtistasSeguidos(userId),
    enabled: !!user?.id,
  });

  const obtenerDatos = () => {
    if (filtro === 'albumes') return albumes;
    if (filtro === 'canciones') return canciones;
    if (filtro === 'podcasts') return podcasts;
    if (filtro === 'artistas') return artistas;

    if (filtro === 'playlists') {
      const listas = playlists || [];
      return [
        { id: 'megusta', titulo: 'Tus Me Gusta', numeroCanciones: 0, especial: true },
        ...listas
      ];
    }
    return [];
  };

  const renderItem = ({ item }: { item: any }) => {

    if (item.especial) {
      return (
         <Pressable className="flex-row items-center mb-5 active:bg-zinc-800 p-2 rounded-md"
      onPress={() => {
          if (filtro === 'playlists') {
            router.push(`/(biblioteca)/(canciones)/${item.id}` as any);
          }
        }}
        >
          <View className="w-16 h-16 bg-blue-600 justify-center items-center rounded-md">
            <Ionicons name="heart" size={30} color="white" />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-white text-lg font-bold">{item.titulo}</Text>
            <Text className="text-gray-400">canciones guardadas</Text>
          </View>
        </Pressable>
      );
    }

    const tituloItem = item.nombre ? item.nombre : item.titulo;
    
    let icono = "musical-notes";
    if (filtro === 'podcasts') icono = "mic";
    if (filtro === 'albumes') icono = "disc";
    if (filtro === 'artistas') icono = "person";

    return (
      <Pressable className="flex-row items-center mb-5 active:bg-zinc-800 p-2 rounded-md"
      onPress={() => {
          if (filtro === 'playlists') {
            router.push(`/(biblioteca)/(playlist)/${item.id}` as any);
          }
          if (filtro === 'podcasts') {
            router.push(`/(biblioteca)/(podcast)/${item.id}` as any);
          }
          if (filtro === 'albumes') {
            router.push(`/(biblioteca)/(album)/${item.id}` as any);
          }
          if (filtro === 'artistas') {
            router.push(`/(biblioteca)/(artista)/${item.id}` as any);
          }
        }}
        >
        <View className="w-16 h-16 bg-[#333333] justify-center items-center rounded-md">
          <Ionicons name={icono as any} size={30} color="white" />
        </View>
        <View className="ml-4 flex-1">
          <Text className="text-white text-lg font-bold">{tituloItem}</Text>
          <Text className="text-gray-400 capitalize">{filtro}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <View className="flex-1 px-5">
        
        <View className="flex-row items-center mb-5">
          <Text className="text-white text-3xl font-bold">Tu biblioteca</Text>
        </View>

        <View className="mb-6">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={['playlists', 'podcasts', 'albumes', 'artistas']}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setFiltro(item)}
                className={`px-4 py-2 rounded-full mr-3 ${filtro === item ? 'bg-[#1DB954]' : 'bg-[#333333]'}`}
              >
                <Text className={`capitalize font-bold ${filtro === item ? 'text-black' : 'text-white'}`}>
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>

        <FlatList
          data={obtenerDatos()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        
      </View>
    </SafeAreaView>
  );
}