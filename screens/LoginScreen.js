import { Button, ImageBackground, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'

import { StatusBar } from 'expo-status-bar';
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const { signInWithGoogle, loading } = useAuth();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [navigation])

    return (
        <SafeAreaView className="flex-1">
            <StatusBar style="auto" />
            {Platform.OS === "android" && <View className="my-5" />}
            <ImageBackground
                resizeMode='cover'
                style={{ width: '100%', height: '100%' }}
                source={{ uri: 'https://tinder.com/static/tinder.png' }} >
            </ImageBackground>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={signInWithGoogle} disabled={loading}
                className="absolute bottom-36 w-52 mx-[25%] bg-white p-4 rounded-2xl">
                <Text className="text-center font-semibold">Sign in & get swiping</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default LoginScreen