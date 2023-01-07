// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "@firebase/firestore";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   doc,
//   deleteDoc,
// } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfwkzXrI_YXsi6vruhmzvBEWRc1kBiU7c",
  authDomain: "api-project-32470662412.firebaseapp.com",
  databaseURL: "https://api-project-32470662412-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "api-project-32470662412",
  storageBucket: "api-project-32470662412.appspot.com",
  messagingSenderId: "32470662412",
  appId: "1:32470662412:web:0a60d34500d825dfe2dd29",
  measurementId: "G-1LYLMRZ0P3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const firestore = getFirestore(app);
export const db = getFirestore(app);
export const auth = getAuth(app);