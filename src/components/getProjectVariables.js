import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentProject } from '../features/userSlice';
import { db } from '../firebase/firebaseconfig';
import { collection, query, where, getDocs } from "firebase/firestore";



export async function GetVariables() {
  const ref="/Projects/"+"3UB4zusCG0kAsOt9pmtk"+"/"+"Types";
  

  const q = query(collection(db, ref));
  
   
  const projectData =[];
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        projectData.push(doc.data());
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      console.log(projectData);
    });
    return(
      projectData
    )
   
}

