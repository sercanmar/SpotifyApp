import { View, Text, Switch, TouchableOpacity, Alert, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { getConfiguracion, putConfig } from '@/core/auth/actions/auth-actions';
import { useQuery } from '@tanstack/react-query';

const ConfiguracionScreen = () => {
  const { user } = useAuthStore();
  const userId = user?.id?.toString() || '0';

  const { data: configServer, isLoading, isError } = useQuery({
    queryKey: ['configuracion-usuario', userId],
    queryFn: () => getConfiguracion(userId),
    enabled: !!user?.id,
  });

  const [autoplay, setAutoplay] = useState(false);
  const [ajuste, setAjuste] = useState(false);
  const [normalizacion, setNormalizacion] = useState(false);
  const [calidad, setCalidad] = useState('');
  const [tipoDescarga, setTipoDescarga] = useState('');
  const [idioma, setIdioma] = useState('');

  useEffect(() => {
    if (configServer) {
      setAutoplay(configServer.autoplay ?? false);
      setAjuste(configServer.ajuste ?? false);
      setNormalizacion(configServer.normalizacion ?? false);
      setCalidad(configServer.calidad?.nombre || '');
      setTipoDescarga(configServer.tipoDescarga?.nombre || '');
      setIdioma(configServer.idioma?.nombre || '');
    }
  }, [configServer]);

  const guardarCambios = async () => {
    const payload = {
      autoplay,
      ajuste,
      normalizacion,
      calidad: { nombre: calidad },
      tipoDescarga: { nombre: tipoDescarga },
      idioma: { nombre: idioma }
    };

    const resp = await putConfig(userId, payload);
    
    if (resp.ok) {
      Alert.alert('listo', 'configuración guardada correctamente');
    } else {
      Alert.alert('error', 'no se ha podido guardar la configuración');
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
        <Text className="text-red-500">error al cargar configuración</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#121212] p-5">
      
      <View className="flex-row justify-between items-center mb-6 mt-4">
        <Text className="text-white text-lg font-bold">Autoplay</Text>
        <Switch 
          value={autoplay} 
          onValueChange={setAutoplay} 
          trackColor={{ true: '#1DB954', false: '#333333' }} 
        />
      </View>

      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-white text-lg font-bold">Ajuste de volumen</Text>
        <Switch 
          value={ajuste} 
          onValueChange={setAjuste} 
          trackColor={{ true: '#1DB954', false: '#333333' }} 
        />
      </View>

      <View className="flex-row justify-between items-center mb-8">
        <Text className="text-white text-lg font-bold">Normalización</Text>
        <Switch 
          value={normalizacion} 
          onValueChange={setNormalizacion} 
          trackColor={{ true: '#1DB954', false: '#333333' }} 
        />
      </View>

      <Text className="text-gray-400 mb-2 ml-1">Calidad del audio</Text>
      <TextInput 
        className="bg-[#333333] text-white p-3 rounded-md mb-5"
        value={calidad}
        onChangeText={setCalidad}
      />

      <Text className="text-gray-400 mb-2 ml-1">Tipo de descarga</Text>
      <TextInput 
        className="bg-[#333333] text-white p-3 rounded-md mb-5"
        value={tipoDescarga}
        onChangeText={setTipoDescarga}
      />

      <Text className="text-gray-400 mb-2 ml-1">Idioma de la aplicación</Text>
      <TextInput 
        className="bg-[#333333] text-white p-3 rounded-md mb-8"
        value={idioma}
        onChangeText={setIdioma}
      />

      <TouchableOpacity 
        className="bg-[#1DB954] p-4 rounded-full items-center mb-10"
        onPress={guardarCambios}
      >
        <Text className="text-white font-bold text-lg">Guardar cambios</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default ConfiguracionScreen;