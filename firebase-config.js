// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Replace this with your real Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCdlLh9F4AFM6hf8tC7F9PA9bEId6TeRZQ",
  authDomain: "vs-3-5fc2b.firebaseapp.com",
  projectId: "vs-3-5fc2b",
  storageBucket: "vs-3-5fc2b.appspot.com",
  messagingSenderId: "20790529796",
  appId: "1:20790529796:web:f0407562caab24c0594a51",
  measurementId: "G-W4G1C7MHLC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.firebase = {
  auth,
  db,
  signInWithPopup,
  GoogleAuthProvider,
  doc,
  getDoc,
  setDoc
};
