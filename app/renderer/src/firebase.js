import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDGOVgAoWm8sSajBohLu1hVH1uQ3BfW8TE",
    authDomain: "clipboard-2316a.firebaseapp.com",
    projectId: "clipboard-2316a",
    storageBucket: "clipboard-2316a.appspot.com",
    messagingSenderId: "240896809587",
    appId: "1:240896809587:web:a34ff5fbd5020e5793a806",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
