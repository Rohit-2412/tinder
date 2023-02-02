import { Button, Text, View } from 'react-native'

import React from 'react'
import useAuth from '../hooks/useAuth'

const LoginScreen = () => {
    const { signInWithGoogleAsync } = useAuth();

    return (
        <View>
            <Text>Login</Text>
            <Button title="Login" onPress={signInWithGoogleAsync} />
        </View>
    )
}

export default LoginScreen