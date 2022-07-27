import React from 'react'
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase/firebaseconfig';





export async function CreateProblemParam(location, params, id) {
    const ref="/Projects/"+id+"/"+'Problems/'+location;
    console.log(ref, params, id);
    await updateDoc(doc(db, ref), {
        'params': params});
    }
