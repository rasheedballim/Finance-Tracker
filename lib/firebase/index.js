// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzoG7P2JDJ5Eq1G1MkB9e4X8HZ_1QyfbM",
  authDomain: "financetracker-7d945.firebaseapp.com",
  projectId: "financetracker-7d945",
  storageBucket: "financetracker-7d945.firebasestorage.app",
  messagingSenderId: "1084525974026",
  appId: "1:1084525974026:web:2e9a4c3287f2efa0b4c5f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export { app, db,auth };
