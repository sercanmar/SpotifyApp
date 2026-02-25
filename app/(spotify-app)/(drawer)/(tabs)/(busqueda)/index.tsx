import { View, TextInput, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/presentation/theme/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function BusquedaScreen() {
  // guardar busqda
  const [busqueda, setBusqueda] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <ScrollView className="flex-1 px-4">
        
        <ThemedText type='title' className="text-white">Buscar</ThemedText>
        <View className="flex-row items-center bg-white rounded-md px-3 py-2 mb-6">
          <Ionicons name="search" size={24} color="black" />
          <TextInput
            className="flex-1 ml-2 text-black text-base"
            placeholder="¿Qué quieres escuchar?"
            placeholderTextColor="gray"
            value={busqueda}
            onChangeText={setBusqueda}
          />
        </View>

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

      </ScrollView>
    </SafeAreaView>
  );
}