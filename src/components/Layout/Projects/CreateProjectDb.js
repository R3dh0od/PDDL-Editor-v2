import React from 'react'
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { selectUserID } from '../../../features/userSlice';
import { db } from '../../../firebase/firebaseconfig';
import { useSelector } from 'react-redux';



export async function CreateProjectDb(name,uid) {

    const createProject= await addDoc(collection(db, "Projects"), {
        ProjectName: name,
        uid: uid,
      })
    const id = createProject.id;
    const projectRef = doc(db,'Projects',id);
    setDoc(projectRef,{id: id},{merge: true})
      return(
       id
      );
     
}
