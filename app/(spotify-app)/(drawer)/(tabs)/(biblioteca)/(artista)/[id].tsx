import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { getArtistaAlbum } from '@/core/auth/actions/spotify.action';
import { ThemedText } from '@/presentation/theme/components/themed-text';
import React from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ArtistaScreen() {
  const { id } = useLocalSearchParams();
  const idartista = Array.isArray(id) ? id[0] : id;

  const { data: albumes, isLoading, isError } = useQuery({
    queryKey: ['artista', idartista], 
    queryFn: () => getArtistaAlbum(idartista as string),
    enabled: !!idartista,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>cargando artista...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">error al cargar artista</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <Stack.Screen 
        options={{ 
          title: 'Artista', 
          headerBackTitle: '',
          headerTintColor: 'white', 
          headerStyle: { backgroundColor: '#1DB954' } 
        }} 
      />
     
      <View className="px-5 flex-1 mt-2">
        <TouchableOpacity
          className="flex-row items-center mb-4"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        
        <ThemedText type='title' className="mb-4">Álbumes</ThemedText>

        <FlatList
          data={albumes}
          keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View className="py-10 items-center">
              <Text className="text-white text-lg font-bold">no hay álbumes</Text>
            </View>
          )}
          renderItem={({ item }) => (
            // te lleva al album al pulsar
            <TouchableOpacity 
              className="flex-row items-center mb-5 active:bg-zinc-800 p-2 rounded-md"
              onPress={() => router.push(`/(biblioteca)/(album)/${item.id}` as any)}
            >
              
              <View className="w-16 h-16 bg-[#333333] justify-center items-center rounded-md">
                <Ionicons name="disc" size={30} color="white" />
              </View>

              <View className="ml-4 flex-1">
                <Text className="text-white text-lg font-bold" numberOfLines={1}>{item.titulo}</Text>
                <Text className="text-gray-500">álbum</Text>
              </View>

            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}