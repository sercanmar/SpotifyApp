import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { ActivityIndicator, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { getCapitulo } from '@/core/auth/actions/spotify.action';
import { ThemedText } from '@/presentation/theme/components/themed-text';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function CapituloScreen() {
  const { id } = useLocalSearchParams();
  const idcapitulo = Array.isArray(id) ? id[0] : id;

  const { data: capitulo, isLoading, isError } = useQuery({
    queryKey: ['capitulo', idcapitulo],
    queryFn: () => getCapitulo(idcapitulo as string),
    enabled: !!idcapitulo,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#121212]">
        <ActivityIndicator size="large" color="#1DB954" />
        <Text className="text-white mt-2">cargando capítulo...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center bg-[#121212]">
        <Text className="text-red-500">error al cargar capítulo</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <Stack.Screen
        options={{
          title: 'Capítulo',
          headerBackTitle: '',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#1DB954' }
        }}
      />

      <ScrollView className="flex-1 px-5 mt-2">
        <TouchableOpacity
          className="flex-row items-center mb-6"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>

        <View className="items-center mb-6">
          <View className="w-40 h-40 bg-[#333333] justify-center items-center rounded-md mb-4">
            <Ionicons name="mic" size={60} color="white" />
          </View>
          <ThemedText type='title' className="text-center">{capitulo?.titulo}</ThemedText>
          
          <Text className="text-gray-400 mt-2">
            {capitulo?.fecha ? capitulo.fecha.split('T')[0] : ''} • {capitulo?.duracion} min
          </Text>
        </View>

        <TouchableOpacity className="bg-[#1DB954] p-4 rounded-full items-center flex-row justify-center mb-8">
          <Ionicons name="play" size={24} color="black" />
          <Text className="text-black font-bold text-lg ml-2">reproducir</Text>
        </TouchableOpacity>

        <Text className="text-white text-lg font-bold mb-2">Descripción</Text>
        <Text className="text-gray-400 text-base leading-6 pb-10">
          {capitulo?.descripcion}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}