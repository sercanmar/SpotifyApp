import React from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView, Pressable, Image } from 'react-native';
import { ThemedText } from '@/presentation/theme/components/themed-text';
import { ThemedView } from '@/presentation/theme/components/themed-view';
import { Link, useNavigation, router } from 'expo-router';
import { getAlbumesSeguidos, getCancionesSeguidas, getPlaylistSeguidas } from '@/core/auth/actions/spotify.action';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerActions } from '@react-navigation/native';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const userId = user?.id?.toString() || '0';

  const { data: playlists, isLoading, isError } = useQuery({
    queryKey: ['playlists', userId],
    queryFn: () => getPlaylistSeguidas(userId),
    enabled: !!user?.id,
  });

  const { data: albumes, isLoading: isLoadingAlbumes, isError: isErrorAlbumes } = useQuery({
    queryKey: ['albumes', userId],
    queryFn: () => getAlbumesSeguidos(userId),
    enabled: !!user?.id,
  });

  const { data: canciones, isLoading: isLoadingCanciones, isError: isErrorCanciones } = useQuery({
    queryKey: ['canciones', userId],
    queryFn: () => getCancionesSeguidas(userId),
    enabled: !!user?.id,
  });

  const navigation = useNavigation();
  const onToogleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer)
  }

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>cargando datos</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">error al cargar los datos</Text>
      </View>
    );
  }
  
  return (
   <SafeAreaView className="flex-1 bg-white ">
    <ThemedView className="flex-1 px-5 ">

     <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        
        <View className="mb-8">
          <Text className="text-black text-xl font-bold mb-4">Tus playlists</Text>
          
          <FlatList
            data={playlists}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16 }}
            renderItem={({ item }) => (
              
              <Pressable 
                className="w-32 bg-[#2A2A2A] rounded-md overflow-hidden pb-3"
                onPress={() => router.push(`/(biblioteca)/(playlist)/${item.id}` as any)}
              >
                <Image 
                  source={require('@/assets/images/icon.png')} 
                  className="w-32 h-32" 
                />
                <Text 
                  className="text-white font-bold mt-3 ml-2 text-sm pr-2"
                  numberOfLines={1}
                >
                  {item.titulo}
                </Text>
              </Pressable>

            )}
          />
        </View>
          

        <View className="mb-8">
          <Text className="text-black text-xl font-bold mb-4">Tus Albumse</Text>
          
          <FlatList
            data={albumes}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16 }}
            renderItem={({ item }) => (
              
              <Pressable 
                className="w-32 bg-[#2A2A2A] rounded-md overflow-hidden pb-3"
                onPress={() => router.push(`/(biblioteca)/(album)/${item.id}` as any)}
              >
                <Image 
                  source={require('@/assets/images/icon.png')} 
                  className="w-32 h-32" 
                />
                <Text 
                  className="text-white font-bold mt-3 ml-2 text-sm pr-2"
                  numberOfLines={1}
                >
                  {item.titulo}
                </Text>
              </Pressable>

            )}
          />
        </View>

        <View className="mb-8">
          <Text className="text-black text-xl font-bold mb-4">Tus Canciones</Text>
          
          <FlatList
            data={canciones}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            numColumns={2}
            columnWrapperStyle={{ gap: 16 }}
            contentContainerStyle={{ gap: 16 }}
            renderItem={({ item }) => (
              
              <Pressable 
                className="flex-1 bg-[#2A2A2A] rounded-md overflow-hidden pb-3"
                onPress={() => router.push(`/(biblioteca)/(canciones)/${item.id}` as any)}
              >
                <Image 
                  source={require('@/assets/images/icon.png')} 
                  className="w-full h-32" 
                />
                <Text 
                  className="text-white font-bold mt-3 ml-2 text-sm pr-2"
                  numberOfLines={1}
                >
                  {item.titulo}
                </Text>
              </Pressable>

            )}
          />
        </View>

      </ScrollView>

    </ThemedView>

   </SafeAreaView>
  );
};