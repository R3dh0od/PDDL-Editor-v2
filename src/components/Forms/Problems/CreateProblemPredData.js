import React from 'react'
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase/firebaseconfig';





export async function CreateProblemParam2(params, id, location) {
    const ref="/Projects/"+id+"/"+location;
    //console.log(ref, params, id);
    await addDoc(collection(db, ref), params);
}
