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


const theme = createTheme({
  palette: {
    type: "dark"
  }
});
let projectNumber=0;
export default function NewProblem() {
  const id=useSelector(selectCurrentProject).id;
  const [metric, setMetric] = React.useState("Minimize");
  const navigate= useNavigate();
  const handleChangeMetric = (event) => {
    setMetric(event.target.value);
  };

//conexion a db para obtener listado de funciones
const [functionList, setFunctionList] = React.useState([]);
const [selectItem, setSelectItem] = React.useState([]);
const ref="/Projects/"+id+"/Functions";
  const q = query(collection(db, ref));
  const functions=[{name: 'none'}];
    
   useEffect(()=>{
       onSnapshot(q,(querySnapshot)=>{

           querySnapshot.forEach((doc)=>{
               functions.push(doc.data());
           })
           //console.log(projects);
           setFunctionList(functions);
       })
   },[]);
//console.log(functionList);
  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params={
      name: data.get('name'),
      function: selectItem,
      metric: metric,

  };
  
  CreateVariable(data.get('name'), "Problems", params, id);
    //console.log(params);
   navigate("/dashboard");
    
  };
  const handleChangeMultiple = (event) => {
    event.preventDefault();
    const temporalData=event.target.value;
    //const value = [];
    /*for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
        projectNumber=i;
      }
    }*/
    setSelectItem(temporalData);
   
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
            New Problem
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
           
          <InputLabel id="demo-simple-select-label">Function</InputLabel>
          <Select
              fullWidth
              value={selectItem}
              onChange={handleChangeMultiple}
              inputProps={{
                id: 'select-multiple-native',
              }}
            >
              {functionList.map((name) => (
                  <MenuItem value={name.name} key={name.name}>{name.name}</MenuItem>
              ))}
        </Select>
            
        <InputLabel id="demo-simple-select-label">Metric</InputLabel>
            <Select
              
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              
              value={metric}
              fullWidth
              autoFocus
              onChange={handleChangeMetric}
            >
              <MenuItem value={"Minimize"}>Minimize</MenuItem>
              <MenuItem value={"Maximize"}>Maximize</MenuItem>
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