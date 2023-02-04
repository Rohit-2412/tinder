import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";

import Header from "../components/Header";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderMessage from "../components/SenderMessage";
import { db } from "../firebase";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import useAuth from "../hooks/useAuth";
import { useRoute } from "@react-navigation/native";

const MessageScreen = () => {
    const { user } = useAuth();
    const { params } = useRoute();
    const { details } = params;
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    // function to send message
    const sendMessage = () => {
        // hide keyboard
        Keyboard.dismiss();

        // message validation
        if (!input) return;

        // add message to firebase
        addDoc(collection(db, "matches", details.id, "messages"), {
            timestamp: serverTimestamp(),
            message: input,
            userId: user.uid,
            displayName: user.displayName,
            photoURL: details.users[user.uid].imageUrl,
        });

        setInput("");
    };

    // fetch messages
    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "matches", details.id, "messages"),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) =>
                    setMessages(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
            ),
        [details, db]
    );

    return (
        <SafeAreaView className="flex-1">
            {Platform.OS === "android" && <View className="my-5"></View>}
            <Header
                title={getMatchedUserInfo(details.users, user.uid).displayName}
                callEnabled={true}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
                className="flex-1"
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <FlatList
                            data={messages}
                            className="pl-4"
                            keyExtractor={(item) => item.id}
                            inverted={-1}
                            renderItem={({ item }) => (
                                item.userId === user.uid ? (
                                    <SenderMessage key={item.id} message={item} />
                                ) : (
                                    <ReceiverMessage key={item.id} message={item} />
                                )
                            )}
                        />
                    </>
                </TouchableWithoutFeedback>

                <View className="flex-row  bg-white items-center justify-between px-5 py-2 border-t border-gray-300">
                    <TextInput
                        placeholder="Message..."
                        className="h-10 text-lg"
                        value={input}
                        onChangeText={setInput}
                        onSubmitEditing={sendMessage}
                    />

                    <TouchableOpacity
                        className="rounded-full p-3"
                        onPress={sendMessage}
                    >
                        <Text className="font-bold text-[#ff5864]">Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default MessageScreen;
