import {Button} from "@mui/material";
import {Stack} from "@mui/material";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {useSelector} from "react-redux";
import {selectCurrentProject} from "../../features/userSlice";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../../firebase/firebaseconfig";
import {useState} from "react";
import ExportXMLTypes from "./exportXML";

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
    const refTypes="/Projects/"+projectID.id+"/"+id[0];
    const refPred="/Projects/"+projectID.id+"/"+id[1];
    const refFx="/Projects/"+projectID.id+"/"+id[2];
    const refState="/Projects/"+projectID.id+"/"+id[3];
    const refAction="/Projects/"+projectID.id+"/"+id[4];
    const refProblem="/Projects/"+projectID.id+"/"+id[5];
    const q = query(collection(db, refTypes));
    const q2 = query(collection(db, refPred));
    const q3 = query(collection(db, refFx));
    const q4 = query(collection(db, refState));
    const q5 = query(collection(db, refAction));
    const q6 = query(collection(db, refProblem));
    const projectTypes =[];
    const projectPreds =[];
    const projectFx =[];
    const projectStates =[];
    const projectActions =[];
    const projectProblems =[];
    const types=[];
    const preds=[];
    const functions=[];
    const states=[];
    const actions=[];
    const problems=[];
    const [projectTypeData, setProjectTypeData] = useState([]);
    const [projectPredData, setProjectPredData] = useState([]);
    const [projectFxData, setProjectFxData] = useState([]);
    const [projectStateData, setProjectStateData] = useState([]);
    const [projectActionData, setProjectActionData] = useState([]);
    const [projectProblemData, setProjectProblemData] = useState([]);
    onSnapshot(q,(querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            projectTypes.push(doc.data());
        })
        setProjectTypeData(projectTypes);
    })
    onSnapshot(q2,(querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            projectPreds.push(doc.data());
        })
        setProjectPredData(projectPreds);
    })
    onSnapshot(q3,(querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            projectFx.push(doc.data());
        })
        setProjectFxData(projectFx);
    })
    onSnapshot(q4,(querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            projectStates.push(doc.data());
        })
        setProjectStateData(projectStates);
    })
    onSnapshot(q5,(querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            projectActions.push(doc.data());
        })
        setProjectActionData(projectActions);
    })
    onSnapshot(q6,(querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            projectProblems.push(doc.data());
        })
        setProjectProblemData(projectProblems);
    })


    const HandleClick=(e)=>{

        for(let i=1; i<projectTypeData.length; i++){
            types.push([projectTypeData[i].name, projectTypeData[i].subtypeOf]);
        }
        ExportXMLTypes(types);
    }

    return(

           <Button variant="contained" startIcon={<SaveAltIcon/>} onClick={HandleClick}>
                Save model
            </Button>
    );
}