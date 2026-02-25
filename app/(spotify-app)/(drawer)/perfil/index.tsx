import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { putPerfil, getPerfil } from '@/core/auth/actions/auth-actions';
import { useQuery } from '@tanstack/react-query';

const PerfilScreen = () => {
  const { user, checkStatus } = useAuthStore();
  const userId = user?.id?.toString() || '0';

  const { data: perfilServer, isLoading, isError } = useQuery({
    queryKey: ['perfil-usuario', userId],
    queryFn: () => getPerfil(userId),
    enabled: !!user?.id,
  });

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (perfilServer) {
      setNombre(perfilServer.username || '');
      setEmail(perfilServer.email || '');
    }
  }, [perfilServer]);

  const guardarCambios = async () => {
    if (!user?.id) return;
    
    const resp = await putPerfil(userId, nombre, email);
    
    if (resp.ok) {
      await checkStatus();
      Alert.alert('listo', 'perfil guardado correctamente');
    } else {
      Alert.alert('error', 'no se han podido guardar los cambios');
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#121212] justify-center items-center">
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 bg-[#121212] justify-center items-center">
        <Text className="text-red-500">error al cargar el perfil</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#121212] p-5">
      <Text className="text-gray-400 mb-2">nombre</Text>
      <TextInput 
        className="bg-gray-800 text-white p-3 rounded-md mb-4"
        value={nombre}
        onChangeText={setNombre}
      />
      <Text className="text-gray-400 mb-2">correo electrónico</Text>
      <TextInput 
        className="bg-gray-800 text-white p-3 rounded-md mb-8"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity 
        className="bg-[#1DB954] p-4 rounded-full items-center"
        onPress={guardarCambios}
      >
        <Text className="text-white font-bold text-lg">guardar cambios</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PerfilScreen;