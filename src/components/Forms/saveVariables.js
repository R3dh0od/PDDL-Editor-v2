import React from 'react'
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

import { db } from '../../firebase/firebaseconfig';
import { useSelector } from 'react-redux';
import { selectCurrentProject } from '../../features/userSlice';


export async function CreateVariable(name, type, params, id) {
  const ref="/Projects/"+id+"/"+type;
  console.log(ref, params, id);
  await setDoc(doc(db, ref, name), params)
  
   
}
