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
import { CreateVariableTemp } from '../saveTemporalVariables';
import { CreateVariableTempFxState } from '../States/tempDatafxState';



const theme = createTheme({
  palette: {
    type: "dark"
  }
});
let projectNumber=0;
let projectNumber2=0;
export default function AddFxAction() {
  const id=useSelector(selectCurrentProject).id;
  const [metric, setMetric] = React.useState("increase");
  const navigate= useNavigate();
  const handleChangeMetric = (event) => {
    setMetric(event.target.value);
  };

//conexion a db para obtener listado de funciones
const [functionList, setFunctionList] = React.useState([]);
const [functionList2, setFunctionList2] = React.useState([]);
const [selectItem, setSelectItem] = React.useState([]);
const [selectItem2, setSelectItem2] = React.useState([]);
const ref="/Projects/"+id+"/Functions";
  const q = query(collection(db, ref));
  const functions=[];
    
   const data2 = onSnapshot(q,(querySnapshot)=>{
     
     querySnapshot.forEach((doc)=>{
       functions.push(doc.data());
     })
     //console.log(projects);
     setFunctionList(functions);
     setFunctionList2(functions);
   })

  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params={
      
      function: selectItem,
      function2: selectItem2,
      operator: metric,
      

  };
  
  CreateVariableTempFxState("FxTempData", params, id);
    console.log(params);
   navigate("/newaction");
    
  };
  const handleChangeMultiple = (event) => {
    event.preventDefault();
    setSelectItem(event.target.value);
  };

  const handleChangeMultiple2 = (event) => {
    setSelectItem2(event.target.value);
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
            Add Function
          </Typography>
          <Box component="form" onSubmit={handleCreate} noValidate sx={{ mt: 1 }}>
           
          <InputLabel id="demo-simple-select-label">Function 1</InputLabel>
          <Select
          
              
              fullWidth
              value={selectItem}
              onChange={handleChangeMultiple}
              inputProps={{
                id: 'select-multiple-native',
              }}
            >
              {functionList.map((name) => (
                <MenuItem value={name.name}>{name.name}</MenuItem>
              ))}
        </Select>
            
        <InputLabel id="demo-simple-select-label">Operator</InputLabel>
            <Select
              
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              
              value={metric}
              fullWidth
              autoFocus
              onChange={handleChangeMetric}
            >
              <MenuItem value={"increase"}>{"increase"}</MenuItem>
              <MenuItem value={"assign"}>{"assign"}</MenuItem>
              <MenuItem value={"decrease"}>{"decrease"}</MenuItem>
            
              
              
            </Select>

            <InputLabel id="demo-simple-select-label">Function 2</InputLabel>
          <Select
          
              
              fullWidth
              value={selectItem2}
              onChange={handleChangeMultiple2}
              inputProps={{
                id: 'select-multiple-native2',
              }}
            >
              {functionList.map((name) => (
                <MenuItem value={name.name}>{name.name}</MenuItem>
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
              onClick={()=>{navigate("/newaction");}}
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