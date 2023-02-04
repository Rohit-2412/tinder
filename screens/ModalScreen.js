import { Image, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import useAuth from '../hooks/useAuth'

const ModalScreen = () => {
    const { user } = useAuth();
    const [imageUrl, setImageUrl] = useState();
    const [occupation, setOccupation] = useState();
    const [age, setAge] = useState();

    const incompleteForm = !imageUrl || !occupation || !age;

    return (
        <SafeAreaView className="flex-1 items-center pt-1">
            {Platform.OS === "android" && <View className="my-2" />}
            <Image
                source={{ uri: "https://links.papareact.com/2pf" }}
                className="w-full h-20"
                resizeMode='contain'
            />

            <Text className="text-2xl text-gray-700 p-3 font-bold">Welcome {user.displayName}!</Text>

            <Text className="text-lg text-center p-4 font-bold text-red-400">Step 1: Profile Picture</Text>
            <TextInput
                value={imageUrl}
                onChangeText={(text) => setImageUrl(text)}
                className="border-2 border-gray-300 rounded-lg p-2 w-3/4" placeholder="Enter your profile picture URL" />

            <Text className="text-lg text-center p-4 font-bold text-red-400">Step 2: Occupation</Text>
            <TextInput
                value={occupation}
                onChangeText={(text) => setOccupation(text)}
                className="border-2 border-gray-300 rounded-lg p-2 w-3/4" placeholder="Enter your occupation" />

            <Text className="text-lg text-center p-4 font-bold text-red-400">Step 3: Age</Text>
            <TextInput
                value={age}
                onChangeText={(text) => setAge(text)}
                maxLength={2}
                keyboardType="number-pad"
                className="border-2 border-gray-300 rounded-lg p-2 w-3/4" placeholder="Enter your age" />
            <TouchableOpacity activeOpacity={0.65}
                disabled={incompleteForm}
                className={`w-64 p-3 rounded-xl absolute bottom-5 ${incompleteForm ? 'bg-gray-400' : 'bg-red-400'}`}

            >
                <Text className="text-center text-white text-xl">Update Profile</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ModalScreen