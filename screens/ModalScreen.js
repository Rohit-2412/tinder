import { Image, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

import { db } from '../firebase'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'

const ModalScreen = () => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [imageUrl, setImageUrl] = useState();
    const [occupation, setOccupation] = useState();
    const [age, setAge] = useState();

    const incompleteForm = !imageUrl || !occupation || !age;

    // function to update the user profile

    const updateUserProfile = () => {
        setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            imageUrl,
            occupation,
            age,
            timestamp: serverTimestamp()
        }).then(() => navigation.navigate("Home")).catch((error) => alert(error.message));
    }

    return (
        <SafeAreaView className="flex-1 items-center pt-5">
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
                onPress={updateUserProfile}
                className={`w-64 p-3 rounded-xl absolute bottom-7 ${incompleteForm ? 'bg-gray-400' : 'bg-red-400'}`}

            >
                <Text className="text-center text-white text-xl">Update Profile</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ModalScreen