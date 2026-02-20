import { LogoutIconButton } from '@/presentation/auth/components/LogoutIconButton'
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import { Text, View } from 'react-native'
const CustomDrawer = (props: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView {...props}>
            <View className='flex justify-center items-center mx-3 p-10 mb-10 h-[150px]
rounded-xl bg-primary'>
                <View className='flex justify-center items-center bg-white rounded-full h-
24 w-24'>
                    <Text className='text-primary font-work-black text-3xl'>FH</Text>
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