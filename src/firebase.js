// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  fetchSignInMethodsForEmail 
} from "firebase/auth";
import { getStorage, gsReference, getDownloadURL } from "firebase/storage"; // Import Firebase Storage
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app); // Initialize Firebase Storage
const db = getFirestore(app);

const getFirebaseFileUrl = async (file) => {
  const gsReference = gsReference(storage, file);
  return await getDownloadURL(gsReference)
}

export { 
    app, 
    analytics, 
    auth, 
    googleProvider, 
    storage, 
    signInWithPopup, 
    signOut, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendEmailVerification, 
    fetchSignInMethodsForEmail,
    db,
    getFirebaseFileUrl
  };
