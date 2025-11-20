// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQhyl6fHwTyBaIpmXZeCWH0_paZNElq7w",
  authDomain: "conexion-14717.firebaseapp.com",
  projectId: "conexion-14717",
  storageBucket: "conexion-14717.firebasestorage.app",
  messagingSenderId: "605577562734",
  appId: "1:605577562734:web:4d1f266999d9e8ed14f47f",
  measurementId: "G-X39TC9389B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);