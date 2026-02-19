import { View, Text, KeyboardAvoidingView, ScrollView, useWindowDimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { ThemedText } from '@/presentation/theme/components/themed-text';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { router } from 'expo-router';

const RegisterScreen = () => {

    const { height } = useWindowDimensions()
    const backgroundColor = useThemeColor({}, 'background');
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
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        setIsPosting(true);
const fechaFormateada = `${fechaNacimiento.trim()}T00:00:00+01:00`;

        const successfull = await register(email, password, username, fechaFormateada);        setIsPosting(false);
        setIsPosting(false);

        if (successfull) {
            router.replace('/');
            return;
        }

        Alert.alert('Error', 'Ese usuario ya existe o los datos son inválidos');
    }





    return (
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
            <ScrollView style={{ paddingHorizontal: 40 }}>
                <View style={{ paddingTop: height * 0.35 }}>
                    <ThemedText type='title'>Registro</ThemedText>
                    <ThemedText style={{ color: 'grey' }}>Crea una cuenta para continuar</ThemedText>
                </View>

                {/* Email y Password */}
                <View style={{ marginTop: 24 }}>
                    <ThemedTextInput
                        value={form.username}
                        onChangeText={(value) => setForm({ ...form, username: value })}
                        placeholder='Nombre de usuario'
                        autoCapitalize='none'
                        icon='person-outline'
                    />
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
                    <ThemedTextInput
                        value={form.fechaNacimiento}
                        onChangeText={(value) => setForm({ ...form, fechaNacimiento: value })}
                        placeholder='Fecha nacimiento (YYYY-MM-DD)'
                        keyboardType='numbers-and-punctuation'
                        icon='calendar-outline'
                    />


                </View>

                {/* Spacer */}
                <View style={{ marginTop: 16 }} />
                <ThemedButton onPress={onRegister}
                    disabled={isPosting} icon='arrow-forward-outline'>
                    Register
                </ThemedButton>

                {/* Botón Login */}

                {/* Spacer */}
                <View style={{ marginTop: 24 }} />

                {/* Enlace a registro */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ThemedText>¿Ya tienes cuenta?</ThemedText>
                    <ThemedLink href='/auth/login' style={{ marginHorizontal: 5 }}>
                        Login
                    </ThemedLink>
                </View>



            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen
