import React from 'react'
import { collection, query, where, getDocs, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { db } from '../../../firebase/firebaseconfig';


export function LoadUserProjects(){
    
    let projectData =[];
    const q = query(collection(db, "Projects"));
    
    /*
    const querySnapshot = getDocs(q);
    querySnapshot.forEach((doc) => {
        projectData.push(doc.data());
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      console.log(projectData);
    });
    return(
      projectData
    )
    */
    const data2 = onSnapshot(q,(querySnapshot)=>{
      const projects=[];
      querySnapshot.forEach((doc)=>{
        projects.push(doc.data().ProjectName);
      })
      console.log(projects);
      projectData=projects;
      console.log(projectData);
    })
    return(
      projectData
    )
  
}

