import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

import { db } from '../firebase'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'

const ChatRow = ({ details }) => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null)
    const [lastMessage, setLastMessage] = useState('')

    // get matched user info
    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(details.users, user.uid))
    }, [details, user])

    // last message
    useEffect(() => {
        onSnapshot(query(collection(db, 'matches', details.id, 'messages'), orderBy('timestamp', 'desc')), snapshot => {
            setLastMessage(snapshot.docs[0]?.data()?.message)
        })
    }, [details, db])

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Message', { details })}
            style={styles.cardShadow} className="flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg">
            <Image
                className="rounded-full w-16 h-16 mr-4"
                source={{ uri: matchedUserInfo?.imageUrl }}
            />

            <View>
                <Text className="text-lg font-semibold">{matchedUserInfo?.displayName}</Text>
                <Text>{lastMessage || 'Say Hi!'}</Text>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    }
})
export default ChatRow