// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  collection, 
  query, 
  orderBy, 
  limit 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { 
  getDatabase, 
  ref, 
  onValue, 
  set, 
  serverTimestamp, 
  remove 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// ✅ Corrected config
const firebaseConfig = {
  apiKey: "AIzaSyCdLlh9F4fAMf6hBtC7F9PA3l-UkChjWkc",
  authDomain: "vs-3-5fc2b.firebaseapp.com",
  projectId: "vs-3-5fc2b",
  storageBucket: "vs-3-5fc2b.appspot.com", // ✅ corrected domain
  messagingSenderId: "20790529796",
  appId: "1:20790529796:web:f0407562caab24c0594a51"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Core Services
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDB = getDatabase(app);

// ✅ Export to global scope
window.firebase = {
  auth,
  db,
  signInWithPopup,
  GoogleAuthProvider,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  realtime: {
    realtimeDB,
    ref,
    onValue,
    set,
    serverTimestamp,
    remove
  }
};
