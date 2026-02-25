import { Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { putCancionGuardada } from '@/core/auth/actions/auth-actions';

export default function BotonAnadir({ cancion }: { cancion: any }) {
  const { user } = useAuthStore();
  const userId = user?.id?.toString() || '0';
  
  const [guardando, setGuardando] = useState(false);

  const guardarCancion = async () => {
    if (userId === '0' || guardando) return;
    
    setGuardando(true);
    try {
      await putCancionGuardada(userId, cancion.id);
      Alert.alert('listo', 'canción añadida a tu biblioteca');
    } catch (error) {
      Alert.alert('error', 'no se ha podido guardar la canción');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Pressable onPress={guardarCancion} className="p-2 ml-2">
      <Ionicons name="add" size={26} color="white" />
    </Pressable>
  );
}