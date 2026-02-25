import { View, Text, KeyboardAvoidingView, ScrollView, useWindowDimensions, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { ThemedText } from '@/presentation/theme/components/themed-text';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { router } from 'expo-router';

const RegisterScreen = () => {

    const { height } = useWindowDimensions()
    const { register } = useAuthStore();
    const [form, setForm] = useState({
        email: '',
        password: '',
        username: '',
        fechaNacimiento: ''
    });
    const [isPosting, setIsPosting] = useState(false);

    const onRegister = async () => {
        const { email, password, username, fechaNacimiento } = form;
        if (email.trim().length === 0 || password.trim().length === 0 || username.trim().length === 0 || fechaNacimiento.trim().length === 0) {
            Alert.alert('error', 'todos los campos son obligatorios');
            return;
        }

        setIsPosting(true);
        const fechaFormateada = `${fechaNacimiento.trim()}T00:00:00+01:00`;
        const successfull = await register(email, password, username, fechaFormateada);        
        setIsPosting(false);

        if (successfull) {
            router.replace('/');
            return;
        }

        Alert.alert('error', 'ese usuario ya existe o los datos son inválidos');
    }

    return (
        <KeyboardAvoidingView behavior='padding' className="flex-1">
            <ScrollView 
              className="bg-[#121212]"
              contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 40 }}
            >
                <View className="items-center" style={{ paddingTop: height * 0.10 }}>
                    <Image 
                      source={require('@/assets/images/logospoty.png')} 
                      className="w-24 h-24 mb-5"
                      resizeMode="contain"
                    />
                    <ThemedText type='title' className="text-white">Registro</ThemedText>
                    <ThemedText className="text-gray-400">crea una cuenta para continuar</ThemedText>
                </View>

                <View className="mt-6">
                    <View className="bg-white rounded-md mb-4 overflow-hidden">
                        <ThemedTextInput
                            value={form.username}
                            onChangeText={(value) => setForm({ ...form, username: value })}
                            placeholder='nombre de usuario'
                            autoCapitalize='none'
                            icon='person-outline'
                        />
                    </View>
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
                    <View className="bg-white rounded-md mb-4 overflow-hidden">
                        <ThemedTextInput
                            placeholder='contraseña'
                            value={form.password}
                            onChangeText={(value) => setForm({ ...form, password: value })}
                            secureTextEntry
                            autoCapitalize='none'
                            icon='lock-closed-outline'
                        />
                    </View>
                    <View className="bg-white rounded-md mb-4 overflow-hidden">
                        <ThemedTextInput
                            value={form.fechaNacimiento}
                            onChangeText={(value) => setForm({ ...form, fechaNacimiento: value })}
                            placeholder='fecha nacimiento (YYYY-MM-DD)'
                            keyboardType='numbers-and-punctuation'
                            icon='calendar-outline'
                        />
                    </View>
                </View>

                <View className="mt-4">
                    <ThemedButton onPress={onRegister} disabled={isPosting}>
                        registro
                    </ThemedButton>
                </View>

                <View className="flex-row justify-center items-center mt-6 mb-10">
                    <ThemedText className="text-white">¿ya tienes cuenta?</ThemedText>
                    <ThemedLink href='/auth/login' className="mx-2 text-[#1DB954]">
                        login
                    </ThemedLink>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen