import React from 'react'
import { collection, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";

import { db } from '../../firebase/firebaseconfig';
import { useSelector } from 'react-redux';
import { selectCurrentProject } from '../../features/userSlice';


export function DeleteVariableTemp(location, params, id) {
  const ref="/Projects/"+id+"/"+location;

  params.map(async (value)=>(await deleteDoc(doc(db, ref, value))))
}
