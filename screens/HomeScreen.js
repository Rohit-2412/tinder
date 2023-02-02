import { Button, Text, View } from 'react-native'

import React from 'react'
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation();
    const { signOut } = useAuth();
    return (
        <View>
            <Text>HomeScreen</Text>
            <Button title="Go to Chat Screen" onPress={() => navigation.navigate("Chat")} />
            <View className="h-10"></View>
            <Button title='Signout' onPress={() => {
                signOut();
            }} />
        </View>
    )
}

export default HomeScreen