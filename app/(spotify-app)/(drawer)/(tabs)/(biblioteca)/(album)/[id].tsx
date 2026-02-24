import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { getCancionesAlbum } from '@/core/auth/actions/spotify.action';
import { ThemedText } from '@/presentation/theme/components/themed-text';
import React from 'react';
import { router } from 'expo-router';

export default function AlbumScreen() {
   const { id } = useLocalSearchParams();
  const idalbum = Array.isArray(id) ? id[0] : id;

  const { data: canciones, isLoading, isError } = useQuery({
    queryKey: ['album', idalbum], 
    queryFn: () => getCancionesAlbum(idalbum as string),
    enabled: !!idalbum,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>cargando playist...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">error al cargar album</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <Stack.Screen 
        options={{ 
          title: 'Album', 
          headerBackTitle: '',
          headerTintColor: 'white', 
          headerStyle: { backgroundColor: '#121212' } 
        }} 
      />

      <View className="px-5 flex-1">
        <ThemedText type='title' className="mb-6">Canciones</ThemedText>

        <FlatList
          data={canciones}
          keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View className="py-10 items-center">
              <Text className="text-white text-lg font-bold">no hay cancioes</Text>
            </View>
          )}
          renderItem={({ item, index }) => (
            <TouchableOpacity className="flex-row items-center mb-4 active:bg-zinc-800 p-2 rounded">
              
              <Text className="text-gray-400 mr-4 font-bold">{index + 1}</Text>

              <View className="flex-1">
           
                <Text className="text-white text-lg font-bold" numberOfLines={1}>{item.titulo}</Text>
              </View>

            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}