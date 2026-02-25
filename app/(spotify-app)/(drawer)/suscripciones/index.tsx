import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSuscripciones } from '@/core/auth/actions/auth-actions';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { Ionicons } from '@expo/vector-icons';

const SuscripcionScreen = () => {
  const { user } = useAuthStore();
  const userId = user?.id?.toString() || '0';

  const { data: suscripcion, isLoading, isError } = useQuery({
    queryKey: ['suscripciones', userId],
    queryFn: () => getSuscripciones(userId),
    enabled: !!user?.id,
  });

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
        <Text className="text-red-500">error al cargar las suscripciones</Text>
      </View>
    );
  }

  const formatearFecha = (fecha: string) => {
    if (!fecha) return '';
    return fecha.split('T')[0];
  };

  return (
    <View className="flex-1 bg-[#121212] p-5">
      <Text className="text-white text-2xl font-bold mb-6">suscripciones</Text>

      {!suscripcion || !suscripcion.id ? (
        <View className="py-10 items-center">
          <Text className="text-white text-lg font-bold">no tienes suscripciones activas</Text>
        </View>
      ) : (
        <View className="bg-[#333333] p-4 rounded-md mb-4 flex-row items-center">
          <View className="w-12 h-12 bg-[#1DB954] rounded-full justify-center items-center mr-4">
            <Ionicons name="star" size={24} color="black" />
          </View>
          
          <View className="flex-1">
            <Text className="text-white font-bold text-lg mb-1">suscripción premium</Text>
            <Text className="text-gray-400">inicio: {formatearFecha(suscripcion.fechaInicio)}</Text>
            <Text className="text-gray-400">fin: {formatearFecha(suscripcion.fechaFin)}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default SuscripcionScreen;