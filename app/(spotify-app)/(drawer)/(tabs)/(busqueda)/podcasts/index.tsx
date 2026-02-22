import { View, Text, FlatList, ActivityIndicator, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { getPodcasts } from '@/core/auth/actions/spotify.action';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/presentation/theme/components/themed-text';
import { Stack, router } from 'expo-router';

export default function PodcastsScreen() {
  const { data: podcasts, isLoading, isError } = useQuery({
    queryKey: ['todos-podcasts'],
    queryFn: getPodcasts,
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
        <Text className="text-red-500">error cargando podcasts</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">

      <Stack.Screen 
        options={{ 
          title: 'Podcasts', 
          headerTintColor: 'white', 
          headerStyle: { backgroundColor: '#121212' }, 
          headerBackTitle: '' 
        }} 
      />

      <View className="px-5 pt-4 flex-1">
        <FlatList
          data={podcasts}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable 
              className="flex-row items-center mb-5"
              onPress={() => router.push(`/(busqueda)/podcast/${item.id}` as any)}
            >
              <View className="w-16 h-16 bg-[#333333] justify-center items-center rounded-full">
                <Ionicons name="person" size={30} color="white" />
              </View>
              <View className="ml-4 flex-1">
                <ThemedText className="text-lg font-bold text-white" numberOfLines={1}>{item.titulo}</ThemedText>
                <ThemedText className="text-gray-500">podcast</ThemedText>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}