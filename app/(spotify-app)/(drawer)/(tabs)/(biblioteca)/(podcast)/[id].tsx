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
        <Text>cargando podcast...</Text>
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
      
      <View className="px-5 flex-1 mt-2">
        <TouchableOpacity
          className="flex-row items-center mb-4"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>

        <ThemedText type='title' className="mb-4">Capítulos</ThemedText>

        <FlatList
          data={capitulos}
          keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View className="py-10 items-center">
              <Text className="text-white text-lg font-bold">no hay capítulos</Text>
            </View>
          )}
          renderItem={({ item }) => (
           <TouchableOpacity className="flex-row items-center mb-5 active:bg-zinc-800 p-2 rounded-md"
              onPress={() => router.push(`/(biblioteca)/(capitulo)/${item.id}` as any)}
            >
              
              <View className="w-16 h-16 bg-[#333333] justify-center items-center rounded-md">
                <Ionicons name="play" size={30} color="white" />
              </View>

              <View className="ml-4 flex-1">
                <Text className="text-white text-lg font-bold" numberOfLines={1}>{item.titulo}</Text>
                <Text className="text-gray-500">capítulo</Text>
              </View>

            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}