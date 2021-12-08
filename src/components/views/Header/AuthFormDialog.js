import { useState } from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { authService } from '../../../firebase';

function errorMessageFnc(msg) {
  switch (msg) {
    case 'Firebase: Error (auth/invalid-email).':
      return 'invalid email'
    case 'Firebase: Error (auth/internal-error).':
      return 'missing password'
    case 'Firebase: Error (auth/missing-email).':
      return 'missing email'
    case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
      return 'Password should be at least 6 characters';
    case 'Firebase: Error (auth/email-already-in-use).':
      return 'email already in USE'
    case 'Firebase: Error (auth/user-not-found).':
      return 'user not found'
    case 'Firebase: Error (auth/wrong-password).':
      return 'wrong password'
    default:
      return '';
  }
}

function AuthFormDialog({theme, open, headerDispatch}){
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const [newAccount, setNewAccount] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const init = () => {
      handleCloseIsOpen();
      setErrMessage('');
      setValues({
        email: '',
        password: '',
        showPassword: false,
      })
  }

  const handleCloseIsOpen = () => {
    headerDispatch({
      type: 'SET_CLOSE_DIALOG'
    });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
    
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const handleChange = (inputType) => (e) => {
    setValues({ ...values, [inputType]: e.target.value });
  };
  
  const clickCreateUser = (e) => {
    authService.createUserWithEmailAndPassword(authService.getAuth(), values.email, values.password)
    .then(res=>{ 
      console.log(res);
      init();
    })
    .catch( (err, a) =>{
      setErrMessage(errorMessageFnc(err.message))
    });
  }

  const handleSignIn = (e) => {
    authService.signInWithEmailAndPassword(authService.getAuth(), values.email, values.password)
    .then(res=>{ 
      // 다이어로그 모달 성공했습니다
      console.log(res);
      init();
    })
    .catch( (err, a) =>{
      console.log(err.message);
      setErrMessage(errorMessageFnc(err.message))
      
    });
  }

  const clickSocialSignIn = (e) => {
    let socialName = e.target.name;
    let provider;
    if(socialName === 'google') {
      provider = new authService.GoogleAuthProvider();
    } else if(socialName === 'github') {
      provider = new authService.GithubAuthProvider();
    } else {
      return;
    }
    const auth = authService.getAuth();
    auth.languageCode = 'ja';
    authService.signInWithPopup(auth, provider)
    .then((res) => {
      console.log(res);
      init();
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      console.log(error);
    });
  }

  return (
    <Dialog
      open={open}
      onClose={handleCloseIsOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{'Login'}</DialogTitle>
    <Container maxWidth="sm">
    <Box
      noValidate
      autoComplete="off"
      sx={{mt:2, mb:2 }}
    >
      <TextField
        required
        id=""
        label="Email"
        type="email"
        defaultValue={values.email}
        onChange={handleChange('email')}
        fullWidth
        sx={{mb:3}}
      />
      <FormControl fullWidth variant="outlined" required >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          sx={{mb:3}}
        />
        {
          errMessage? <p style={{marginBottom:'10px', color: 'red'}}>{errMessage}</p>
          : null
        }
        <Button variant="outlined" theme={theme} sx={{mb:1}} type="button" onClick={handleSignIn}>Sign In</Button>
        <Button variant="outlined" theme={theme} sx={{mb:3}} type="button" onClick={clickCreateUser}>create new account</Button>
      </FormControl>
    </Box>
        <Stack direction="column" spacing={1} sx={{mb:2}}>
          <Button variant="outlined" endIcon={<GoogleIcon />} theme={theme} name="google" onClick={clickSocialSignIn}>Sign Up Google</Button>
          <Button variant="outlined" endIcon={<GitHubIcon />} theme={theme} name="github" onClick={clickSocialSignIn}>Sign Up github</Button>
        </Stack>
    </Container>
    </Dialog>
  )
}

export default AuthFormDialog;
