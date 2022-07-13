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
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { selectCurrentProject } from '../../../features/userSlice';
import { CreateVariable } from '../saveVariables';
import { IconButton } from '@mui/material';

import { useState } from 'react';
import GutterlessList from './listParamsPred';

import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseconfig';
import { DeleteVariableTemp } from '../DeleteVariable';


const theme = createTheme();

export default function NewPredicate() {

  let staticpred=true;
  let dynamic=false;
  let internal=true;
  let sensed=false;

  const navigate= useNavigate();
  const location =useLocation();
  const id=useSelector(selectCurrentProject).id;
  const [parameter, setParameter]=useState([]);
  const [alignment, setAlignment] = React.useState('static');
  const [alignment2, setAlignment2] = React.useState('internal');
  const [checked, setChecked] = React.useState(false);
  
  
  const ref2="PredicateTempData";
  const ref3="/Projects/"+id+"/PredicateTempData";
  const q = query(collection(db, ref3));
  const [predParams, setPredParams] = React.useState([]);
  const [predParamsID, setPredParamsID] = React.useState([]);

  const projects=[];
    const projectListNames=[];
   const data2 = onSnapshot(q,(querySnapshot)=>{
     
     querySnapshot.forEach((doc)=>{
       projects.push(doc.data());
       projectListNames.push(doc.id);
     })
     //console.log(projects);
     setPredParams(projects);
     setPredParamsID(projectListNames);

   })
  
  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };
  
  const handleAddParameter= (event)=>{
    event.preventDefault();
    navigate("/addpredparams");
  }
  
  const handleChangeToggleButton = (event, newAlignment) => {
    if(newAlignment=='static'){
      staticpred=true;
      dynamic=false;
    }
    else {
      staticpred=false;
      dynamic=true;
    }
    setAlignment(newAlignment);
  };
  const handleChangeToggleButton2 = (event, newAlignment) => {
    if(newAlignment=='internal'){
      internal=true;
      sensed=false;
    }
    else {
      internal=false;
      sensed=true;
    }
    setAlignment2(newAlignment);
  };
  
  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params={
      'name': data.get('name'),
      'persistent': checked,
      'static': staticpred,
      'dynamic': dynamic,
      'internal': internal,
      'sensed': sensed,
      'Params': predParams,
  };
  CreateVariable(data.get('name'), "Predicates", params, id);
   // console.log(params);
    DeleteVariableTemp(ref2, predParamsID, id);
   navigate("/dashboard");
    
  };
  const handleCancel=(event)=>{
    event.preventDefault();
    DeleteVariableTemp(ref2, predParamsID, id);
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
            New Predicate
          </Typography>
          <Box component="form" onSubmit={handleCreate} noValidate sx={{ mt: 1 }}>
          <FormControlLabel control={<Checkbox name='persistent' checked={checked} onChange={handleChangeCheck} />} label="Persistent" />
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
            <ToggleButtonGroup
              
              color="primary"
              value={alignment}
              name="cat1"
              exclusive
              onChange={handleChangeToggleButton}
              sx={{ p: 1 }}
            >
              <ToggleButton value="static">Static</ToggleButton>
              <ToggleButton value="dynamic">Dynamic</ToggleButton>
              
            </ToggleButtonGroup>
            <ToggleButtonGroup
              color="primary"
              value={alignment2}
              exclusive
              name="cat2"
              onChange={handleChangeToggleButton2}
              sx={{ p: 1 }}
            >
              <ToggleButton value="internal">internal</ToggleButton>
              <ToggleButton value="sensed">sensed</ToggleButton>
              
            </ToggleButtonGroup>

            <Button
              
              fullWidth
              color='primary'
              variant="contained"
              sx={{ mt: 3, mb: 0 }}
              onClick={handleAddParameter}
              
            >
              Add Parameter
            </Button>
            <GutterlessList params={predParams} />
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