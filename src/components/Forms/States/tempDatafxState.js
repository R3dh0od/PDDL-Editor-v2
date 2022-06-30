import React from 'react'
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from '../../../firebase/firebaseconfig';





export async function CreateVariableTempFxState(location, params, id) {
  const ref="/Projects/"+id+"/"+location;
  const name=params.function+params.operator+params.function2;
  console.log(ref, params, id);
  await setDoc(doc(db, ref, name), params)
}