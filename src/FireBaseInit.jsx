// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtJr7Mx-SzU7ZkQL5z3Zxo1uHeM5Zyyxs",
  authDomain: "tasteit-c4bcd.firebaseapp.com",
  projectId: "tasteit-c4bcd",
  storageBucket: "tasteit-c4bcd.appspot.com",
  messagingSenderId: "165103309255",
  appId: "1:165103309255:web:508f601a8b278866b389e2"
};

// Initialize Firebase
//  const app = initializeApp(firebaseConfig);
 export const app = initializeApp(firebaseConfig);
//export const firestore = getFirestore(app);
export const db = getFirestore(app);
// export const auth = getAuth(app);