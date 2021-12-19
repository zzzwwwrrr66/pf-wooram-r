import { createAction, createReducer, configureStore, createSlice, getDefaultMiddleware } from '@reduxjs/toolkit';

import { createTheme } from '@mui/material/styles';
import ProjectData from './components/views/ProjectPage/ProjectData';

const mainStore = createSlice({
  name: 'store',
  initialState: {
    isLogin: false,
    userInfo: null,
    userInit: false,
    projectStatus: {
      currentLabel: [],
      currentYear: 'all',
      currentPage: 1,
      data : ProjectData,
      dataCount : ProjectData.length,
      detailIsOpen: false,
      detailId: null,
    },
    guestBookStatus: {
      currentPage: 1,
    }
  },
  reducers: {
    plusCount: (state, action) => { ++state.count },
    actionIsLogin: (state, action) => { state.isLogin = action.payload },
    actionUserInfo: (state, action) => { 
      const data = {
        ...state.userInfo, ...action.payload
      }
      if(action.payload) {
        state.userInfo = data
      } else {
        state.userInfo = null;
      }
    },
    actionUserInit: (state, action) => {
      state.userInit = action.payload;
    },
    actionProjectChangePage: (state, action) => {
      state.projectStatus.currentLabel = [];
      state.projectStatus.currentYear = 'all';
      state.projectStatus.currentPage = action.payload;
    },
    actionProjectChangeLabel: (state, action) => {
      state.projectStatus.currentLabel.push(action.payload);
    },
    actionProjectDeleteLabel: (state, action) => {
      let deleteIndex = state.projectStatus.currentLabel.findIndex(e=>e === action.payload);
      state.projectStatus.currentLabel.splice(deleteIndex, 1);
    },
    actionProjectChangeYear: (state, action) => {
      console.log(action.payload);
      state.projectStatus.currentYear = action.payload;
    },
    actionProjectDetailOpen: (state, action) => {
      state.projectStatus.detailIsOpen = true;
      state.projectStatus.detailId = action.payload;
    },
    actionProjectDetailClose: (state, action) => {
      state.projectStatus.detailIsOpen = false;
      state.projectStatus.detailId = null
    },
    actionGuestBookChangePage: (state, action) => {
      state.guestBookStatus.currentPage = action.payload;
    },
  }
});
const projectStore = createSlice({
  name: 'ProjectReducer',
  initialState: {
    isLogin: false,
    userInfo: null,
    userInit: false,
  },
});


const store = configureStore({ reducer: mainStore.reducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware(),});

export const { 
  actionIsLogin, 
  actionUserInfo, 
  actionUserInit, 
  actionProjectChangePage, 
  actionProjectChangeLabel, 
  actionProjectDeleteLabel,
  actionProjectChangeYear,
  actionProjectDetailOpen,
  actionProjectDetailClose,
  actionGuestBookChangePage
} = mainStore.actions;

export default store;