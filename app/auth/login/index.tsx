import { View, Text, KeyboardAvoidingView, ScrollView, TextInput, useWindowDimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { ThemedText } from '@/presentation/theme/components/themed-text'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'
import { TextProps } from 'react-native'
import ThemedButton from '@/presentation/theme/components/ThemedButton'
import ThemedLink from '@/presentation/theme/components/ThemedLink'
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color'
import { useAuthStore } from '@/presentation/auth/store/useAuthStore'
import { router } from 'expo-router'

const LoginScreen = () => {

  const { height } = useWindowDimensions()
  const backgroundColor = useThemeColor({}, 'background');
  const { login } = useAuthStore();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [isPosting, setIsPosting] = useState(false);

  const onLogin = async () => {
    const { email, password } = form;
    console.log({ email, password });

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

    Alert.alert('Error', 'Usuario o contraseña incorrectos');
  }



  return (
    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 40, backgroundColor: backgroundColor }}>
        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type='title'>Login</ThemedText>
        </View>
        {/* Email y Password */}
        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder='Email'
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            keyboardType='email-address'
            autoCapitalize='none'
            icon='mail-outline'
          />
          <ThemedTextInput
            placeholder='Contraseña'
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            secureTextEntry
            autoCapitalize='none'
            icon='lock-closed-outline'
          />
          <View style={{ marginTop: 16 }} />
          <ThemedButton onPress={onLogin}
            disabled={isPosting} icon='arrow-forward-outline'>
            Login
          </ThemedButton>
        </View>
        {/* Spacer */}
        <View style={{ marginTop: 24 }} />

        {/* Enlace a registro */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ThemedText>¿Aún no tienes cuenta?</ThemedText>
          <ThemedLink href="/auth/register" style={{ marginHorizontal: 5 }}>
            Crear una cuenta
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen