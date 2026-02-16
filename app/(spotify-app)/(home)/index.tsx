import { ThemedText } from "@/presentation/theme/components/themed-text";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {

    const primary = useThemeColor({}, 'primary');

    return (
        <SafeAreaView style={{ paddingHorizontal: 20 }}>
            <ThemedText style={{ fontFamily: 'KanitBold', color: primary }}>HomeScreen</ThemedText>
            <ThemedText style={{ fontFamily: 'KanitBold' }}>HomeScreen</ThemedText>
            <ThemedText style={{ fontFamily: 'KanitRegular' }}>HomeScreen</ThemedText>
            <ThemedText style={{ fontFamily: 'KanitThin' }}>HomeScreen</ThemedText>
        </SafeAreaView>
    )
}