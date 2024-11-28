// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcuShC3rKonLHqoKjFvnc75Q-TzgUrq_I",
  authDomain: "swiftaid-4108f.firebaseapp.com",
  projectId: "swiftaid-4108f",
  storageBucket: "swiftaid-4108f.firebasestorage.app",
  messagingSenderId: "1070233957045",
  appId: "1:1070233957045:web:0e6b91beab3b18f2f6c4fc",
  measurementId: "G-1MZKMB264M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider,  firestore, setDoc, doc };
