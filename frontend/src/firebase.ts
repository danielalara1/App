import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCn2oVjnONyohXR8pw4d46-c23xNwdMfHY",
  authDomain: "web-app-1aaf4.firebaseapp.com",
  projectId: "web-app-1aaf4",
  storageBucket: "web-app-1aaf4.firebasestorage.app",
  messagingSenderId: "148478761986",
  appId: "1:148478761986:web:12450d1a61a6c251459b1b",
  measurementId: "G-JXQNR7D4FP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);