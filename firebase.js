import { getStorage, ref } from "firebase/storage";

import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoryRo7BdJbIh4-KrcnzMz3K77rKu1PV8",
    authDomain: "tinder-baf59.firebaseapp.com",
    projectId: "tinder-baf59",
    storageBucket: "tinder-baf59.appspot.com",
    messagingSenderId: "1085887580219",
    appId: "1:1085887580219:web:75882f90117bc5c2af341e",
    measurementId: "G-ZTDLDSNTNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);
export { firebase, auth, db, storage }; 