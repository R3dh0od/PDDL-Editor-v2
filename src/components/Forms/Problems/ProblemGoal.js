import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Link, useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { CreateVariable } from '../saveVariables';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProject, selectPredParams, selectUserID, selectUserImage, selectUserName, setPredParams } from '../../../features/userSlice';
import { db } from '../../../firebase/firebaseconfig';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { Checkbox, FormControlLabel } from '@mui/material';
import { CreateVariableTemp } from '../saveTemporalVariables';

import {useEffect} from "react";
import {CreateVariableTempPredState} from "../States/tempData";


const theme = createTheme({
    palette: {
        type: "dark"
    }
});


let projectNumber=0;
export default function AddGoalProblem() {

    const id=useSelector(selectCurrentProject).id;

    const ref="/Projects/"+id+"/Predicates";
    const ref2="/Projects/"+id+"/ProblemObjectData";
    const q = query(collection(db, ref));
    const q2 = query(collection(db, ref2));


    const [form, setForm]=React.useState([]);
    const [form2, setForm2]=React.useState([]);
    const [form3, setForm3]=React.useState([]);
    const [subtype, setSubtype] = React.useState([]);
    const [objectList, setObjectList] = React.useState([]);
    const navigate= useNavigate();


    const projects=[];
    const objects=[];
    const additionalParams=[];
    const additionalParams2=[];
    useEffect(()=>{
        onSnapshot(q,(querySnapshot)=>{

            querySnapshot.forEach((doc)=>{
                projects.push(doc.data());
            })
            //console.log(projects);
            setForm(projects);

        });
        onSnapshot(q2,(querySnapshot)=>{

            querySnapshot.forEach((doc)=>{
                objects.push(doc.data());
            })
            //console.log(projects);
            setForm3(objects);

        })
    },[]);


    const handleChangeObject = (event) => {
        event.preventDefault();
        const temporalData=event.target.value;
        setObjectList([temporalData, temporalData, temporalData]);
    };
    const handleChangeSubtype = (event) => {
        event.preventDefault();
        const temporalData=event.target.value;
        setSubtype(temporalData);
        form.map((value)=>{
            if(temporalData==value.name){
                setForm2(value.Params);
            }

        })
    };

    const handleCreate = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        form2.map((value)=>(
            additionalParams.push(value),
                additionalParams2.push({variable: data.get(value.name)})
        ))

        const params={
            params: additionalParams,
            variables: additionalParams2,
            predicate: subtype,

        };

        //CreateVariableTempPredState(ref2, params, id);
        navigate("/newaction");

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
                        <AddCircleOutlineOutlinedIcon fontSize='large'/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        New Goal
                    </Typography>
                    <Box component="form" onSubmit={handleCreate} noValidate sx={{ mt: 1 }}>
                        <InputLabel shrink htmlFor="select-multiple-native">
                            Predicate
                        </InputLabel>
                        <Select
                            fullWidth
                            sx={{mb: 2}}
                            value={subtype}
                            onChange={handleChangeSubtype}
                            inputProps={{
                                id: 'select-multiple-native',
                            }}
                        >
                            {form.map((name) => (
                                <MenuItem value={name.name}>{name.name}</MenuItem>
                            ))}
                        </Select>
                        <Box>
                            {form2.map((value, index)=>(
                                <>
                                    <InputLabel shrink htmlFor="select-multiple-native">
                                        {value.name}
                                    </InputLabel>
                                    <Select
                                        fullWidth
                                        sx={{mb: 2}}
                                        value={objectList[index]}
                                        onChange={handleChangeObject}
                                        inputProps={{
                                            id: 'select-multiple-native',
                                        }}
                                    >

                                        {form3.map((name) => (
                                            <MenuItem value={name.name}>{name.name}</MenuItem>
                                        ))}

                                    </Select></>
                            ))}
                        </Box>

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
                            onClick={()=>{navigate("/newproblemsetup");}}
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