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

  const [loginBtnIsActive, setLoginBtnIsActive] = useState(false);
  const [createBtnIsActive, setCreateBtnIsActive] = useState(true);

  const init = () => {
      handleCloseIsOpen();
      setErrMessage('');
      setValues({
        email: '',
        password: '',
        showPassword: false,
      });
      setLoginBtnIsActive(false);
      setCreateBtnIsActive(true);
  }

  const handleCloseIsOpen = () => {
    headerDispatch({
      type: 'SET_CLOSE_DIALOG'
    });
    setErrMessage('');
    setValues({
      email: '',
      password: '',
      showPassword: false,
    });
    setLoginBtnIsActive(false);
    setCreateBtnIsActive(true);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
    
  };
  const handleChange = (inputType) => (e) => {
    setValues({ ...values, [inputType]: e.target.value });
  };
  
  const clickCreateUser = (e) => {
    if(e.target.classList.contains('is-disabled')) {
      setCreateBtnIsActive(false);
      setLoginBtnIsActive(true);
      setErrMessage('');
      return
    };
    authService.createUserWithEmailAndPassword(authService.getAuth(), values.email, values.password)
    .then(res=>{ 
      console.log(res);
      init();
      alert('Create Success!');
    })
    .catch( (err, a) =>{
      setErrMessage(errorMessageFnc(err.message))
    });
  }

  const handleSignIn = (e) => {
    if(e.target.classList.contains('is-disabled')) {
      setCreateBtnIsActive(true);
      setLoginBtnIsActive(false);
      setErrMessage('');
      return
    };
    authService.signInWithEmailAndPassword(authService.getAuth(), values.email, values.password)
    .then(res=>{ 
      // 다이어로그 모달 성공했습니다
      console.log(res);
      init();
      alert('Login! Success');
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
    <Container maxWidth="sm">
    <Box
      noValidate
      autoComplete="off"
      sx={{mt:2, mb:2 }}
      >
      <h2>Login</h2>
      <div className="nes-field" style={{marginBottom: '10px'}}>
        <label htmlFor="email_field">Your email</label>
        <input type="text" id="email_field" className="nes-input" value={values.email} onChange={handleChange('email')} required />
      </div>
      <div className="nes-field">
        <label htmlFor="email_field">Your password</label>
        <input 
          type={values.showPassword ? 'text' : 'password'} 
          id="email_field" 
          className="nes-input" 
          value={values.password} 
          onChange={handleChange('password')} 
          required
        />
      </div>
      <label className='checkbox-label'>
        <input type="checkbox" className="nes-checkbox" checked={values.showPassword} onChange={handleClickShowPassword} />
        <span>password display</span>
      </label>
      {
        errMessage? <p style={{marginBottom:'10px', color: 'red'}}>{errMessage}</p>
        : null
      }

      <div>
        <button 
          type="button" 
          className={loginBtnIsActive ? 'nes-btn is-disabled' : 'nes-btn'}
          onClick={handleSignIn} 
          style={{width: '100%', marginTop:'10px', marginBottom: '10px'}}
        >Sign In</button>
      </div>
      <div>
        <button 
          type="button" 
          className={createBtnIsActive ? 'nes-btn is-disabled' : 'nes-btn'}
          onClick={clickCreateUser} 
          style={{width: '100%'}}
        >create new account</button>
      </div>
        
    </Box>
    <div style={{marginBottom: '16px'}}>
      <button type="button" className="nes-btn is-main" name="google" onClick={clickSocialSignIn} style={{display:'flex', width: '100%', marginBottom: '15px', justifyContent: 'center'}}>
        <span>Sign Up Google</span>
        <GoogleIcon sx={{ml: 1}}/>
      </button>
      <button type="button" className="nes-btn is-main" name="github" onClick={clickSocialSignIn} style={{display:'flex',width: '100%', justifyContent: 'center'}}>
        <span>Sign Up github</span>
        <GitHubIcon sx={{ml: 1}}/>
      </button>
    </div> 
    </Container>
    </Dialog>
  )
}

export default AuthFormDialog;
