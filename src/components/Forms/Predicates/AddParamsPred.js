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
import { selectAddParams, selectCurrentProject, selectPredParams, selectUserID, selectUserImage, selectUserName, setPredParams } from '../../../features/userSlice';
import { db } from '../../../firebase/firebaseconfig';
import { collection, query, onSnapshot } from 'firebase/firestore';
import temporalVar from '../temporalVariables';
import { CreateVariableTemp } from '../saveTemporalVariables';
import {useEffect} from "react";


const theme = createTheme({
  palette: {
    type: "dark"
  }
});


let projectNumber=0;
export default function AddPredParams() {
  
  const dispatch= useDispatch();
  const addParams=useSelector(selectAddParams);
  const uid= useSelector(selectUserID);
  const name= useSelector(selectUserName);
  const image= useSelector(selectUserImage);
  const currentProject= useSelector(selectCurrentProject);
  const aux= useSelector(selectPredParams);
  const ref2="PredicateTempData";
  const [selectItem, setSelectItem] = React.useState([]);

  const id=useSelector(selectCurrentProject).id;
  
  const ref="/Projects/"+id+"/Types";
  const q = query(collection(db, ref));
  
  const [form, setForm]=React.useState([]);
  const [subtype, setSubtype] = React.useState([]);
  const navigate= useNavigate();
  const handleChangeSubtype = (event) => {
    setSubtype(event.target.value);
  };
  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params={
      name: data.get('name'),

      type: subtype[projectNumber].name,
      
  };
  
  CreateVariableTemp(ref2, params, id);
    
  setForm(params);
  //aux2.push(params);
 
 // console.log(aux2,aux,name);
  
  dispatch(setPredParams({
    userName: name,
    userUid: uid,
    userImage: image,
    currentProject: currentProject,
    predParams: params,
  }))  
  navigate("/newpredicate", {state: params});
 
    
  };
  
    const projects=[];
    const projectListNames=[];
   useEffect(()=>{
       onSnapshot(q,(querySnapshot)=>{

           querySnapshot.forEach((doc)=>{
               projects.push(doc.data());
           })
           //console.log(projects);
           setSubtype(projects);

       })
   },[]);

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
            <AddCircleOutlineOutlinedIcon fontSize='large'/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Parameter
          </Typography>
          <Box component="form" onSubmit={handleCreate} noValidate sx={{ mt: 1 }}>
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
          
          native
          fullWidth
          value={selectItem}
          onChange={handleChangeMultiple}
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
          {subtype.map((name) => (
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
              
              ADD
            </Button>
            <Button
              color='secondary'
              onClick={()=>{navigate("/NewPredicate");}}
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