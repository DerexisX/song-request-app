// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue } from "firebase/database";
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

// Add detailed error handling for initialization
try {
  console.log("Attempting to initialize Firebase with config:", firebaseConfig);
  
  // Check if Firebase is already initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully");
  } else {
    console.log("Firebase already initialized");
  }
  
  // Create and export the db connection
  window.db = firebase.firestore();
  console.log("Firestore db created successfully");
  
  // Test the connection
  window.db.collection('test').get()
    .then(() => {
      console.log("Firestore connection verified");
    })
    .catch(error => {
      console.error("Firestore connection test failed:", error);
    });
  
} catch (error) {
  console.error("Error during Firebase initialization:", error);
  alert("Firebase initialization failed. Check console for details.");
}
try {
  // Your Firebase code
} catch (error) {
  console.error("Detailed error:", error.message, error.code);
}