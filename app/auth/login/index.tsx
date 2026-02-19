import { View, Text, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { ThemedText } from '@/presentation/theme/components/themed-text'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'
import ThemedButton from '@/presentation/theme/components/ThmedButton'
import ThemedLink from '@/presentation/theme/components/ThemedLink'

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 40 }}>
        <View style={{ paddingTop:  100 }}>
          <ThemedText type='title'>Login</ThemedText>
        </View>
        {/* Email y Password */}
        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder='Email'
            keyboardType='email-address'
            autoCapitalize='none'
            icon='mail-outline'
          />
          <ThemedTextInput
            placeholder='Contraseña'
            secureTextEntry
            autoCapitalize='none'
            icon='lock-closed-outline'
          />
          {/* Spacer */}
<View style={{ marginTop: 16 }} />

{/* Botón Login */}
<ThemedButton icon='arrow-forward-outline'>Login</ThemedButton>
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>

  )
}

export default LoginScreen