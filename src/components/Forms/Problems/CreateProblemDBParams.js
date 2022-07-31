import React from 'react'
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase/firebaseconfig';





export async function CreateProblemParam(params, id, location) {
    const ref="/Projects/"+id+"/"+location;
    //console.log(ref, params, id);
    await setDoc(doc(db, ref, params.name), params);
    }
