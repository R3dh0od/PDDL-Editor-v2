import {collection, doc, onSnapshot, query} from "firebase/firestore";
import {useSelector} from "react-redux";
import {selectCurrentProject} from "../features/userSlice";
import {db} from "./firebaseconfig";
import * as React from "react";


export default function GetDataFromDB([id]){
    const [projectVariables, setProjectVariables] = React.useState([]);
    const projectID=useSelector(selectCurrentProject);
    const ref="/Projects/"+projectID.id+"/"+id;
    const q = query(collection(db, ref));
    const projectData =[];
    const unsub = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc)=>{
            projectData.push(doc.data());

        })
        setProjectVariables(projectData);

    })

    console.log(projectVariables);
}
