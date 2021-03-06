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
import { collection, query, onSnapshot } from 'firebase/firestore';
import XMLGenerator from '../../XML/exportXMLTypes';
import GetDataFromDB from "../../../firebase/getDataFromDB";
import {useEffect} from "react";


const theme = createTheme({
  palette: {
    type: "dark"
  }
});


let projectNumber=0;
export default function NewType() {

  const [selectItem, setSelectItem] = React.useState(['object']);

  const id=useSelector(selectCurrentProject).id;
  
  const ref="/Projects/"+id+"/Types";
  const q = query(collection(db, ref));
  
  
  const [subtype, setSubtype] = React.useState('');
  const [form, setForm]=React.useState([]);
  const [form2, setForm2]=React.useState([]);
  const navigate= useNavigate();
  


    const projects=[];
    
   useEffect(()=>{
       onSnapshot(q,(querySnapshot)=>{

           querySnapshot.forEach((doc)=>{
               projects.push(doc.data());
           })
           //console.log(projects);
           setForm(projects);
       })
   },[]);

   const handleChangeMultiple = (event) => {
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
        //event.preventDefault();
        const data = new FormData(event.currentTarget);
        const params={
            name: data.get('name'),

            subtypeOf: subtype,
        };

        CreateVariable(data.get('name'), "Types", params, id);
        // console.log(params);
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
            New Type
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
          Subtype of
        </InputLabel>
        <Select
          

          fullWidth
          value={subtype}
          onChange={handleChangeMultiple}
          inputProps={{
              id: 'select-multiple-native',
          }}

        >
          {form.map((name) => (
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