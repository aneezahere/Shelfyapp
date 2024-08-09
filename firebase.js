// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "pantrytracking.firebaseapp.com",
  projectId: "pantrytracking",
  storageBucket: "pantrytracking.appspot.com",
  messagingSenderId: "57108758196",
  appId: "1:57108758196:web:d0c233b5d7073a650e21e1",
  measurementId: "G-QVTEGE1PD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
