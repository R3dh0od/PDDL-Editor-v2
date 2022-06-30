import React from 'react'
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../../../firebase/firebaseconfig';






export async function CreateVariableTempPredAction(location, params, id) {
  const ref="/Projects/"+id+"/"+location;
  console.log(ref, params, id);
  await setDoc(doc(db, ref, params.predicate), params)
  
   
}
