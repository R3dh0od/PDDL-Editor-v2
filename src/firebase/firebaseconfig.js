import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

//credenciales para el proyecto en firebase
const firebaseConfig = {
  apiKey: "AIzaSyDObzS7K7Bb56hTFrJ6NxISL77Dp6-_ifc",
  authDomain: "uc3m-inf-plg-pddleditor.firebaseapp.com",
  databaseURL: "https://uc3m-inf-plg-pddleditor-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "uc3m-inf-plg-pddleditor",
  storageBucket: "uc3m-inf-plg-pddleditor.appspot.com",
  messagingSenderId: "849304006423",
  appId: "1:849304006423:web:0fdcacc0d28b5190a3d152"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp)

export{
  auth, provider, db
}

