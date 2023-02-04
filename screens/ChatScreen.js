import { Platform, SafeAreaView, Text, View } from 'react-native'

import ChatList from '../components/ChatList'
import Header from '../components/Header'
import React from 'react'

const ChatScreen = () => {
    return (
        <SafeAreaView>
            {Platform.OS === 'android' && <View className="my-4"></View>}
            <Header title='Chat' />
            <ChatList />
        </SafeAreaView>
    )
}

export default ChatScreen