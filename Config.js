import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD8mnPJihC8AK59hBh8ZdqZmUhKsulxDdw",
  authDomain: "openinapp-assignment.firebaseapp.com",
  projectId: "openinapp-assignment",
  storageBucket: "openinapp-assignment.appspot.com",
  messagingSenderId: "623664697352",
  appId: "1:623664697352:web:c86bda1a991babf16a41bd",
  measurementId: "G-P487330V5Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
