import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { Logout } from '@mui/icons-material';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import {useSelector} from 'react-redux'
import { selectUserImage } from '../../../features/userSlice';
import { useNavigate } from 'react-router-dom';


export default function BasicMenu() {
  const navigate= useNavigate();
  const handleProjects = (event) => {
    event.preventDefault();
    
    
    navigate("/projects");
   
  };
  const userImage=useSelector(selectUserImage);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton 
      color="inherit"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      >
              <Avatar src={userImage} sx={{ width: 60, height: 60 }}/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
     
        <MenuItem onClick={handleProjects}>
        <ListItemIcon>
            <FolderSharedIcon fontSize="medium" />
          </ListItemIcon>
          Projects</MenuItem>
        <MenuItem onClick={handleClose}>
        <ListItemIcon>
            <Logout fontSize="medium" />
          </ListItemIcon>
          Logout
          </MenuItem>
      </Menu>
    </div>
  );
}