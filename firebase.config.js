

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0_GBql7C-L4OlUNAFopznkIizZyByRFg",
  authDomain: "kenal-9d89a.firebaseapp.com",
  projectId: "kenal-9d89a",
  storageBucket: "kenal-9d89a.appspot.com",
  messagingSenderId: "375668931405",
  appId: "1:375668931405:web:948b626cbe25716d4d1504"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)



