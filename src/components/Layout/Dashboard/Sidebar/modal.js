import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Paper } from '@mui/material';
import { styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProject, selectUserID, selectUserImage, selectUserName, setPredParams } from '../../../../features/userSlice';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 0.5,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicModal({titulo, icono, tituloModal, dir}) {
    const dispatch= useDispatch();
    const uid= useSelector(selectUserID);
    const name= useSelector(selectUserName);
    const image= useSelector(selectUserImage);
    const currentProject= useSelector(selectCurrentProject);
    const params={};
    const navigate= useNavigate();
    const handleClick=()=>{
      dispatch(setPredParams({
        userName: name,
        userUid: uid,
        userImage: image,
        currentProject: currentProject,
        predParams: params,
      }))  
        navigate(dir);
    }
       
  return (
    
    
      <ListItemButton onClick={handleClick} >
      <ListItemIcon>
        {icono}
      </ListItemIcon>
      <ListItemText primary={titulo} />
    </ListItemButton>
      
  );
}

