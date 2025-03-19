// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx3BliYlpIlUMGh3N5c067oMo2TO4VC2s",
  authDomain: "song-request-app-2790e.firebaseapp.com",
  projectId: "song-request-app-2790e",
  storageBucket: "song-request-app-2790e.firebasestorage.app",
  messagingSenderId: "1064169039210",
  appId: "1:1064169039210:web:66414cd21d426c01a9b113",
  measurementId: "G-R2Z2F7XWSM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);