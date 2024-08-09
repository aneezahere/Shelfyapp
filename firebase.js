import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBMZ6fwKTxfoiXl4-v_avLeo93StHLXJAk",
    authDomain: "pantrytracking.firebaseapp.com",
    projectId: "pantrytracking",
    storageBucket: "pantrytracking.appspot.com",
    messagingSenderId: "57108758196",
    appId: "1:57108758196:web:d0c233b5d7073a650e21e1",
    measurementId: "G-QVTEGE1PD0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
