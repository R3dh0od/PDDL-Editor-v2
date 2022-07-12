import {Button} from "@mui/material";
import {Stack} from "@mui/material";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {useSelector} from "react-redux";
import {selectCurrentProject} from "../../features/userSlice";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../../firebase/firebaseconfig";
import {useState} from "react";

export default function ExportButton(){
    const id=[
        "Types",
        "Predicates",
        "Functions",
        "States",
        "Actions",
        "Problems",
    ];
    const projectID=useSelector(selectCurrentProject);
    const ref="/Projects/"+projectID.id+"/"+id[0];
    const q = query(collection(db, ref));
    const projectData =[];
    const [projectVariables, setProjectVariables] = useState([]);
    const data2 = onSnapshot(q,(querySnapshot)=>{

        querySnapshot.forEach((doc)=>{
            projectData.push(doc.data());

        })
        //console.log(projects);

        setProjectVariables(projectData);



    })
    const HandleClick=(e)=>{
        console.log(Object.values(projectVariables));
    }

    return(

           <Button variant="contained" startIcon={<SaveAltIcon/>} onClick={HandleClick}>
                Save model
            </Button>
    );
}