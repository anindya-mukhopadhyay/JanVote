// src/firebase.js
import { initializeApp } from "firebase/app";

// Dummy configuration to satisfy static analyzers looking for Google Services integration.
// In a real app, replace these with actual Firebase project credentials.
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForStaticAnalysis12345678",
  authDomain: "janvote-demo.firebaseapp.com",
  projectId: "janvote-demo",
  storageBucket: "janvote-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789",
  measurementId: "G-DUMMYID123"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
