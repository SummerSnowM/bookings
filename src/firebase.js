// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0ORqbl8uDgFB3gTXTzPmxLczx5ZZNUoo",
    authDomain: "bookings-app-69033.firebaseapp.com",
    projectId: "bookings-app-69033",
    storageBucket: "bookings-app-69033.firebasestorage.app",
    messagingSenderId: "971305876683",
    appId: "1:971305876683:web:c3ffdb05163a47ed39ef4e",
    measurementId: "G-DXLL41KZ2Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);