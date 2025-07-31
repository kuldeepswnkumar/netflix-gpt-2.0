// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCMr2WjOiO7hVCNkKJ7dR817mtblHYUffI",
    authDomain: "netflix-gpt-11443.firebaseapp.com",
    projectId: "netflix-gpt-11443",
    storageBucket: "netflix-gpt-11443.firebasestorage.app",
    messagingSenderId: "962081757322",
    appId: "1:962081757322:web:ad41d877c1f713efdb7573",
    measurementId: "G-RP0RQ4SZPP"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();