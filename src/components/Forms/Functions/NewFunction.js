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

import { DeleteVariableTemp } from '../DeleteVariable';
import { collection, onSnapshot, query } from 'firebase/firestore';
import GutterlessList from '../Predicates/listParamsPred';
import { db } from '../../../firebase/firebaseconfig';
import {useEffect} from "react";

const theme = createTheme();

export default function NewFunction() {

  let staticpred=true;
  let dynamic=false;
  let internal=true;
  let sensed=false;

  const id=useSelector(selectCurrentProject).id;
  const [alignment, setAlignment] = React.useState('static');
  const [alignment2, setAlignment2] = React.useState('internal');
  const [checked, setChecked] = React.useState(false);

  const ref2="FunctionTempData";
  const ref3="/Projects/"+id+"/FunctionTempData";
  const q = query(collection(db, ref3));
  const [FxParams, setFxParams] = React.useState([]);
  const [FxParamsID, setFxParamsID] = React.useState([]);

  const projects=[];
  const projectListNames=[];
  useEffect(()=>{
    onSnapshot(q,(querySnapshot)=>{

      querySnapshot.forEach((doc)=>{
        projects.push(doc.data());
        projectListNames.push(doc.id);
      })
      //console.log(projects);
      setFxParams(projects);
      setFxParamsID(projectListNames);

    })
  },[]);

  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };
  

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
    if(newAlignment=='static'){
      staticpred=true;
      dynamic=false;
    }
    else {
      staticpred=false;
      dynamic=true;
    }
    setAlignment2(newAlignment);
  };
  const handleAddParameter= (event)=>{
    event.preventDefault();
    
    navigate("/addfunctionparams");
    
  }
  const navigate= useNavigate();
  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params={
      'name': data.get('name'),
      'defaultValue': data.get('defaultValue'),
      'persistent': checked,
      'static': staticpred,
      'dynamic': dynamic,
      'internal': internal,
      'sensed': sensed,
      'Params': FxParams,
  };
  CreateVariable(data.get('name'), "Functions", params, id);
    console.log(params);
    DeleteVariableTemp(ref2, FxParamsID, id);
   navigate("/dashboard");
    
  };

  const handleCancel=(event)=>{
    event.preventDefault();
    DeleteVariableTemp(ref2, FxParamsID, id);
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
            New Function
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="filled-number"
              label="Default Value"
              type="number"
              name="defaultValue"
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
           
            <GutterlessList params={FxParams} />
            
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