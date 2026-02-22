import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { getCancionesPlaylist } from '@/core/auth/actions/spotify.action';
import { ThemedText } from '@/presentation/theme/components/themed-text';

export default function PlaylistScreen() {
  const { id } = useLocalSearchParams();
  
  // coge el id de la url
  const playlistId = Array.isArray(id) ? id[0] : id;

  const { data: canciones, isLoading, isError } = useQuery({
    queryKey: ['cancionesPlaylist', playlistId], 
    queryFn: () => getCancionesPlaylist(playlistId as string),
    enabled: !!playlistId,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#121212]">
        <ActivityIndicator size="large" color="#1DB954" />
        <Text className="text-white mt-4">cargando canciones...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center bg-[#121212]">
        <Text className="text-red-500">error al cargar las canciones</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <Stack.Screen 
        options={{ 
          title: 'Playlist', 
          headerBackTitle: '',
          headerTintColor: 'white', 
          headerStyle: { backgroundColor: '#121212' } 
        }} 
      />

      <View className="px-5 pt-4 flex-1">
        <ThemedText type='title' className="mb-6">Canciones</ThemedText>

        <FlatList
          data={canciones}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity className="flex-row items-center mb-4 active:bg-zinc-800 p-2 rounded">
              
              <Text className="text-gray-400 mr-4 font-bold">{index + 1}</Text>

              <View className="flex-1">
                <Text className="text-white text-lg font-bold" numberOfLines={1}>{item.titulo}</Text>
                <Text className="text-gray-400 text-sm">{item.numeroReproducciones} reproducciones</Text>
              </View>

            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}