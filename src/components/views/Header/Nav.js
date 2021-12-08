import {useState} from 'react'
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';
import logoImg from './images/wooram_logo.png';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

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
                  <Typography textAlign="center">Home</Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={`/project`} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Project</Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={`/guest-book`} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Guest Book</Typography>
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
            <Link to={`/`} >
              <Button sx={{ my: 2, color: 'white', display: 'block' }} >
                Home
              </Button>
            </Link>
            <Link to={`/project`} >
              <Button sx={{ my: 2, color: 'white', display: 'block' }} >
                Project
              </Button>
            </Link>
            <Link to={`/guest-book`} >
              <Button sx={{ my: 2, color: 'white', display: 'block' }} >
                Guest Book
              </Button>
            </Link>
            <Link to={`/contact`} >
              <Button sx={{ my: 2, color: 'white', display: 'block' }} >
                Contact
              </Button>
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