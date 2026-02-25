import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { getCapitulosPodcast } from '@/core/auth/actions/spotify.action';
import { ThemedText } from '@/presentation/theme/components/themed-text';
import React from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PodcastScreen() {
   const { id } = useLocalSearchParams();
  const idpodcast = Array.isArray(id) ? id[0] : id;

  const { data: capitulos, isLoading, isError } = useQuery({
    queryKey: ['podcast', idpodcast], 
    queryFn: () => getCapitulosPodcast(idpodcast as string),
    enabled: !!idpodcast,
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
        <Text className="text-red-500">error al cargar podcast</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <Stack.Screen 
        options={{ 
          title: 'Podcast', 
          headerBackTitle: '',
          headerTintColor: 'white', 
          headerStyle: { backgroundColor: '#1DB954' } 
        }} 
      />
      <TouchableOpacity
                   className="flex-row items-center"
                   onPress={() => router.back()}
                 >
                   <Ionicons name="arrow-back" size={28} color="white" />
                 </TouchableOpacity>
              <ThemedText type='title' className="mb-6">Canciones</ThemedText>

      <View className="px-5 flex-1">
        <ThemedText type='title' className="mb-6">Capitulos</ThemedText>

        <FlatList
          data={capitulos}
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