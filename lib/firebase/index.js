// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9A6e0vhouqoNCLwaMHEwaSxyI3ghJ8VU",
  authDomain: "finance-tracker-3cb67.firebaseapp.com",
  projectId: "finance-tracker-3cb67",
  storageBucket: "finance-tracker-3cb67.firebasestorage.app",
  messagingSenderId: "370803631873",
  appId: "1:370803631873:web:d7b8eb19a50dbd9c65dd00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{app, db};