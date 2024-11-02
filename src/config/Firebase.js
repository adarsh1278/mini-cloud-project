// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "cloud-file-manager-5356b.firebaseapp.com",
    projectId: "cloud-file-manager-5356b",
    storageBucket: "cloud-file-manager-5356b.appspot.com",
    messagingSenderId: "923127513551",
    appId: "1:923127513551:web:459c044061c66b524592ba",
    measurementId: "G-BGY35DQ42T",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
