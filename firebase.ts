// firebase.ts
import { initializeApp } from "firebase/app";

// Configuration Firebase de ton projet BOB
const firebaseConfig = {
  apiKey: "AIzaSyBpLxy_gTwWQG7uoGtZ0Vo5epRYY5lQw-I",
  authDomain: "bob-8191f.firebaseapp.com",
  projectId: "bob-8191f",
  storageBucket: "bob-8191f.firebasestorage.app",
  messagingSenderId: "385231279926",
  appId: "1:385231279926:web:4b355c17c7f70bb56c4597"
};

// Initialisation de Firebase
export const app = initializeApp(firebaseConfig);
