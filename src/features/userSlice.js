import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth, provider } from '../firebase/firebaseconfig';

const initialState = {
    uid: {},
    userName: {},
    userImage: {},
    currentProject: {id: {}, projectName:{}},
    projectList: {id: {}, projectName: {}},
    predParams:[],
    addParams: {},
    switchView: true,
}



const userSlice = createSlice({
  name: 'userSesion',
  initialState,
  reducers: {
      setActiveUser: (state, action)=>{
        state.uid= action.payload.userUid
        state.userName= action.payload.userName
        state.userImage= action.payload.userImage  
      },
      setUserLogOutState: state =>{
          state.uid={}
          state.userName={}
          state.userImage={}
          state.currentProject={}
          state.projectList={}
      },
      setCurrentProject: (state, action)=>{
        state.currentProject= action.payload.currentProject  
      },
      setProjectList: (state, action)=>{
        state.projectList= action.payload.projectList
      },
      setPredParams: (state, action)=>{
        state.predParams=action.payload.predParams
      },
      setAddParams:(state,action)=>{
        state.addParams=action.payload.addParams
      },
      setSwitchView: (state, action)=>{
          state.switchView=action.payload.switchView
      },
  }
});


export const {
  setActiveUser, 
  setUserLogOutState, 
  setCurrentProject, 
  setProjectList, 
  setPredParams,
  setAddParams,
    setSwitchView,
} = userSlice.actions

export const selectUserID = state => state.user.uid
export const selectUserName = state => state.user.userName
export const selectUserImage = state => state.user.userImage
export const selectCurrentProject = state => state.user.currentProject
export const selectProjectList = state => state.user.projectList
export const selectPredParams = state => state.user.predParams
export const selectAddParams= state => state.user.addParams
export const selectSwitchView= state => state.user.switchView


export default userSlice.reducer