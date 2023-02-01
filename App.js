import { StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

export default function App() {
    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-yellow-400">Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

