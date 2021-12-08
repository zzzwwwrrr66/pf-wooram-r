import * as React from 'react';
import { useReducer, useState }  from 'react';
import { connect } from 'react-redux';

// material UI
import { createTheme,  } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircularProgress from '@mui/material/CircularProgress';

// components
import LoginBtn from './LoginBtn';
import AuthFormDialog from './AuthFormDialog';
import Nav from './Nav';

const theme = createTheme({
  palette: {
    primary: {
      light: '#5bcac1',
      main: '#33bdb2',
      dark: '#23847c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#5bcac1',
      main: '#33bdb2',
      dark: '#23847c',
      contrastText: '#000',
    },
  },
});

const headerInitialState = { 
  openDialog: false,
};
const headerReducer = (state, action) => {
  switch (action.type) { //action.type => 넘겨줄이름
    case 'SET_OPEN_DIALOG':
      return {
        ...state, 
        openDialog: true
      }
    case 'SET_CLOSE_DIALOG':
      return {
        ...state, 
        openDialog: false
      }
      default:
      break;
  }
}

function Header({state}) {
  const [HEADER_STATE, headerDispatch] = useReducer(headerReducer, headerInitialState); 

  const handleOpenLoginDialog = () => {
    headerDispatch({
      type:'SET_OPEN_DIALOG'
    });
  };

  return (
    <AppBar position="static" theme={theme}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Nav />
          
          {
            state.userInit ? 
            state.isLogin ?
            <LoginBtn isLogin={state.isLogin} />
            : 
            <>
            <Button variant="outlined" startIcon={<AccountCircleIcon />} onClick={handleOpenLoginDialog} style={{color:'#fff', borderColor:'#fff'}} >
              Login
            </Button>
            </>
            : <CircularProgress />
          }
        </Toolbar>
      </Container>
      
      <AuthFormDialog open={HEADER_STATE.openDialog} headerDispatch={headerDispatch} />
    </AppBar>
  );
}

function mapStateToProps(state){
  return {state};
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Header);