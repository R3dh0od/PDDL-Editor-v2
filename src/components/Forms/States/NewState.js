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

const theme = createTheme();

export default function NewState() {
  const id=useSelector(selectCurrentProject).id;
  const [checked, setChecked] = React.useState(false);

  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };
  

  
  const navigate= useNavigate();
  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params={
      name: data.get('name'),
      begginingIsland: checked,
  };
  CreateVariable(data.get('name'), "States", params, id);
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
            New State
          </Typography>
          <Box component="form" onSubmit={handleCreate} noValidate sx={{ mt: 1 }}>
          <FormControlLabel 
          control={<Checkbox name='beginningIsland' checked={checked} onChange={handleChangeCheck} />} 
          label="Beginning of the island" />
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
              
              fullWidth
              color='primary'
              variant="contained"
              onClick={()=>{navigate("/addStateParams");}}
              sx={{ mt: 3, mb: 2 }}
              
              
            >
              Add Predicate
            </Button>
            <Button
              
              fullWidth
              color='primary'
              variant="contained"
              onClick={()=>{navigate("/addstatefunction");}}
              sx={{ mt: 0, mb: 2 }}
              
              
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