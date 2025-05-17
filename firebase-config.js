// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getDatabase, ref, onValue, set, serverTimestamp, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const realtimeDB = getDatabase(app);
window.firebase.realtime = { realtimeDB, ref, onValue, set, serverTimestamp, remove };

const firebaseConfig = {
  apiKey: "AIzaSyCdLlh9F4fAMf6hBtC7F9PA3l-UkChjWkc",
  authDomain: "vs-3-5fc2b.firebaseapp.com",
  projectId: "vs-3-5fc2b",
  storageBucket: "vs-3-5fc2b.firebasestorage.app",
  messagingSenderId: "20790529796",
  appId: "1:20790529796:web:f0407562caab24c0594a51"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.firebase = { auth, db, signInWithPopup, GoogleAuthProvider, doc, getDoc, setDoc };
