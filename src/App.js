import { useEffect } from 'react';
import { HashRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionIsLogin, actionUserInfo, actionUserInit } from './store'
import './default.css'
import Home from './components/views/Home'
import EditProfile from './components/views/EditProfilePage';
import GuestBook from './components/views/GuestBookPage/index';
import Contact from './components/views/ContactPage/index';
import Project from './components/views/ProjectPage/index';
import Header from './components/views/Header';

import { authService } from './firebase';

function App({state, dispatch}) {

  useEffect(()=> {
    authService.onAuthStateChanged(authService.getAuth(), (user) =>  {
      if (user) {
        console.log();
        const userObj = {
          userAccount: user.email, 
          userImg: user.photoURL, 
          userId: user.uid
        }
        if(user.providerData[0].providerId === 'github.com') {
          userObj['userAccount'] = user.reloadUserInfo.screenName
        }

        dispatch(actionIsLogin(true));
        dispatch(actionUserInfo(userObj));

      } else {
        dispatch(actionIsLogin(false));
        dispatch(actionUserInfo(false));
      }
      dispatch(actionUserInit(true));
    });
  },[])

  
  return (
    <>
      <Header moveLinkTag={Link}/>
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

