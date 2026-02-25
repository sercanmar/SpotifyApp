import { View, Text, FlatList, ActivityIndicator, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { getArtistas } from '@/core/auth/actions/spotify.action';
import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';

export default function ArtistasScreen() {
  const { data: artistas, isLoading, isError } = useQuery({
    queryKey: ['todos-artistas'],
    queryFn: getArtistas,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#121212]">
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center bg-[#121212]">
        <Text className="text-red-500">error cargando artistas</Text>
      </View>
    );
  }

  const listaSegura = Array.isArray(artistas) ? artistas.slice(0, 20) : [];

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <Stack.Screen 
        options={{ 
          title: 'Artistas', 
          headerTintColor: 'white', 
          headerStyle: { backgroundColor: '#1DB954' } , 
          headerBackTitle: '' 
        }} 
      />

      <View className="px-5 pt-4 flex-1">
        <FlatList
          data={listaSegura}
          keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Pressable 
              className="flex-row items-center mb-5 active:bg-zinc-800 p-2 rounded-md"
              onPress={() => router.push(`/(biblioteca)/(artista)/${item?.id || index}` as any)}
            >
              <View className="w-16 h-16 bg-[#333333] justify-center items-center rounded-md">
                <Ionicons name="person" size={30} color="white" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-lg font-bold text-white" numberOfLines={1}>
                  {item?.nombre}
                </Text>
                <Text className="text-gray-500">artista</Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}