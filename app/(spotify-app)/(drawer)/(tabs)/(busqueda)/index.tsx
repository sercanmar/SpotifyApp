import { View, TextInput, Pressable, ScrollView, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/presentation/theme/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getArtistas, getAlbumes, getPlaylists, getPodcasts, getCanciones } from '@/core/auth/actions/spotify.action';
import BotonAnadir from '@/presentation/theme/components/shared/BotonAnadir';

export default function BusquedaScreen() {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const hacerBusqueda = async () => {
      if (busqueda.length < 3) {
        setResultados([]);
        return;
      }

      setCargando(true);
      try {
        const [artistas, albumes, playlists, podcasts, canciones] = await Promise.all([
          getArtistas(),
          getAlbumes(),
          getPlaylists(),
          getPodcasts(),
          getCanciones()
        ]);

        const texto = busqueda.toLowerCase();

        const mapArtistas = artistas.map((a: any) => ({ ...a, tipo: 'artista' }));
        const mapAlbumes = albumes.map((a: any) => ({ ...a, tipo: 'album' }));
        const mapPlaylists = playlists.map((p: any) => ({ ...p, tipo: 'playlist' }));
        const mapPodcasts = podcasts.map((p: any) => ({ ...p, tipo: 'podcast' }));
        const mapCanciones = canciones.map((c: any) => ({ ...c, tipo: 'cancion' }));

        const todoElCatalogo = [...mapArtistas, ...mapAlbumes, ...mapPlaylists, ...mapPodcasts, ...mapCanciones];

        const encontrados = todoElCatalogo.filter((item: any) => {
          const nombreItem = item.nombre || item.titulo || '';
          return nombreItem.toLowerCase().includes(texto);
        });

        setResultados(encontrados);
      } catch (error) {
        console.log('error al buscar', error);
      } finally {
        setCargando(false);
      }
    };

    hacerBusqueda();
  }, [busqueda]);

  const detalle = (item: any) => {
    let tipo = item.tipo || 'album';
    if (tipo === 'cancion') tipo = 'canciones';
    router.push(`/(biblioteca)/(${tipo})/${item.id}` as any);
  };

  const getIcono = (tipo: string) => {
    switch(tipo) {
      case 'artista': return 'person';
      case 'podcast': return 'mic';
      case 'playlist': return 'musical-notes';
      case 'cancion': return 'musical-notes';
      default: return 'disc';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <ScrollView className="flex-1 px-4">
        
        <ThemedText type='title' className="text-white">Buscar</ThemedText>
        <View className="flex-row items-center bg-white rounded-md px-3 py-2 mb-6 mt-4">
          <Ionicons name="search" size={24} color="black" />
          <TextInput
            className="flex-1 ml-2 text-black text-base"
            placeholder="¿Qué quieres escuchar?"
            placeholderTextColor="gray"
            value={busqueda}
            onChangeText={setBusqueda}
          />
        </View>

        {busqueda.length >= 3 ? (
          <View className="pb-10">
            <ThemedText className="text-white text-lg font-bold mb-4">Resultados</ThemedText>
            
            {cargando ? (
              <ActivityIndicator size="large" color="#1DB954" className="mt-4" />
            ) : resultados.length > 0 ? (
              resultados.map((item, index) => (
                <Pressable 
                  key={index} 
                  className="flex-row items-center mb-5 active:bg-zinc-800 p-2 rounded-md"
                  onPress={() => detalle(item)}
                >
                  <View className="w-16 h-16 bg-[#333333] justify-center items-center rounded-md">
                    <Ionicons name={getIcono(item.tipo) as any} size={30} color="white" />
                  </View>

                  <View className="ml-4 flex-1">
                    <Text className="text-white text-lg font-bold" numberOfLines={1}>
                      {item.nombre || item.titulo}
                    </Text>
                    <Text className="text-gray-500 capitalize">{item.tipo}</Text>
                  </View>

                  {item.tipo === 'cancion' && <BotonAnadir cancion={item} />}
                  
                </Pressable>
              ))
            ) : (
              <Text className="text-gray-400 text-center mt-4 text-base">no se encontraron resultados</Text>
            )}
          </View>
        ) : (
          <View>
            <ThemedText className="text-white text-lg font-bold mb-4">Explorar todo</ThemedText>

            <View className="flex-row flex-wrap justify-between">
              <Pressable 
                className="w-[47%] bg-red-600 h-24 rounded-md p-3 mb-4"
                onPress={() => router.push('/(busqueda)/artistas' as any)}
              >
                <ThemedText className="text-white font-bold text-lg">Artistas</ThemedText>
              </Pressable>

              <Pressable 
                className="w-[47%] bg-blue-800 h-24 rounded-md p-3 mb-4"
                onPress={() => router.push('/(busqueda)/albumes' as any)}
              >
                <ThemedText className="text-white font-bold text-lg">Álbumes</ThemedText>
              </Pressable>

              <Pressable 
                className="w-[47%] bg-purple-600 h-24 rounded-md p-3 mb-4"
                onPress={() => router.push('/(busqueda)/playlists' as any)}
              >
                <ThemedText className="text-white font-bold text-lg">Playlists</ThemedText>
              </Pressable>

              <Pressable 
                className="w-[47%] bg-green-700 h-24 rounded-md p-3 mb-4"
                onPress={() => router.push('/(busqueda)/podcasts' as any)}
              >
                <ThemedText className="text-white font-bold text-lg">Podcasts</ThemedText>
              </Pressable>
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}