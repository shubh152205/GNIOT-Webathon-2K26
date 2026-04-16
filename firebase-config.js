import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
  projectId: "kalnahiaajdaan-sync",
  appId: "1:747129710626:web:87289c9b71db2aeb5d427b",
  storageBucket: "kalnahiaajdaan-sync.firebasestorage.app",
  apiKey: "AIzaSyBNNS2eGqd1Pav1j4Nf-0iM8niWP5mtxjI",
  authDomain: "kalnahiaajdaan-sync.firebaseapp.com",
  messagingSenderId: "747129710626"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;
window.fbCollection = collection;
window.fbGetDocs = getDocs;
window.fbDoc = doc;
window.fbSetDoc = setDoc;
window.fbDeleteDoc = deleteDoc;

// Dispatch an event so other scripts know Firebase is ready
window.dispatchEvent(new Event("firebase-ready"));
