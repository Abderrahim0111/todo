// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBolUADbxxCwKNV9DJzLQwSPVVSmy7cHI8",
  authDomain: "todofinal-521e4.firebaseapp.com",
  projectId: "todofinal-521e4",
  storageBucket: "todofinal-521e4.appspot.com",
  messagingSenderId: "272738933682",
  appId: "1:272738933682:web:6497983a5734e1ef1ea2ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);