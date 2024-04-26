// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDflEGki2yXL6vGggMRJ5bClAC6wOSp3rc",
    authDomain: "capstone-ff37c.firebaseapp.com",
    projectId: "capstone-ff37c",
    storageBucket: "capstone-ff37c.appspot.com",
    messagingSenderId: "1074155293679",
    appId: "1:1074155293679:web:644ac12065e3ce4338841a",
    measurementId: "G-DSQCR718TQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app, auth}