import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

//credenciales para el proyecto en firebase
const firebaseConfig = {
  apiKey: "AIzaSyAdEEhesO3j_ZB_c4Zkn0FEYz4ZoPmnyyk",
  authDomain: "pddl-editor.firebaseapp.com",
  projectId: "pddl-editor",
  storageBucket: "pddl-editor.appspot.com",
  messagingSenderId: "4257753924",
  appId: "1:4257753924:web:5bd1ff7ef20e9e4ae94511"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp)

export{
  auth, provider, db
}

