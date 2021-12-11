import { createAction, createReducer, configureStore, createSlice, getDefaultMiddleware } from '@reduxjs/toolkit';

import { createTheme } from '@mui/material/styles';

const pfWooramRstore = createSlice({
  name: 'testStore',
  initialState: {
    isLogin: false,
    userInfo: null,
    userInit: false,
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
    }
  }
});


const store = configureStore({ reducer: pfWooramRstore.reducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware(),});

export const { actionIsLogin, actionUserInfo, actionUserInit } = pfWooramRstore.actions;

export default store;