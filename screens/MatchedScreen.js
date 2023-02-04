import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import React from 'react';

function MatchedScreen() {
    const navigation = useNavigation();
    const { params } = useRoute();

    const { loggedInUser, userSwiped } = params;

    return (
        <SafeAreaView className="h-full bg-red-400 pt-20">
            <View className="justify-center px-10 pt-20">
                <Image
                    source={{ uri: 'https://links.papareact.com/mg9' }}
                    className="h-20 w-full"
                    resizeMode='contain'
                />
            </View>
            <Text className="text-center text-lg text-white my-5">
                You and {userSwiped.displayName} have liked each other!
            </Text>

            <View className="flex-row justify-evenly my-5">

                <View className="border-2 border-white rounded-full">
                    <Image
                        className="h-32 w-32 rounded-full"
                        source={{ uri: loggedInUser.imageUrl }}
                    />
                </View>
                <View className="border-2 border-white rounded-full">
                    <Image
                        className="h-32 w-32 rounded-full"
                        source={{ uri: userSwiped.imageUrl }}
                    />
                </View>
            </View>

            <TouchableOpacity
                className="bg-white m-5 py-8 px-8 rounded-full mt-16"
                activeOpacity={0.75}
                onPress={() => {
                    navigation.goBack();
                    navigation.navigate('Chat', { userSwiped, loggedInUser });
                }}>
                <Text className="text-center text-red-500 font-bold text-xl">Start Chatting</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default MatchedScreen;