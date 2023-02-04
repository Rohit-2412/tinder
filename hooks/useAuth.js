import * as Google from "expo-auth-session/providers/google";

import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut,
} from "@firebase/auth";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import { auth } from "../firebase";

const AuthContext = createContext({});

const config = {
    androidClientId:
        process.env.ANDROID_CLIENT_ID,
    iosClientId:
        process.env.IOS_CLIENT_ID,
    expoClientId:
        "1085887580219-jschvne39r36tapl36ubqmk3ktgve2r4.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const [request, response, promptAsync] =
        Google.useIdTokenAuthRequest(config);

    // check if user is logged in or not
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setAccessToken(user.accessToken);
            } else {
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);

    // sign in with google account and add that credentials to firebase
    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const { type, params } = await promptAsync();
            if (type === "success") {
                const { id_token } = params;
                const credential = GoogleAuthProvider.credential(id_token);
                await signInWithCredential(auth, credential);
            }
            // Promise.reject();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    // sign out from firebase
    const logout = () => {
        setLoading(true);
        signOut(auth).then().catch((error) => { console.log(error); }).finally(() => setLoading(false));

    };

    const memoedValue = useMemo(() => ({
        user,
        signInWithGoogle,
        setLoading,
        loading,
        logout
    }), [user, loading])

    return (
        <AuthContext.Provider
            value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}
