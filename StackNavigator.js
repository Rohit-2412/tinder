import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import { LogBox } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import ModalScreen from './screens/ModalScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from './hooks/useAuth';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { user } = useAuth();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>{
            user ? (
                <>
                    <Stack.Group>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Chat" component={ChatScreen} />
                    </Stack.Group>
                    <Stack.Group screenOptions={{ presentation: 'modal' }}>
                        <Stack.Screen name="Modal" component={ModalScreen} />
                    </Stack.Group>
                </>) :
                (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
        </Stack.Navigator>

    )
}

export default StackNavigator