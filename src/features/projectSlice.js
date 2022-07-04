import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth, provider } from '../firebase/firebaseconfig';

const initialState = {
    currentProject: {}
}


const projectSlice = createSlice({
  name: 'currentProject',
  initialState,
  reducers: {
      setCurrentProject: (state, action)=>{
        state.currentProject=action.payload.currentProject
      }
  }
});


export const {setCurrentProject} = projectSlice.actions

export const selectCurrentProject = state => state.currentProject.currentProject


export default projectSlice.reducer