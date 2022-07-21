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
import { CreateVariableTempPredAction } from './saveTemporalActions';
import {useEffect} from "react";
import {CreateVariableTempPredState} from "../States/tempData";


const theme = createTheme({
  palette: {
    type: "dark"
  }
});


let projectNumber=0;
export default function AddPredAction() {

  const id=useSelector(selectCurrentProject).id;
  
  const ref="/Projects/"+id+"/Predicates";
  const ref2="PredicateTempData";
  const q = query(collection(db, ref));
  

  const [form, setForm]=React.useState([]);
  const [form2, setForm2]=React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [subtype, setSubtype] = React.useState([]);
  const navigate= useNavigate();


    const projects=[];
    const additionalParams=[];
    const additionalParams2=[];
 useEffect(()=>{
     onSnapshot(q,(querySnapshot)=>{

         querySnapshot.forEach((doc)=>{
             projects.push(doc.data());
         })
         //console.log(projects);
         setForm(projects);

     })
 },[]);


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
            not: checked,
            params: additionalParams,
            variables: additionalParams2,
            predicate: subtype,

        };

        CreateVariableTempPredState(ref2, params, id);
        navigate("/newaction");

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
            Add Predicate
          </Typography>
          <Box component="form" onSubmit={handleCreate} noValidate sx={{ mt: 1 }}>
            <FormControlLabel 
            control={<Checkbox name='beginningIsland' checked={checked} onChange={handleChangeCheck} />} 
            label="NOT" />
            <Select
              
              
              fullWidth
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
                  {form2.map((value)=>(
                      <TextField
                          margin="normal"
                          required
                          fullWidth
                          id={value.name}
                          label={'Variable name ('+value.name+'/'+value.type+')'}
                          name={value.name}
                          autoComplete="name"
                          autoFocus
                      />
                  ))}
              </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              
              ADD
            </Button>
            <Button
              color='secondary'
              onClick={()=>{navigate("/NewAction");}}
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