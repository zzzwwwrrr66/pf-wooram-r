import { useEffect, useState } from 'react';
import { HashRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionIsLogin, actionUserInfo, actionUserInit } from './store'
import './default.css'
import Home from './components/views/Home/index'
import EditProfile from './components/views/EditProfilePage';
import GuestBook from './components/views/GuestBookPage/index';
import Contact from './components/views/ContactPage/index';
import Project from './components/views/ProjectPage/index';
import Header from './components/views/Header';

import { authService } from './firebase';

function App({state, dispatch}) {
  const [start, setStart] = useState(true);
  useEffect(()=>{
    setTimeout(()=>{
      setStart(false);
      console.log('start');
    }, 1200)
  },[]);

  useEffect(()=> {
    authService.onAuthStateChanged(authService.getAuth(), async (user) =>  {
      if (user) {
        const userObj = {
          userAccount: user.email, 
          userImg: user.photoURL, 
          userId: user.uid,
          userName: user.displayName,
        }
        if(user.providerData[0].providerId === 'github.com') {
          // updateProfile 해서 유저네임 세팅???
          userObj['userAccount'] = user.reloadUserInfo.screenName;
        }

        dispatch(actionIsLogin(true));
        dispatch(actionUserInfo(userObj));
      } else {
        dispatch(actionIsLogin(false));
        dispatch(actionUserInfo(false));
      }
      dispatch(actionUserInit(true));
    });
  },[]);

  
  return (
    <>
    {
    start
    ? <div style={{position: 'absolute', top:'0', left: '0',width: '100vw', height: '100vh'}}>
      <img alt='' 
      src={require('./components/images/loading.gif').default} 
      style={{position: 'absolute', left:'50%', top:'50%', transform:'translate(-50%, -50%)', maxWidth:'1200px', width: '100%', height: '100%', objectFit: 'contain'}} 
      />
    </div>
    : <>
    <Header moveLinkTag={Link}/>
    <div className={`main-wrap`} >
      <Router>
        <Switch>
          <Route path="/" component={ Home } exact={true} />
          <Route path="/guest-book" component={ GuestBook } exact={true} />
          <Route path="/contact" component={ Contact } exact={true} />
          <Route path="/project" component={ Project } exact={true} />
          <Route exact path="/edit-profile">
            { 
              state.userInit 
              ? state.isLogin ? <EditProfile /> : <Redirect to="/" />
              : null
            }
          </Route>
        </Switch>
      </Router>
    </div>
    </>
    }
      
    </>
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

export default connect(mapStateToProps, mapDispatchToProps) (App);

