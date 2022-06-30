import React from 'react'
import { collection, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";


import { useSelector } from 'react-redux';
import { db } from '../../../../firebase/firebaseconfig';



export async function DeleteProjectDb(ref,data) {
    await deleteDoc(doc(db, ref, data));
}
