// firebase-config.js

// Your Firebase config goes here
const firebaseConfig = {
  apiKey: "AIzaSyCdLlh9F4fAMf6hBtC7F9PA3l-UkChjWkc",
  authDomain: "vs-3-5fc2b.firebaseapp.com",
  projectId: "vs-3-5fc2b",
  storageBucket: "vs-3-5fc2b.firebasestorage.app",
  messagingSenderId: "20790529796",
  appId: "1:20790529796:web:f0407562caab24c0594a51"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Attach modules to window for global access
window.firebase = {
  auth: firebase.auth(),
  db: firebase.firestore(),
  signInWithPopup: firebase.auth().signInWithPopup,
  GoogleAuthProvider: firebase.auth.GoogleAuthProvider,
  doc: firebase.firestore().doc,
  getDoc: firebase.firestore().getDoc,
  setDoc: firebase.firestore().setDoc,
  updateDoc: firebase.firestore().updateDoc,
  collection: firebase.firestore().collection,
  getDocs: firebase.firestore().getDocs
};
