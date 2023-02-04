import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import { Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { collection, doc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';

import { StatusBar } from 'expo-status-bar';
import Swiper from 'react-native-deck-swiper'
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation();
    const { user, logout } = useAuth();
    const [profiles, setProfiles] = useState([null])
    const swipeRef = useRef(null);

    useLayoutEffect(() =>
        onSnapshot(doc(db, "users", user.uid), (snapshot) => {
            if (!snapshot.exists()) {
                navigation.navigate('Modal')
            }
        })
        , [])

    // loading all profiles from firestore
    useEffect(() => {
        let unsub;

        const fetchCards = async () => {
            const passes = await getDocs(collection(db, "users", user.uid, "passes")).then(
                (snapshot) => snapshot.docs.map((doc) => doc.id)
            )

            const swipes = await getDocs(collection(db, "users", user.uid, "swipes")).then(
                (snapshot) => snapshot.docs.map((doc) => doc.id)
            )

            const passedUserIds = passes.length > 0 ? passes : ['test'];
            const swipedUserIds = swipes.length > 0 ? swipes : ['test'];

            unsub = onSnapshot(
                query(collection(db, 'users'),
                    where('id', 'not-in', [...passedUserIds, ...swipedUserIds])),
                snapshot => {
                    const data = snapshot.docs.
                        filter(doc => doc.id !== user.uid).
                        map(doc => ({ id: doc.id, ...doc.data(), }))
                    setProfiles(data)
                })
        }

        fetchCards();
        return unsub;
    }, [])

    // swipe left
    const swipeLeft = async (cardIndex) => {
        if (!profiles[cardIndex]) {
            return
        }

        const userSwiped = profiles[cardIndex];

        setDoc(doc(db, "users", user.uid, "passes", userSwiped.id),
            userSwiped
        ).catch((error) => alert(error.message));
    }

    // swipe right
    const swipeRight = async (cardIndex) => {
        if (!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];

        setDoc(doc(db, "users", user.uid, "matches", userSwiped.id),
            userSwiped
        ).catch((error) => alert(error.message));
    }
    return (
        <SafeAreaView className="flex-1">
            <StatusBar style="auto" />
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
                    cards={profiles}
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
                    onSwipedLeft={(cardIndex) => { swipeLeft(cardIndex) }}
                    onSwipedRight={(cardIndex) => { swipeRight(cardIndex) }}
                    animateCardOpacity
                    renderCard={card => card ? (
                        <View key={card.id} className="bg-white h-3/4 rounded-xl relative">
                            <Image source={{ uri: card.imageUrl }} className="h-full w-full rounded-xl absolute top-0" />

                            <View className="bg-white w-full h-20 absolute bottom-0 justify-between px-6 py-2 rounded-b-xl items-center flex-row" style={styles.cardShadow}>
                                <View>
                                    <Text className="text-xl font-bold">{card.displayName}</Text>

                                    <Text className="text-gray-500">{card.occupation} </Text>
                                </View>

                                <Text className="text-2xl font-bold">{card.age}</Text>
                            </View>
                        </View>
                    ) : (
                        <View className="relative bg-white h-3/4 rounded-xl justify-center items-center" style={styles.cardShadow}>
                            <Text className="font-bold pb-5">No more profiles</Text>
                            <Image
                                className="h-20 w-full"
                                style={{ height: 100, width: 100 }}
                                source={{ uri: "https://links.papareact.com/6gb" }}
                            />
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