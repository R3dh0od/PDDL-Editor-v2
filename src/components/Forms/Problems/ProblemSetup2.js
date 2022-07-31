import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {selectAddParams, selectCurrentProject} from '../../../features/userSlice';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseconfig';
import { DeleteVariableTemp } from '../DeleteVariable';
import ConstructionIcon from '@mui/icons-material/Construction';

import {useEffect} from "react";
import GutterlessListObject from "./ListObject";
import FullWidthTabsProblems from "./ProblemsWorkspace";


const theme = createTheme();
let projectNumber=0;
let projectNumber2=0;
export default function NewAction() {

    const id=useSelector(selectCurrentProject).id;
    const currentProblem=useSelector(selectAddParams);

    const ref='';
    const ref2="PredicateTempData";
    const ref3="/Projects/"+id+"/ProblemObjectData";
    const q2 = query(collection(db, ref3));
    const [objectList, setObjectList] = React.useState([]);
    const [predParamsID, setPredParamsID] = React.useState([]);

    const objects=[];
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
                objects.push(doc.data());
            })
            setObjectList(objects);
        });
    },[])



    const navigate= useNavigate();
    const handleCreate = (event) => {
        event.preventDefault();

        const params={

        };
       // CreateVariable(data.get('name'), "Actions", params, id);
       // console.log(params);
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

                        <Button

                            fullWidth
                            color='primary'
                            variant="contained"

                            sx={{ mt: 3, mb: 0 }}

                            onClick={()=>{navigate("/newproblempredicate");}}
                        >
                            Instantiate Predicate
                        </Button>

                        <Button

                            fullWidth
                            color='primary'
                            variant="contained"

                            sx={{ mt: 3, mb: 0 }}

                            onClick={()=>{navigate("/newproblemfunction");}}
                        >
                            Instantiate Function
                        </Button>

                        <Button

                            fullWidth
                            color='primary'
                            variant="contained"

                            sx={{ mt: 3, mb: 3 }}

                            onClick={()=>{navigate("/newproblemgoal");}}
                        >
                            Create New Goal
                        </Button>
                        <FullWidthTabsProblems />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}

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