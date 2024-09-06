// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH8N9NAH_J9nzSj5ccG63GFy3_LXN-ZRw",
  authDomain: "sddsd-36132.firebaseapp.com",
  projectId: "sddsd-36132",
  storageBucket: "sddsd-36132.appspot.com",
  messagingSenderId: "945663123193",
  appId: "1:945663123193:web:12e057b919f82be5850c28",
  measurementId: "G-PKLTMCVC3V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);