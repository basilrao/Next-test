import { initializeApp } from "firebase/app";
import { getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB1GzpkJj_MNwkaxORzIWVDkq6rikDbRW0",
    authDomain: "next-auth-2b6c5.firebaseapp.com",
    projectId: "next-auth-2b6c5",
    storageBucket: "next-auth-2b6c5.appspot.com",
    messagingSenderId: "1045670773990",
    appId: "1:1045670773990:web:39c117eca94da4f2c92727",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGlE_CLIENT_SECRET,
});

export { auth, provider };
