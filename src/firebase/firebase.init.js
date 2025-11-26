// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkPGBzGWwJI1gWOlx9Vxo36g6_1qGFiLc",
  authDomain: "freelance-marketplace-87993.firebaseapp.com",
  projectId: "freelance-marketplace-87993",
  storageBucket: "freelance-marketplace-87993.firebasestorage.app",
  messagingSenderId: "639765585342",
  appId: "1:639765585342:web:bcec166f7544af4a556def"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);