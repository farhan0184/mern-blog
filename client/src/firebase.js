// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blogs-9d209.firebaseapp.com",
  projectId: "mern-blogs-9d209",
  storageBucket: "mern-blogs-9d209.appspot.com",
  messagingSenderId: "1071709350658",
  appId: "1:1071709350658:web:8b5edd8a39dbe8b140701b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);