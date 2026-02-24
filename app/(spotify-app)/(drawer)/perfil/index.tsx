import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { putPerfil } from '@/core/auth/actions/auth-actions';

const PerfilScreen = () => {
  const { user, token, changeStatus } = useAuthStore();

  const [nombre, setNombre] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');

  const guardarCambios = async () => {
    if (!user?.id) return;
    const resp = await putPerfil(user.id.toString(), nombre, email);
    if (resp.ok) {
      changeStatus(token, { ...user, username: nombre, email: email });
      Alert.alert('listo', 'perfil guardado correctamente');
    } else {
      Alert.alert('error', 'no se han podido guardar los cambios');
    }
  };

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