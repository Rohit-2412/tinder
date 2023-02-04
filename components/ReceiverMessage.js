import { Image, Text, View } from 'react-native'

import React from 'react'

const ReceiverMessage = ({ message }) => {
    return (
        <View className="bg-red-400 rounded-lg rounded-tl-none px-5 py-3 mx-3 my-2 ml-14 self-start">
            <Image
                className="rounded-full w-12 h-12 absolute -left-14 -top-1"
                source={{ uri: message.photoURL }}
            />
            <Text className="text-white">{message.message}</Text>
        </View>
    )
}

export default ReceiverMessage