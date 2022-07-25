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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CreateVariable } from '../saveVariables';
import { useSelector } from 'react-redux';
import { selectCurrentProject } from '../../../features/userSlice';
import GutterlessListPredState from './listPredStates';
import { db } from '../../../firebase/firebaseconfig';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { DeleteVariableTemp } from '../DeleteVariable';
import GutterlessListFxState from './listFxStates';
import {useEffect} from "react";

const theme = createTheme();

export default function NewState() {
  const id=useSelector(selectCurrentProject).id;
  const [checked, setChecked] = React.useState(false);

  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };
  
  const ref2="PredicateTempData";
  const ref3="/Projects/"+id+"/PredicateTempData";
  const ref4="FxTempData";
  const ref5="/Projects/"+id+"/FxTempData";
  const q = query(collection(db, ref3));
  const q2 = query(collection(db, ref5));
  const [predParams, setPredParams] = React.useState([]);
  const [predParamsID, setPredParamsID] = React.useState([]);
  const [fxParams, setFxParams] = React.useState([]);
  const [fxParamsID, setFxParamsID] = React.useState([]);

  const projects2=[];
  const projectListNames2=[];
 const data3 = onSnapshot(q2,(querySnapshot)=>{
   
   querySnapshot.forEach((doc)=>{
     projects2.push(doc.data());
     projectListNames2.push(doc.id);
   })
   //console.log(projects);
   setFxParams(projects2);
   setFxParamsID(projectListNames2);
   

 })

  const projects=[];
    const projectListNames=[];
    useEffect(()=>{
        onSnapshot(q,(querySnapshot)=>{

            querySnapshot.forEach((doc)=>{
                projects.push(doc.data());
                projectListNames.push(doc.id);
            })
            //console.log(projects);
            setPredParams(projects);
            setPredParamsID(projectListNames);

        })
    },[]);

   

  
  const navigate= useNavigate();
  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params={
      'name': data.get('name'),
      'checkpoint': checked,
      'predParams': predParams,
      'functionParams': fxParams,
  };
  CreateVariable(data.get('name'), "States", params, id);
  DeleteVariableTemp(ref2, predParamsID, id);
  DeleteVariableTemp(ref4, fxParamsID, id);
    
   navigate("/dashboard");
    
  };

  const handleCancel=(event)=>{
    event.preventDefault();
    DeleteVariableTemp(ref2, predParamsID, id);
    DeleteVariableTemp(ref4, fxParamsID, id);
    navigate("/dashboard");
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
            New State
          </Typography>
          <Box component="form" onSubmit={handleCreate} noValidate sx={{ mt: 1 }}>
          <FormControlLabel 
          control={<Checkbox name='beginningIsland' checked={checked} onChange={handleChangeCheck} />} 
          label="Checkpoint" />
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
            <Button
              
              fullWidth
              color='primary'
              variant="contained"
              onClick={()=>{navigate("/addStateParams");}}
              sx={{ mt: 3, mb: 0 }}
              
              
            >
              Add Predicate
            </Button>
            <GutterlessListPredState params={predParams} />
            <Button
              
              fullWidth
              color='primary'
              variant="contained"
              onClick={()=>{navigate("/addstatefunction");}}
              sx={{ mt: 0, mb: 0 }}
              
              
            >
              Add Function
            </Button>
            <GutterlessListFxState params={fxParamsID} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 2 }}
              
            >
              Create
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