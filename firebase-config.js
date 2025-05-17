// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getDatabase, ref, onValue, set, serverTimestamp, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCdLlh9F4fAMf6hBtC7F9PA3l-UkChjWkc",
  authDomain: "vs-3-5fc2b.firebaseapp.com",
  projectId: "vs-3-5fc2b",
  storageBucket: "vs-3-5fc2b.appspot.com", // ✅ fix typo: 'firebaseapp.com' not 'firebasestorage.app'
  messagingSenderId: "20790529796",
  appId: "1:20790529796:web:f0407562caab24c0594a51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Core Services
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDB = getDatabase(app);

// Make Firebase available globally
window.firebase = {
  auth,
  db,
  signInWithPopup,
  GoogleAuthProvider,
  doc,
  getDoc,
  setDoc,
  realtime: { realtimeDB, ref, onValue, set, serverTimestamp, remove }
};
