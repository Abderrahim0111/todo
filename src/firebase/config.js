// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7j72bFmw2fbrqiTTLWmMdYPBi8q1UXxo",
  authDomain: "todoapp-ee193.firebaseapp.com",
  projectId: "todoapp-ee193",
  storageBucket: "todoapp-ee193.appspot.com",
  messagingSenderId: "839768934148",
  appId: "1:839768934148:web:c8fa3c4be08d778322b251"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);