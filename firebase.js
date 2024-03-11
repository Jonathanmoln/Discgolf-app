// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzh1HfmD-eidrfay7H5B9GfHvIUMghyAg",
  authDomain: "databas-discgolf.firebaseapp.com",
  projectId: "databas-discgolf",
  storageBucket: "databas-discgolf.appspot.com",
  messagingSenderId: "498874020583",
  appId: "1:498874020583:web:6aa49a707723d8933f2842",
  measurementId: "G-WC31C6CB1H"
};
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
