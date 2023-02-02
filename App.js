import { AuthProvider } from './hooks/useAuth';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';

LogBox.ignoreAllLogs();
export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <StackNavigator />
            </AuthProvider>
        </NavigationContainer>
    );
}

