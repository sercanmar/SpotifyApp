import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '@/presentation/theme/components/themed-text';
import { ThemedView } from '@/presentation/theme/components/themed-view';
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

export default function BibliotecaScreen() {
  // guarda el boton pulsado
  const [filtro, setFiltro] = useState('playlists');

  const { data: playlists, isLoading: loadPlaylists } = useQuery({
    queryKey: ['playlists'],
    queryFn: getPlaylistSeguidas,
  });

  const { data: albumes, isLoading: loadAlbumes } = useQuery({
    queryKey: ['albumes'],
    queryFn: getAlbumesSeguidos,
  });

  const { data: canciones, isLoading: loadCanciones } = useQuery({
    queryKey: ['canciones'],
    queryFn: getCancionesSeguidas,
  });

  const { data: podcasts, isLoading: loadPodcasts } = useQuery({
    queryKey: ['podcasts'],
    queryFn: getPodcastsSeguidos,
  });

  const { data: artistas, isLoading: loadArtistas } = useQuery({
    queryKey: ['artistas'],
    queryFn: getArtistasSeguidos,
  });

  // elige que lista devolver
  const obtenerDatos = () => {
    if (filtro === 'albumes') return albumes;
    if (filtro === 'canciones') return canciones;
    if (filtro === 'podcasts') return podcasts;
    if (filtro === 'artistas') return artistas;

    if (filtro === 'playlists') {
      const listas = playlists || [];
      return [
        { id: 'megusta', titulo: 'tus me gusta', numeroCanciones: 0, especial: true },
        ...listas
      ];
    }
    return [];
  };


  if (loadPlaylists || loadAlbumes || loadCanciones || loadPodcasts || loadArtistas) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: any }) => {
    // pinta la tarjeta azul de me gusta
    if (item.especial) {
      return (
        <Pressable className="flex-row items-center mb-5">
          <View className="w-16 h-16 bg-blue-600 justify-center items-center rounded-md">
            <Ionicons name="heart" size={30} color="white" />
          </View>
          <View className="ml-4">
            <ThemedText className="text-lg font-bold">{item.titulo}</ThemedText>
            <ThemedText className="text-gray-500">canciones guardadas</ThemedText>
          </View>
        </Pressable>
      );
    }

    // saca el nombre si no tiene titulo
    const tituloItem = item.nombre ? item.nombre : item.titulo;
    
    let icono = "musical-notes";
    let contenedorClase = "w-16 h-16 bg-[#333333] justify-center items-center rounded-md";
    
    // cambia el icono y pone borde redondo si es artista
    if (filtro === 'artistas') {
      icono = "person";
      contenedorClase = "w-16 h-16 bg-[#333333] justify-center items-center rounded-full";
    } else if (filtro === 'podcasts') {
      icono = "mic";
    }

    return (
      <Pressable className="flex-row items-center mb-5">
        <View className={contenedorClase}>
          <Ionicons name={icono as any} size={30} color="white" />
        </View>
        <View className="ml-4">
          <ThemedText className="text-lg font-bold">{tituloItem}</ThemedText>
          <ThemedText className="text-gray-500">{filtro}</ThemedText>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <ThemedView className="flex-1 px-5 pt-5">
        
        <View className="flex-row items-center mb-5">
          <ThemedText type='title'>Tu biblioteca</ThemedText>
        </View>

        {/* lista de botones de arriba */}
        <View className="mb-5">
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
        
      </ThemedView>
    </SafeAreaView>
  );
}