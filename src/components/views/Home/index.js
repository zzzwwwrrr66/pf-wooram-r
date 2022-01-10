import React ,{ useEffect } from 'react';

import AboutMe from './AboutMe';
import MySkills from './MySkills';
import SkillsInThisPage from './SkillsInThisPage';

import { connect } from 'react-redux';

// import SplitText from './SplitText';

import styled from 'styled-components';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline, SplitLetters } from 'react-gsap';

import { actionIsDarkmod } from '../../../store';

import './css/style.css';
import DarkmodChkBox from '../../DarkmodChkBox';

function Home({state, dispatch}) {
  
  return (
    <div className=''>
      <DarkmodChkBox />
      <AboutMe />
      <MySkills />
      <SkillsInThisPage></SkillsInThisPage>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps) (Home);