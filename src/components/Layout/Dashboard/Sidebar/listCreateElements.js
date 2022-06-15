import * as React from 'react';
import AddBox from '@mui/icons-material/AddBox';
import AccountTree from '@mui/icons-material/AccountTree';
import { List } from '@mui/material';
import BasicModal from './modal';


const icono= <AccountTree/>
const icono2=<AddBox/>

export default function MainListItems (){

  return(
  
  
    <List component="nav">
            {//<BasicModal titulo="View hierarchy" icono={icono} tituloModal="Current type hierarchy"></BasicModal>
            }<BasicModal titulo="Create new type" icono={icono2} tituloModal="New Type" dir='/newtype'></BasicModal>
            <BasicModal titulo="Create new predicate" icono={icono2} tituloModal="New Predicate" dir='/newpredicate'></BasicModal>
            <BasicModal titulo="Create new function" icono={icono2} tituloModal="New function" dir='/newfunction'></BasicModal>
            <BasicModal titulo="Create new state" icono={icono2} tituloModal="New State" dir='/newstate'></BasicModal>
            <BasicModal titulo="Create new action" icono={icono2} tituloModal="New Action" dir='/newaction'></BasicModal>
            <BasicModal titulo="Create new problem" icono={icono2} tituloModal="New Problem" dir='/newproblem'></BasicModal>
            
            
          </List>
 
   );
}