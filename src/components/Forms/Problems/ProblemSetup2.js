import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CreateVariable } from '../saveVariables';
import { useSelector } from 'react-redux';
import {selectAddParams, selectCurrentProject} from '../../../features/userSlice';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseconfig';
import GutterlessList from '../Predicates/listParamsPred';
import { DeleteVariableTemp } from '../DeleteVariable';
import ConstructionIcon from '@mui/icons-material/Construction';

import GutterlessListFxState from '../States/listFxStates';
import {useEffect} from "react";


const theme = createTheme();
let projectNumber=0;
let projectNumber2=0;
export default function NewAction() {

    const id=useSelector(selectCurrentProject).id;
    const currentProblem=useSelector(selectAddParams);
    const [stateList, setStateList] = React.useState([]);
    const [stateList2, setStateList2] = React.useState([]);
    const [checked, setChecked] = React.useState(false);
    const [selectItem, setSelectItem] = React.useState([]);
    const [selectItem2, setSelectItem2] = React.useState([]);

    const ref2="PredicateTempData";
    const ref3="/Projects/"+id+"/PredicateTempData";
    const q2 = query(collection(db, ref3));
    const [predParams, setPredParams] = React.useState([]);
    const [predParamsID, setPredParamsID] = React.useState([]);

    const projects=[];
    const projectListNames=[];



    const ref4="FxTempData";
    const ref5="/Projects/"+id+"/FxTempData";
    const q3 = query(collection(db, ref5));
    const [fxParams, setFxParams] = React.useState([]);
    const [fxParamsID, setFxParamsID] = React.useState([]);

    const projects2=[];
    const projectListNames2=[];

    useEffect(()=>{
        onSnapshot(q2,(querySnapshot)=>{

            querySnapshot.forEach((doc)=>{
                projects.push(doc.data());
                projectListNames.push(doc.id);
            })
            //console.log(projects);
            setPredParams(projects);
            setPredParamsID(projectListNames);

        });
        onSnapshot(q3,(querySnapshot)=>{

            querySnapshot.forEach((doc)=>{
                projects2.push(doc.data());
                projectListNames2.push(doc.id);
            })
            //console.log(projects);
            setFxParams(projects2);
            setFxParamsID(projectListNames2);

        });
        onSnapshot(q,(querySnapshot)=>{

            querySnapshot.forEach((doc)=>{
                states.push(doc.data());
            })
            //console.log(projects);
            setStateList(states);
            setStateList2(states);
        });
    },[])






    const ref="/Projects/"+id+"/States";
    const q = query(collection(db, ref));
    const states=[];

    const handleChangeCheck = (event) => {
        setChecked(event.target.checked);
    };



    const navigate= useNavigate();
    const handleCreate = (event) => {
        event.preventDefault();

        const params={

        };
       // CreateVariable(data.get('name'), "Actions", params, id);
        console.log(params);
        //DeleteVariableTemp(ref2, predParamsID, id);
       // DeleteVariableTemp(ref4, fxParamsID, id);
        navigate("/dashboard");

    };

    const handleCancel=(event)=>{
        event.preventDefault();
        DeleteVariableTemp(ref2, predParamsID, id);
        DeleteVariableTemp(ref4, fxParamsID, id);
        navigate("/problemsetup");
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <ConstructionIcon fontSize='large'/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {currentProblem+' Setup'}
                    </Typography>
                    <Box component="form" onSubmit={handleCreate} noValidate sx={{ mt: 1 }}>
                        <Button

                            fullWidth
                            color='primary'
                            variant="contained"
                            onClick={()=>{navigate("/newproblemobject");}}
                            sx={{ mt: 3, mb: 0 }}


                        >
                            Create New Object
                        </Button>
                        <GutterlessListFxState params={fxParamsID} />
                        <Button

                            fullWidth
                            color='primary'
                            variant="contained"

                            sx={{ mt: 0, mb: 0 }}

                            onClick={()=>{navigate("/newproblempredicate");}}
                        >
                            Instantiate Predicate
                        </Button>
                        <GutterlessListFxState params={fxParamsID} />
                        <Button

                            fullWidth
                            color='primary'
                            variant="contained"

                            sx={{ mt: 0, mb: 0 }}

                            onClick={()=>{navigate("/addactionfunction");}}
                        >
                            Instantiate Function
                        </Button>
                        <GutterlessListFxState params={fxParamsID} />
                        <Button

                            fullWidth
                            color='primary'
                            variant="contained"

                            sx={{ mt: 0, mb: 0 }}

                            onClick={()=>{navigate("/addactionfunction");}}
                        >
                            Create New Goal
                        </Button>
                        <GutterlessListFxState params={fxParamsID} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 0, mb: 2 }}

                        >
                            Save
                        </Button>
                        <Button
                            color='secondary'
                            onClick={handleCancel}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 0, mb: 2 }}

                        >
                            Cancel
                        </Button>

                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}