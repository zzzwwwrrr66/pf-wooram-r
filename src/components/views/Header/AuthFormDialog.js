import { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import Dialog from '@mui/material/Dialog';
import {CircularProgress, Box} from '@mui/material/';
import { authService } from '../../../firebase';
import { connect } from 'react-redux';

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

function AuthFormDialog({theme, open, headerDispatch, state}){
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const [newAccount, setNewAccount] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const [loginBtnIsActive, setLoginBtnIsActive] = useState(false);
  const [createBtnIsActive, setCreateBtnIsActive] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [googleLoginLoading, setGoogleLoginLoading] = useState(false);
  const [githubLoginLoading, setGithubLoginLoading] = useState(false);

  useEffect(()=>{
    return;
  }, [state.darkMod])

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

    setCreateLoading(true);
    authService.createUserWithEmailAndPassword(authService.getAuth(), values.email, values.password)
    .then(res=>{ 
      // after create success
      setCreateLoading(false);
      init();
      alert('Create Success!');
    })
    .catch( (err, a) =>{
      setErrMessage(errorMessageFnc(err.message));
      setCreateLoading(false);
    });
  }

  const handleSignIn = (e) => {
    if(e.target.classList.contains('is-disabled')) {
      setCreateBtnIsActive(true);
      setLoginBtnIsActive(false);
      setErrMessage('');
      return
    };
    setLoginLoading(true);
    authService.signInWithEmailAndPassword(authService.getAuth(), values.email, values.password)
    .then(res=>{ 
      // after create Login
      setLoginLoading(false);
      init();
      alert('Login! Success');
    })
    .catch( (err, a) =>{
      console.log(err.message);
      setLoginLoading(false);
      setErrMessage(errorMessageFnc(err.message))
      
    });
  }

  const clickSocialSignIn = (e) => {
    let socialName = e.target.name;
    let provider;
    if(socialName === 'google') {
      provider = new authService.GoogleAuthProvider();
      setGoogleLoginLoading(true);
    } else if(socialName === 'github') {
      provider = new authService.GithubAuthProvider();
      setGithubLoginLoading(true);
    } else {
      return;
    }

    const auth = authService.getAuth();
    auth.languageCode = 'ja';
    authService.signInWithPopup(auth, provider)
    .then((res) => {
      console.log(res);
      setGoogleLoginLoading(false);
      setGithubLoginLoading(false);
      init();
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      console.log(error);
      // setErrMessage(error);
      setGoogleLoginLoading(false);
      setGithubLoginLoading(false);
    });
  }

  return (
    <Dialog
      open={open}
      onClose={handleCloseIsOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
    <Container maxWidth="sm" 
    style={ state.darkMod ? { backgroundColor: '#212529', color: '#fff' } : { backgroundColor: '#fff', color: '#000' }  }>
    <Box
      noValidate
      autoComplete="off"
      sx={{mt:2, mb:2, }}
      
      >
      <h2>Login</h2>
      <div className="nes-field" style={{marginBottom: '10px'}}>
        <label htmlFor="email_field">Your email</label>
        <input 
          type="text" 
          id="email_field" 
          className={state.darkMod ? "nes-input is-dark" : "nes-input"}
          value={values.email} 
          onChange={handleChange('email')} 
          required 
        />
      </div>
      <div className="nes-field">
        <label htmlFor="email_field">Your password</label>
        <input 
          type={values.showPassword ? 'text' : 'password'} 
          id="email_field" 
          className={state.darkMod ? "nes-input is-dark" : "nes-input"}
          value={values.password} 
          onChange={handleChange('password')} 
          required
        />
      </div>
      <label className='checkbox-label'>
        <input 
        type="checkbox" 
        className={state.darkMod ? "nes-checkbox is-dark" : "nes-checkbox"}
        checked={values.showPassword} 
        onChange={handleClickShowPassword} 
        />
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
        >
          {
            loginLoading
            ? <CircularProgress size={20} style={{color:'#33bdb2'}} />
            : 'Sign In'
          }
        </button>
      </div>
      <div>
        <button 
          type="button" 
          className={createBtnIsActive ? 'nes-btn is-disabled' : 'nes-btn'}
          onClick={clickCreateUser} 
          style={{width: '100%'}}
        >
          {
            createLoading
            ? <CircularProgress size={20} style={{color:'#33bdb2'}} />
            : 'create new account'
          }
        </button>
      </div>
        
    </Box>
    <div style={{marginBottom: '16px'}}>
      <button type="button" className="nes-btn is-main" name="google" onClick={clickSocialSignIn} style={{display:'flex', width: '100%', marginBottom: '15px', justifyContent: 'center'}}>
      {
        googleLoginLoading
        ? <CircularProgress size={20} style={{color:'#fff'}} />
        : <>
        <span>Sign Up Google</span>
        <GoogleIcon sx={{ml: 1}}/>
        </>
      }
        
      </button>
      <button type="button" className="nes-btn is-main" name="github" onClick={clickSocialSignIn} style={{display:'flex',width: '100%', justifyContent: 'center'}}>
      {
        githubLoginLoading
        ? <CircularProgress size={20} style={{color:'#fff'}} />
        : <>
        <span>Sign Up github</span>
        <GitHubIcon sx={{ml: 1}}/>
        </>
      }
        
      </button>
    </div> 
    </Container>
    </Dialog>
  )
}


function mapStateToProps(state){
  return {state};
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (AuthFormDialog);