import { Foundation, Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'

import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Header = ({ title, callEnabled }) => {
    const navigation = useNavigation()

    return (
        <View className="p-2 flex-row justify-between items-center">
            <View className="items-center flex-row">
                <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={34} color="#ff5864" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold pl-2">{title}</Text>
            </View>
            {callEnabled && (
                <TouchableOpacity className="rounded-full mr-4 p-3 bg-red-200">
                    <Foundation name="telephone" size={30} color="#ff5864" />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default Header