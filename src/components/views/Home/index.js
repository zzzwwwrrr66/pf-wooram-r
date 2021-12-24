import React ,{ useEffect } from 'react';

import AboutMe from './AboutMe';
import MySkills from './MySkills';

// import SplitText from './SplitText';

import styled from 'styled-components';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline, SplitLetters } from 'react-gsap';

import './css/MySkills.css';

function Home() {
  
  return (
    <div className='section'>
      <Controller>
        <AboutMe />
        <MySkills />
      <Scene
        triggerHook={'onLeave'}
        duration={1000}
        indicators={true}
      >
        {(progress) => (
          <Tween            
            to={{
              left: '0px',
              rotation: -360,
              width: '200px',
              height: '200px',
            }}       
            ease="Strong.easeOut"
            totalProgress={progress}
            paused
          >
            <div className="tween">Pin Test</div>
          </Tween>    
        )}
      </Scene>
      </Controller>
      
    </div>
  )
}

export default Home;