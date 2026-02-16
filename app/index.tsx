import { SafeAreaView } from 'react-native-safe-area-context';
import {  Text } from 'react-native'
import { StatusBar } from 'expo-status-bar';
const App = () => {
    return (
        <SafeAreaView>
            <Text>App</Text>
            <StatusBar style='dark' />
        </SafeAreaView>
    )
}
export default App;