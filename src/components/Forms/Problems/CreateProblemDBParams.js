import React from 'react'
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase/firebaseconfig';





export async function CreateProblemParam(params, id) {
    const ref="/Projects/"+id+"/"+'ProblemObjectData';
    console.log(ref, params, id);
    await setDoc(doc(db, ref, params.name), params);
    }
