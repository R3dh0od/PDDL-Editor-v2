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
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { CreateVariable } from '../saveVariables';
import { useSelector } from 'react-redux';
import {selectAddParams, selectCurrentProject} from '../../../features/userSlice';
import { db } from '../../../firebase/firebaseconfig';
import { collection, query, onSnapshot } from 'firebase/firestore';
import XMLGenerator from '../../XML/exportXMLTypes';
import GetDataFromDB from "../../../firebase/getDataFromDB";
import {useEffect} from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {CreateProblemParam} from "./CreateProblemDBParams";


const theme = createTheme({
    palette: {
        type: "dark"
    }
});


let projectNumber=0;
export default function NewProblemObject() {

    const [selectItem, setSelectItem] = React.useState([]);
    const [checked, setChecked] = React.useState(false);

    const id=useSelector(selectCurrentProject).id;
    const currentProblem=useSelector(selectAddParams);

    const ref="/Projects/"+id+"/Types";
    const ref2="/Projects/"+id+"/ProblemObjectData";
    const q = query(collection(db, ref));
    const q2 = query(collection(db, ref2));


    const [subtype, setSubtype] = React.useState([]);
    const [form2, setForm2] = React.useState([]);
    const navigate= useNavigate();

    const handleCreate = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const params={
            'problem': currentProblem,
            name: data.get('name'),
            type: selectItem,
            constant: checked,
        };
        CreateProblemParam(params, id, 'ProblemObjectData');
        //CreateVariable(data.get('name'), "Types", params, id);
        //console.log(params);
        navigate("/newproblemsetup");

    };

    const projects=[];
    const objects=[];

    useEffect(()=>{
        onSnapshot(q,(querySnapshot)=>{

            querySnapshot.forEach((doc)=>{
                projects.push(doc.data());
            })
            //console.log(projects);
            setSubtype(projects);
        });
    },[]);

    const handleChangeMultiple = (event) => {
        event.preventDefault();
        const temporalData=event.target.value;
        setSelectItem(temporalData);
        subtype.map((value)=>{
            if(temporalData==value.name){
                setForm2(value.Params);
            }

        })
    };

    const handleChangeCheck = (event) => {
        setChecked(event.target.checked);
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
                        New Object
                    </Typography>
                    <Box component="form" onSubmit={handleCreate} noValidate sx={{ mt: 1 }}>
                        <FormControlLabel control={<Checkbox name='Constant' checked={checked} onChange={handleChangeCheck} />} label="Constant" />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />


                        <InputLabel shrink htmlFor="select-multiple-native">
                            Type
                        </InputLabel>
                        <Select

                            fullWidth
                            value={selectItem}
                            onChange={handleChangeMultiple}
                            inputProps={{
                                id: 'select-multiple-native',
                            }}
                        >
                            {subtype.map((name) => (
                                <MenuItem value={name.name} key={name.name}>{name.name}</MenuItem>
                            ))}
                        </Select>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}

                        >
                            Create
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