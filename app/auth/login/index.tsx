import { View, Text, KeyboardAvoidingView, ScrollView, TextInput, useWindowDimensions, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { ThemedText } from '@/presentation/theme/components/themed-text'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'
import ThemedButton from '@/presentation/theme/components/ThemedButton'
import ThemedLink from '@/presentation/theme/components/ThemedLink'
import { useAuthStore } from '@/presentation/auth/store/useAuthStore'
import { router } from 'expo-router'

const LoginScreen = () => {

  const { height } = useWindowDimensions()
  const { login } = useAuthStore();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [isPosting, setIsPosting] = useState(false);

  const onLogin = async () => {
    const { email, password } = form;

    if (email.length == 0 || password.length == 0) {
      return;
    }

    setIsPosting(true);
    const successfull = await login(email, password);
    setIsPosting(false);

    if (successfull) {
      router.replace('/');
      return;
    }

    Alert.alert('error', 'usuario o contraseña incorrectos');
  }

  return (
    <KeyboardAvoidingView behavior='padding' className="flex-1">
      <ScrollView
        className="bg-[#121212]"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 40 }}
      >
        <View className="items-center" style={{ paddingTop: height * 0.15 }}>
          <Image 
            source={require('@/assets/images/logospoty.png')} 
            className="w-24 h-24 mb-5"
            resizeMode="contain"
          />
          <ThemedText type='title' className="text-white">Login</ThemedText>
        </View>
        
        <View className="mt-8">
          <View className="bg-white rounded-md mb-4 overflow-hidden">
            <ThemedTextInput
              placeholder='email'
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
              keyboardType='email-address'
              autoCapitalize='none'
              icon='mail-outline'
            />
          </View>
          
          <View className="bg-white rounded-md mt-4 overflow-hidden">
            <ThemedTextInput
              placeholder='contraseña'
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
              secureTextEntry
              autoCapitalize='none'
              icon='lock-closed-outline'
            />
          </View>
          
          <View className="mt-6">
            <ThemedButton onPress={onLogin} disabled={isPosting}>
              entrar
            </ThemedButton>
          </View>
        </View>
        
        <View className="flex-row justify-center items-center mt-6">
          <ThemedText className="text-white">¿aún no tienes cuenta?</ThemedText>
          <ThemedLink href="/auth/register" className="mx-2 text-[#1DB954]">
            crear una cuenta
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen