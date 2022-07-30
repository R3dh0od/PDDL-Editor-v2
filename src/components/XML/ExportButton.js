import {Button} from "@mui/material";
import {Stack} from "@mui/material";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {useSelector} from "react-redux";
import {selectCurrentProject} from "../../features/userSlice";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../../firebase/firebaseconfig";
import {useEffect, useState} from "react";
import ExportXMLTypes from "./exportXMLTypes";
import ExportXMLPreds from "./exportXMLPreds";
import ExportXMLFunctions from "./exportXMLFunctions";
import ExportXMLStates from "./exportXMLStates";
import ExportXMLActions from "./exportXMLActions";
import ExportXMLProblems from "./exportXMLProblems";



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
    let types=[];
    let preds=[];
    let functions=[];
    let states=[];
    let actions=[];
    let problems=[];
    let types2=[];
    let preds2=[];
    let functions2=[];
    let states2=[];
    let actions2=[];
    let problems2=[];
    let XMLFile='';
    const [projectTypeData, setProjectTypeData] = useState([]);
    const [projectPredData, setProjectPredData] = useState([]);
    const [projectFxData, setProjectFxData] = useState([]);
    const [projectStateData, setProjectStateData] = useState([]);
    const [projectActionData, setProjectActionData] = useState([]);
    const [projectProblemData, setProjectProblemData] = useState([]);
    useEffect(()=>{
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

    },[]);


    const HandleClick=(e)=>{

        for(let i=1; i<projectTypeData.length; i++){
            types.push([projectTypeData[i].name, projectTypeData[i].subtypeOf]);
        }
        for(let i=0; i<projectPredData.length; i++){
            preds.push([
                projectPredData[i].name,
                projectPredData[i].persistent,
                projectPredData[i].static,
                projectPredData[i].dynamic,
                projectPredData[i].internal,
                projectPredData[i].sensed,
                projectPredData[i].Params,
            ]);
        }
        for(let i=0; i<projectFxData.length; i++){
            functions.push([
                projectFxData[i].name,
                projectFxData[i].persistent,
                projectFxData[i].static,
                projectFxData[i].dynamic,
                projectFxData[i].internal,
                projectFxData[i].sensed,
                projectFxData[i].defaultValue,
                projectFxData[i].Params,
            ]);
        }
        for(let i=0; i<projectStateData.length; i++){
            states.push([
                projectStateData[i].name,
                projectStateData[i].checkpoint,
                projectStateData[i].predParams,
                projectStateData[i].functionParams,
            ]);
        }
        for(let i=0; i<projectActionData.length; i++){
            actions.push([
                projectActionData[i].name,
                projectActionData[i].InitialState,
                projectActionData[i].EndState,
                projectActionData[i].EndOfLoop,
                projectActionData[i].ParamsPred,
                projectActionData[i].ParamsFx,
            ]);
        }
        for(let i=0; i<projectProblemData.length; i++){
            problems.push([
                projectProblemData[i].name,
                projectProblemData[i].metric,
                projectProblemData[i].function,
            ]);
        }
        types2=ExportXMLTypes(types);
        preds2=ExportXMLPreds(preds);
        functions2=ExportXMLFunctions(functions);
        states2=ExportXMLStates(states);
        actions2=ExportXMLActions(actions);
        problems2=ExportXMLProblems(problems);

        XMLFile=types2+'\n'+preds2+'\n'+functions2+'\n'+states2+'\n'+actions2+'\n'+problems2;

        types=[];
        preds=[];
        functions=[];
        states=[];
        actions=[];
        problems=[];
        var FileSaver = require('file-saver');
        var blob = new Blob([XMLFile], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "CurrentModel.xml");
    }

    return(

           <Button variant="contained" startIcon={<SaveAltIcon/>} onClick={HandleClick}>
                Save model
            </Button>
    );
}