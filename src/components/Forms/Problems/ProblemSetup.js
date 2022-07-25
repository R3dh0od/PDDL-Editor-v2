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
import { selectCurrentProject } from '../../../features/userSlice';
import { db } from '../../../firebase/firebaseconfig';
import { collection, onSnapshot, query } from 'firebase/firestore';
import {useEffect} from "react";
import ConstructionIcon from '@mui/icons-material/Construction';


const theme = createTheme({
    palette: {
        type: "dark"
    }
});
let projectNumber=0;
export default function ProblemSetup() {
    const id=useSelector(selectCurrentProject).id;
    const navigate= useNavigate();

//conexion a db para obtener listado de funciones
    const [functionList, setFunctionList] = React.useState([]);
    const [selectItem, setSelectItem] = React.useState([]);
    const ref="/Projects/"+id+"/Problems";
    const q = query(collection(db, ref));
    const functions=[];

    useEffect(()=>{
        onSnapshot(q,(querySnapshot)=>{

            querySnapshot.forEach((doc)=>{
                functions.push(doc.data());
            })
            //console.log(projects);
            setFunctionList(functions);
        })
    },[]);

    const handleCreate = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const params={
            function: functionList[projectNumber].name,
        };

        //CreateVariable(data.get('name'), "Problems", params, id);
        console.log(params);
        //navigate("/dashboard");

    };
    const handleChangeMultiple = (event) => {
        event.preventDefault();
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
                projectNumber=i;
            }
        }
        setSelectItem(value);

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
                        Problem Setup
                    </Typography>
                    <Box component="form" onSubmit={handleCreate} noValidate sx={{ mt: 1 }}>

                        <InputLabel id="demo-simple-select-label">Select Problem</InputLabel>
                        <Select

                            native
                            fullWidth
                            value={selectItem}
                            onChange={handleChangeMultiple}
                            inputProps={{
                                id: 'select-multiple-native',
                            }}
                        >
                            {functionList.map((name) => (
                                <option key={name.name} value={name.name}>
                                    {name.name}
                                </option>
                            ))}
                        </Select>



                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}

                        >
                            Configure
                        </Button>
                        <Button
                            color='secondary'
                            onClick={()=>{navigate("/dashboard");}}
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