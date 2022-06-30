import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import { LoadUserProjects } from './LoadUserProjects';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserID, selectUserName, selectUserImage, setCurrentProject } from '../features/userSlice';


const theme = createTheme();

let aux=0;

let projectData=[];
let projectList=[];
let projectIDList=[];
  LoadUserProjects().then((result)=>{
    projectData.push(result);
    for (var i=0; i<projectData[0].length; i++){
      projectList.push(projectData[0][i].ProjectName);
      projectIDList.push(projectData[0][i].id);
    }
  });
let projectNumber=0;
export default function LoadProjects() {
  
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const uid= useSelector(selectUserID);
  const name= useSelector(selectUserName);
  const image= useSelector(selectUserImage);
  
  const [projectName, setProjectName] = React.useState([]);
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
    setProjectName(value); 
    console.log(projectNumber);   
  };
  const handleClick=(event)=>{
    event.preventDefault();
    dispatch(setCurrentProject({
      userName: name,
      userUid: uid,
      userImage: image,
      currentProject: {id: projectIDList[projectNumber], projectName: projectList[projectNumber]},
    }))
    console.log(projectIDList[projectNumber], projectNumber);
    navigate("/dashboard");
  }


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
            <FolderCopyOutlinedIcon fontSize='large'/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Your Projects
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth>
       
        
        <Select
          multiple
          native
          value={projectName}
          // @ts-ignore Typings are not considering `native`
          onChange={handleChangeMultiple}
          
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
          {projectIDList.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClick}
            >
              Load
            </Button>
      </FormControl>
            
           
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}





