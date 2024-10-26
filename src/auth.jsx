// src/auth.js
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  fetchSignInMethodsForEmail 
} from './firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

// Sign up with email and password, then send verification email
export const registerWithEmail = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCredential.user);
  console.log('Verification email sent');
  return userCredential.user;
};

// Log in with email and password, checking for existing Google account
export const loginWithEmail = async (email, password) => {
  const signInMethods = await fetchSignInMethodsForEmail(auth, email);

  if (signInMethods.includes('google.com') && !signInMethods.includes('password')) {
    throw new Error('This email is registered with Google. Please use Google sign-in.');
  }

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  if (!user.emailVerified) {
    throw new Error('Please verify your email before logging in.');
  }
  return user;
};

// Log in with Google, checking for existing email/password account
export const loginWithGoogle = async (email) => {
  const signInMethods = await fetchSignInMethodsForEmail(auth, email);

  if (signInMethods.includes('password') && !signInMethods.includes('google.com')) {
    throw new Error('This email is registered with a password. Please use email/password sign-in.');
  }

  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

// Upload file to Firebase Storage
export const uploadFile = async (file) => {
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  const userId = auth.currentUser.uid;
  const fileRef = ref(storage, `uploads/${userId}/${file.name}`);
  const snapshot = await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

// Sign out user
export const logout = async () => {
  await signOut(auth);
};
