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
import { useSelector } from 'react-redux';
import { selectUserName } from '../../../features/userSlice';

const theme = createTheme();

export default function Projects() {
  const name=selectUserName;
  const navigate= useNavigate();
  const handleCreate = (event) => {
    event.preventDefault();
    navigate("/newproject");
  };
  const handleCreate2 = (event) => {
    event.preventDefault();
    navigate("/loadproject");
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
          WELCOME
          </Typography>
          
          
          <Box component="form" noValidate sx={{ mt: 1 }}>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleCreate}
            >
              Create new project
            </Button>
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleCreate2}
            >
              Load project
            </Button>

          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}