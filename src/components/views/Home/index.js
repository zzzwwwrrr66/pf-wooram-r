import React ,{ useEffect } from 'react';

import AboutMe from './AboutMe';
import MySkills from './MySkills';

// import SplitText from './SplitText';

import styled from 'styled-components';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline, SplitLetters } from 'react-gsap';

import './css/style.css';

function Home() {
  
  return (
    <div className=''>
      <AboutMe />
      <MySkills />
    </div>
  )
}

export default Home;