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
import { collection, addDoc } from "firebase/firestore";
import { CreateProjectDb } from './CreateProjectDb';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserID, selectUserImage, selectUserName, setCurrentProject } from '../../../features/userSlice';
import { CreateVariable } from '../../Forms/saveVariables';

const theme = createTheme({
  palette: {
    type: "dark"
  }
});

export const NewProject=()=> {
  
  const navigate= useNavigate();
  const dispatch= useDispatch();
  const uid= useSelector(selectUserID);
  const name= useSelector(selectUserName);
  const image= useSelector(selectUserImage);
  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const project= data.get('name');
    const projectData= CreateProjectDb(project,uid).then((result)=>{
      dispatch(setCurrentProject({
        userName: name,
        userUid: uid,
        userImage: image,
        currentProject: {id: result, projectName: project},
      }))
      CreateVariable("Object","Types",{name: "object", subtypeOf: 'object'},result);
    });
    
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
            New Project
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
              onClick={()=>{navigate("/projects");}}
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