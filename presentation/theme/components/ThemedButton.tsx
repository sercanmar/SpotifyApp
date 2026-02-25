import { Pressable, PressableProps, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface Props extends PressableProps {
    children: string;
    icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedButton = ({ children, icon, ...rest }: Props) => {

    return (
        <Pressable
            className="w-full px-3 py-4 rounded-full items-center flex-row justify-center bg-[#1DB954] active:bg-[#1ed760]"
            {...rest}
        >
            <Text className="text-black font-bold">{children}</Text>

            {icon && (
                <Ionicons
                    name={icon}
                    size={24}
                    color='black'
                    className="mx-2"
                />
            )}
        </Pressable>
    )
}

export default ThemedButton;