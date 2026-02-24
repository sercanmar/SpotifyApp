import { LogoutIconButton } from '@/presentation/auth/components/LogoutIconButton'
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import { Image, Text, View } from 'react-native'
const CustomDrawer = (props: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView {...props}>
            <View className='flex justify-center items-center mx-3 p-10 mb-10 h-[150px]
rounded-xl bg-primary'>
                <View className='flex justify-center items-center bg-white rounded-full h-
24 w-24'>
                    <Text className='text-primary font-work-black text-3xl'>
                        
                         <Image
                        source={require('@/assets/images/logospoty.png')} // Aquí pones tu imagen
                        style={{ height: 80, width: 80, borderRadius: 40 }} // tamaño y forma circular
                        resizeMode="cover"
                    />
                        

                    </Text>
                </View>
            </View>
            {/* DrawerItems */}
            <DrawerItemList {...props} />
            <View className="mt-10 border-t border-gray-700 pt-5">
                <LogoutIconButton />
            </View>
        </DrawerContentScrollView>
    )
}
export default CustomDrawer