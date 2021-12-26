import {useEffect,useState} from 'react';

import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import MySkillsCircle from "./MySkillsCircle";
import { easeQuadInOut } from "d3-ease";

import 'react-circular-progressbar/dist/styles.css';

import './css/style.css';

function handleColor(skillName) {
  switch (skillName) {
    case 'Japanese':
      return 'blue';
    case 'Html':
      return '#e34c26';
    case 'Css':
      return '#264de4';
    case 'Javascript':
      return '#f0db4f';
    case 'React': 
      return '#61DBFB'
    case 'Redux': 
      return '#764abc';
    case 'Vue2': 
      return '#41b883';
    case 'Vuex': 
      return '#41b883';
    case 'Typescript': 
      return '#007acc';
    case 'Firebase': 
      return '#ffa611';
    case 'Git': 
      return '#f1502f';
    case 'Webpack': 
      return '#1c78c0';
    case 'Jquery': 
      return '#0868ac';
    default:
      return '#33bdb2';
  }
}

function MySkills () {
  const [japanese, setJapanese] = useState(0)
  const [mySkills, setMySkills] = useState({
    Japanese: 90,
    Html: 95,
    Css: 95,
    Javascript: 85,
    Jquery: 90,
    React: 70,
    Redux: 70,
    Vue2: 65,
    Vuex: 70,
    Typescript: 25,
    Firebase: 60,
    Git: 50,
    Webpack: 50,
    Photoshop: 75
  })

  useEffect(()=>{
    console.log(Object.keys(mySkills) );
    return () => {

    }
  },[]);


  return (
    <div style={{padding: "0 10px 0"}}>
      <div 
        className="nes-container with-title" 
        style={{
          position: "relative", 
          width:"100%", 
          maxWidth:"860px", 
          margin: "30px auto 0",
          padding:'1.5rem 1rem', 
          marginTop: "30px",
          marginBottom: '30px', 
          boxSizing:"border-box" 
        }}>
        <h3 className="title">My Skills</h3>
        
        <div style={{display: 'flex', flexWrap:'wrap',}}>
        {
        Object.keys(mySkills).map(skill=>(
            <MySkillsCircle label={skill} key={skill} > 
              <AnimatedProgressProvider
                valueStart={0}
                valueEnd={mySkills[skill]}
                duration={1.4}
                easingFunction={easeQuadInOut}
              >
              {value => {
                const roundedValue = Math.round(value);
                return (
                  <CircularProgressbar
                    value={value}
                    text={`${roundedValue}%`}
                    styles={buildStyles({
                      pathTransition: "none",
                      pathColor: handleColor(skill),
                      textColor: '#000',
                      textSize: "13px"
                    })}
                  />
                );
              }}
            </AnimatedProgressProvider>
          </MySkillsCircle>
        ))
        }
        </div>
      </div>
    </div>
  )
}

export default MySkills;