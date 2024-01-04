// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEXM15WrtCQoRVqXkNe-yiOoDOq8dxml8",
  authDomain: "kycform-23761.firebaseapp.com",
  projectId: "kycform-23761",
  storageBucket: "kycform-23761.appspot.com",
  messagingSenderId: "562213492530",
  appId: "1:562213492530:web:00cb93766dd15f01b2692b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
