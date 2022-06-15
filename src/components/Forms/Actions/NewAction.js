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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CreateVariable } from '../saveVariables';
import { useSelector } from 'react-redux';
import { selectCurrentProject } from '../../../features/userSlice';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseconfig';


const theme = createTheme();
let projectNumber=0;
let projectNumber2=0;
export default function NewAction() {
  const id=useSelector(selectCurrentProject).id;
  const [stateList, setStateList] = React.useState([]);
  const [stateList2, setStateList2] = React.useState([]);
  const [metric, setMetric] = React.useState("Minimize");
  const [checked, setChecked] = React.useState(false);
  const [selectItem, setSelectItem] = React.useState([]);
  const [selectItem2, setSelectItem2] = React.useState([]);
  
  const ref="/Projects/"+id+"/States";
  const q = query(collection(db, ref));
  const states=[];
    
   const data2 = onSnapshot(q,(querySnapshot)=>{
     
     querySnapshot.forEach((doc)=>{
       states.push(doc.data());
     })
     //console.log(projects);
     setStateList(states);
     setStateList2(states);
   })

  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
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

  const handleChangeMultiple2 = (event) => {
    event.preventDefault();
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
        projectNumber2=i;
      }
    }
    setSelectItem2(value); 
   
  };

  
  const navigate= useNavigate();
  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params={
      name: data.get('name'),
      InitialState: stateList[projectNumber].name,
      EndState: stateList2[projectNumber2].name,
  };
  CreateVariable(data.get('name'), "Actions", params, id);
    console.log(params);
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
            New Action
          </Typography>
          <Box component="form" onSubmit={handleCreate} noValidate sx={{ mt: 1 }}>
          <FormControlLabel control={<Checkbox name='endOfLoop' checked={checked} onChange={handleChangeCheck} />} label="End of loop" />
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
            <InputLabel id="demo-simple-select-label">Initial state</InputLabel>
            <Select
          
              native
              fullWidth
              value={selectItem}
              onChange={handleChangeMultiple}
              inputProps={{
                id: 'select-multiple-native',
              }}
            >
              {stateList.map((name) => (
                <option key={name.name} value={name.name}>
                  {name.name}
                </option>
              ))}
            </Select>
            
            <InputLabel id="demo-simple-select-label2">End state</InputLabel>
            <Select
          
                native
                fullWidth
                value={selectItem2}
                onChange={handleChangeMultiple2}
                inputProps={{
                  id: 'select-multiple-native2',
                }}
              >
                {stateList2.map((name) => (
                  <option key={name.name} value={name.name}>
                    {name.name}
                  </option>
                ))}
            </Select>
            <Button
              
              fullWidth
              color='primary'
              variant="contained"
              onClick={()=>{navigate("/addactionparams");}}
              sx={{ mt: 3, mb: 2 }}
              
              
            >
              Add Predicate
            </Button>
            <Button
              
              fullWidth
              color='primary'
              variant="contained"
              
              sx={{ mt: 0, mb: 2 }}
              
              onClick={()=>{navigate("/addactionfunction");}}
            >
              Add Function
            </Button>
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