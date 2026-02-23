import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { getCancionesSeguidas } from '@/core/auth/actions/spotify.action';
import { ThemedText } from '@/presentation/theme/components/themed-text';
import React from 'react';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';

export default function CancionesScreen() {
  // saca el id del usuario real logueado, no de la url
  const { user } = useAuthStore();
  const userId = user?.id?.toString() || '0';

  const { data: canciones, isLoading, isError } = useQuery({
    queryKey: ['canciones-guardadas', userId], 
    queryFn: () => getCancionesSeguidas(userId),
    enabled: !!user?.id,
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
        <Text className="text-red-500">error al cargar canciones</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <Stack.Screen 
        options={{ 
          title: 'Canciones', 
          headerBackTitle: '',
          headerTintColor: 'white', 
          headerStyle: { backgroundColor: '#121212' } 
        }} 
      />

      <View className="px-5 pt-4 flex-1">
        <ThemedText type='title' className="mb-6">Canciones</ThemedText>

        <FlatList
          data={canciones}
          keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View className="py-10 items-center">
              <Text className="text-white text-lg font-bold">no hay canciones guardadas</Text>
            </View>
          )}
          renderItem={({ item, index }) => (
            <TouchableOpacity className="flex-row items-center mb-4 active:bg-zinc-800 p-2 rounded">
              
              <Text className="text-gray-400 mr-4 font-bold">{index + 1}</Text>

              <View className="flex-1">
                <Text className="text-white text-lg font-bold" numberOfLines={1}>{item?.titulo || 'sin título'}</Text>
                <Text className="text-gray-400 text-sm">canción</Text>
              </View>

            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}