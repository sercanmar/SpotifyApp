import { View, ScrollView, Pressable, Image } from 'react-native';
import React from 'react';
import { ThemedText } from '@/presentation/theme/components/themed-text';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const BibliotecaScreen = () => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <ScrollView style={{ flex: 1, backgroundColor, paddingHorizontal: 20 }}>
      
      <View style={{ paddingTop: 60, paddingBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
        <ThemedText type='title'>Tu biblioteca</ThemedText>
      </View>

      <View style={{ marginTop: 10 }}>
        
        {/* boton de canciones que te gustan */}
        <Pressable 
          onPress={() => router.push('/(biblioteca)/canciones-guardadas' as any)}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
        >
          <View style={{ width: 65, height: 65, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
            <Ionicons name="heart" size={30} color="white" />
          </View>
          <View style={{ marginLeft: 15 }}>
            <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>Tus me gusta</ThemedText>
            <ThemedText style={{ color: 'gray' }}>Canciones guardadas</ThemedText>
          </View>
        </Pressable>

        {/* boton de playlists */}
        <Pressable 
          onPress={() => router.push('/(biblioteca)/playlists' as any)}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
        >
          <View style={{ width: 65, height: 65, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
            <Ionicons name="musical-notes" size={30} color="white" />
          </View>
          <View style={{ marginLeft: 15 }}>
            <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>Tus playlists</ThemedText>
            <ThemedText style={{ color: 'gray' }}>Listas que sigues</ThemedText>
          </View>
        </Pressable>

        {/* boton de artistas */}
        <Pressable 
          onPress={() => router.push('/(biblioteca)/artistas' as any)}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
        >
          <View style={{ width: 65, height: 65, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', borderRadius: 35 }}>
            <Ionicons name="person" size={30} color="white" />
          </View>
          <View style={{ marginLeft: 15 }}>
            <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>Tus artistas</ThemedText>
            <ThemedText style={{ color: 'gray' }}>Artistas que sigues</ThemedText>
          </View>
        </Pressable>

        {/* boton de albumes */}
        <Pressable 
          onPress={() => router.push('/(biblioteca)/albumes' as any)}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
        >
          <View style={{ width: 65, height: 65, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
            <Ionicons name="albums" size={30} color="white" />
          </View>
          <View style={{ marginLeft: 15 }}>
            <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>Tus álbumes</ThemedText>
            <ThemedText style={{ color: 'gray' }}>Álbumes guardados</ThemedText>
          </View>
        </Pressable>

      </View>
    </ScrollView>
  );
};

export default BibliotecaScreen;