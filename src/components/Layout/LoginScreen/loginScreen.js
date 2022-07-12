import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDispatch, useSelector} from 'react-redux'
import { setActiveUser, selectUserID, selectUserName, selectUserImage } from '../../../features/userSlice';
import Copyrigth from '../../Layout/copyrigth';
import { auth, provider } from '../../../firebase/firebaseconfig';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import exportXML from "../../XML/exportXML";


const theme = createTheme();

export default function SignIn() {
    exportXML();
    const navigate= useNavigate();
    const dispatch=useDispatch();
    const handleSignIn = async (event) => {
      event.preventDefault();
      await signInWithPopup(auth,provider).then((result)=>{
        dispatch(setActiveUser({
          userName: result.user.displayName,
          userUid: result.user.uid,
          userImage: result.user.photoURL,
        }))
      })
      navigate("/projects");
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SIGN IN 
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Grid container>
                <Copyrigth/>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}