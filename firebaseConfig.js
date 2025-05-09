import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAS46HUYXWrMF92vldvdfQ7sVmHvKDAb5Y",
  authDomain: "herb-verse.firebaseapp.com",
  projectId: "herb-verse",
  storageBucket: "herb-verse.firebasestorage.app",
  messagingSenderId: "1042125787188",
  appId: "1:1042125787188:web:ba5fe3ddaef40346677a61",
  measurementId: "G-F2VETN3S6Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

