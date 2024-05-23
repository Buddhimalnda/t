// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvhDMEJ9gnl8lqyV282-8pdHOVmZqyVPs",
  authDomain: "elec-research-0.firebaseapp.com",
  projectId: "elec-research-0",
  storageBucket: "elec-research-0.appspot.com",
  messagingSenderId: "878867636610",
  appId: "1:878867636610:web:bb4f2c0ce408cc9efbef9b",
  measurementId: "G-0HGSZP8D67",
  databaseURL:
    "https://elec-research-0-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
//realtime database
export const FIREBASE_RDB = getDatabase(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(
  FIREBASE_APP,
  "gs://elec-research-0.appspot.com"
);
// const analytics = getAnalytics(app);