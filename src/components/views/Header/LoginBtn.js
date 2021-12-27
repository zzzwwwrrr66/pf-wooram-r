import { useState, memo, useEffect }  from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { authService } from '../../../firebase';

import './Header.css'


const LoginBtn = ({state}) => {
  // console.log('in loginBtn',props.isLogin)

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(null);
  const [init, setInit] = useState(false);

  useEffect(()=>{
    return;
  }, [state.darkMod]);
  
  const handleOpenUserMenu = (event) => {
    setIsUserMenuOpen(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setIsUserMenuOpen(null);
  };

  const handleLogOut = async () =>{
    const res = await authService.signOut(authService.getAuth());
  }

  return (
    <Router>
      <Box sx={{ flexGrow: 0 }}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {
            state.userInit ?
            state.userInfo && state.userInfo.userImg 
            ? <Avatar alt="Remy Sharp" src={state.userInfo.userImg} sx={{objectFit:'initial'}}/>
            : <Avatar />
            : <CircularProgress style={{color:'#fff'}}/>
          }
        </IconButton>
        <Menu
          sx={{ mt: '45px', p: 2, }}
          id="menu-appbar"
          anchorEl={isUserMenuOpen}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(isUserMenuOpen)}
          onClose={handleCloseUserMenu}
          style={{padding: '10px',}}
        >
          <li style={{textAlign: 'center',margin:'0 0 10px' }}>
            <Link to={`/edit-profile`} onClick={handleCloseUserMenu} 
            style={{display: 'block',padding: '5px', color: '#33bdb2'}}>
              <span className="nes-text">Profile</span>
            </Link>
          </li>
          <li style={{textAlign: 'center'}}>
            <p 
              onClick={handleLogOut} 
              style={{display: 'block',margin: '0',padding: '5px', color: '#33bdb2', cursor:'pointer'}}
              className='link'
            >
              <span className="nes-text">Logout</span>
            </p>
          </li>
          {/* <MenuItem onClick={handleCloseUserMenu}>
            <Link to={`/edit-profile`} >
              <Typography textAlign="center">Profile</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogOut}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem> */}
          
        </Menu>
      </Box>
    </Router>
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

export default connect(mapStateToProps, mapDispatchToProps) (LoginBtn);