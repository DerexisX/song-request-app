// Firebase configuration
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
  if (!firebase.apps || !firebase.apps.length) {
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
  console.error("Detailed error:", error.message, error.code);
}