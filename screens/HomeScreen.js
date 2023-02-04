import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import { Button, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useRef } from 'react'

import Swiper from 'react-native-deck-swiper'
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native'

const DUMMY_DATA = [
    {
        id: 1,
        firstName: 'Elon',
        lastName: 'Musk',
        job: 'Software Engineer',
        age: 25,
        photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg'
    },
    {
        id: 2,
        firstName: 'Jeff',
        lastName: 'Bezos',
        job: 'Software Engineer',
        age: 35,
        photoURL: 'https://pbs.twimg.com/profile_images/1591558315254890500/ETIHb4Nl_400x400.jpg'
    },
    {
        id: 3,
        firstName: 'John',
        lastName: 'Doe',
        job: 'Developer',
        age: 45,
        photoURL: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-2379005.jpg&fm=jpg'
    }
]

const HomeScreen = () => {
    const navigation = useNavigation();
    const { user, logout } = useAuth();
    const swipeRef = useRef(null);

    return (
        <SafeAreaView className="flex-1">
            {Platform.OS === "android" && <View className="my-5" />}
            {/* header */}
            <View className="flex-row items-center justify-between px-5">
                <TouchableOpacity onPress={logout}>
                    <Image
                        source={{ uri: user?.photoURL }}
                        className="h-10 w-10 rounded-full"
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
                    <Image
                        source={require('../assets/logo.png')}
                        className="h-20 w-20"
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Chat')} >
                    <Ionicons name="ios-chatbubbles" size={35} color="#ff5864" />
                </TouchableOpacity>
            </View>
            {/* end of header */}

            {/* cards */}
            <View className="flex-1 -mt-6">
                <Swiper
                    ref={swipeRef}
                    containerStyle={{ backgroundColor: 'transparent' }}
                    cards={DUMMY_DATA}
                    stackSize={5}
                    cardIndex={0}
                    verticalSwipe={false}
                    overlayLabels={{
                        left: {
                            title: "NOPE",
                            style: {
                                label: {
                                    textAlign: "right",
                                    color: "red"
                                }
                            }
                        },
                        right: {
                            title: "MATCH",
                            style: {
                                label: {
                                    textAlign: "left",
                                    color: "#4ded60"
                                }
                            }
                        }
                    }}
                    onSwipedLeft={() => { }}
                    onSwipedRight={() => { }}
                    animateCardOpacity
                    renderCard={card => (
                        <View key={card.id} className="bg-white h-3/4 rounded-xl relative">
                            <Image source={{ uri: card.photoURL }} className="h-full w-full rounded-xl absolute top-0" />

                            <View className="bg-white w-full h-20 absolute bottom-0 justify-between px-6 py-2 rounded-b-xl items-center flex-row" style={styles.cardShadow}>
                                <View>
                                    <Text className="text-2xl font-bold">{card.firstName} {card.lastName}</Text>

                                    <Text className="text-gray-500">{card.job} </Text>
                                </View>

                                <Text className="text-2xl font-bold">{card.age}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>

            {/* bottom 2 buttons */}
            <View className="flex-row justify-evenly mb-5">
                <TouchableOpacity
                    onPress={() => swipeRef.current.swipeLeft()}
                    className="items-center justify-center rounded-full w-16 h-16 bg-red-200">
                    <Entypo name="cross" size={25} color="red" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => swipeRef.current.swipeRight()}
                    className="items-center justify-center rounded-full w-16 h-16 bg-green-200">
                    <AntDesign name="heart" size={25} color="green" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
        shadowRadius: 1.41,
        elevation: 2,
    }
})

export default HomeScreen