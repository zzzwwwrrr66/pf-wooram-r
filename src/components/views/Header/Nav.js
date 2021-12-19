import {useState} from 'react'
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';
import logoImg from './images/wooram_logo.png';
import {Box, IconButton, Menu, MenuItem, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import './Header.css'

const Nav = (props, {moveLinkTag}) => {
  const [dropDownNav, setDropDownNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setDropDownNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setDropDownNav(null);
  };

  return(
    <Router>
    <Link to="/">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
              <img src={logoImg} alt='logo' style={{maxWidth: '120px', objectFit:'contain'}} />
          </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={dropDownNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(dropDownNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none'}, p: 2
              }}
              style={{padding: '10px'}}
            >
              <li style={{textAlign: 'center',margin:'0 0 10px' }}>
                <Link to={`/`} onClick={handleCloseNavMenu} style={{display: 'block',padding: '5px 0', color: '#33bdb2'}}>
                  <span className="nes-text">Home</span>
                </Link>
              </li>
              <li style={{textAlign: 'center', margin: '0 0 10px'}}>
                <Link to={`/project`} onClick={handleCloseNavMenu} style={{display: 'block',padding: '5px 0', color: '#33bdb2'}}>
                  <span className="nes-text">Project</span>
                </Link>
              </li>
              <li style={{textAlign: 'center', margin: '0 0 10px'}}>
                <Link to={`/guest-book`} onClick={handleCloseNavMenu} style={{display: 'block',padding: '5px 0', color: '#33bdb2'}}>
                  <span className="nes-text">GuestBook</span>
                </Link>
              </li>
              <li style={{textAlign: 'center'}}>
                <Link to={`/contact`} onClick={handleCloseNavMenu} style={{display: 'block',padding: '5px 0', color: '#33bdb2'}}>
                  <span className="nes-text">Contact</span>
                </Link>
              </li>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img src={logoImg} alt='logo' style={{maxWidth: '115px'}} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to={`/`} style={{display: 'flex', alignItems: 'center', padding:'0 10px'}}>
              <span className="nes-text" style={{color: '#fff'}}>Home</span>
            </Link>
            <Link to={`/project`} style={{display: 'flex', alignItems: 'center', padding:'0 10px'}}>
              <span className="nes-text" style={{color: '#fff'}}>Project</span>
            </Link>
            <Link to={`/guest-book`} style={{display: 'flex', alignItems: 'center', padding:'0 10px'}}>
              <span className="nes-text" style={{color: '#fff'}}>GuestBook</span>
            </Link>
            <Link to={`/contact`} style={{display: 'flex', alignItems: 'center', padding:'0 10px'}}>
              <span className="nes-text" style={{color: '#fff'}}>Contact</span>
            </Link>
          </Box>
    </Router>
  )
}

function mapStateToProps( state ){
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Nav);