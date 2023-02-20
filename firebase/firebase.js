// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9bLUxMo3-9IBD_q9stew414xTitZE2j0",
  authDomain: "ecommercenextjs-28967.firebaseapp.com",
  projectId: "ecommercenextjs-28967",
  storageBucket: "ecommercenextjs-28967.appspot.com",
  messagingSenderId: "659832779261",
  appId: "1:659832779261:web:e4e373caaef94f51d3a994",
  measurementId: "G-L328C0CGHF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getFirestore(app);