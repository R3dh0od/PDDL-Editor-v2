import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DeleteOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { selectPredParams } from '../../../features/userSlice';

export default function GutterlessList({params}) {
    const params2=[];
    params2.push(params);
    //console.log(params2);
  return (
    <List sx={{ width: '100%', maxWidth: 360, ml: 3 }}>
      {params.map((value) => (
        <ListItem
          key={value}
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment">
              
            </IconButton>
          }
        >
          <ListItemText primary={value.name} />
        </ListItem>
      ))}
    </List>
  );
}