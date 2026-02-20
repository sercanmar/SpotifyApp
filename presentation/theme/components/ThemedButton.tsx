import { Pressable, PressableProps, Text, } from "react-native";
import { create } from "zustand";
import { useThemeColor } from "../hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

interface Props extends PressableProps {
    children: string;
    icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedButton = ({ children, icon, ...rest }: Props) => {

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#00000090' : '#000000',
                },
                styles.button
            ]}
            {...rest}
        >
            <Text style={{ color: 'black' }}>{children}</Text>

            {icon && (
                <Ionicons
                    name={icon}
                    size={24}
                    color='black'
                    style={{ marginHorizontal: 10 }}
                />
            )}
        </Pressable>
    )
}

export default ThemedButton;

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
borderColor: 'red',
        width: '100%',          
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});