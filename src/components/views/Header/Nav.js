import {useState} from 'react'
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';
import logoImg from './images/wooram_logo.png';
import {Box, IconButton, Menu, MenuItem, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import "nes.css/css/nes.min.css";

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
              <img src={logoImg} alt='logo' style={{maxWidth: '120px'}} />
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem>
                <Link to={`/`} onClick={handleCloseNavMenu}>
                  <span className="nes-text is-primary">Home</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={`/project`} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Project</Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={`/guest-book`} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">GuestBook</Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={`/contact`} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Contact</Typography>
                </Link>
              </MenuItem>
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