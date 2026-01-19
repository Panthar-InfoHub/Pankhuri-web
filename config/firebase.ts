import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwfKQzcrgRP1YHJeMD1z0GaFVIMpBzC7I",
  authDomain: "cogent-octane-423421-v1.firebaseapp.com",
  projectId: "cogent-octane-423421-v1",
  storageBucket: "cogent-octane-423421-v1.firebasestorage.app",
  messagingSenderId: "363001266182",
  appId: "1:363001266182:web:cd391c73b24858d1b88387",
  measurementId: "G-2BPGQ37P2E",
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const FirebaseAuth = getAuth(FirebaseApp);
export default FirebaseApp;