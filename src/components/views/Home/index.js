import { useEffect } from 'react';

import AboutMe from './AboutMe';
import MySkills from './MySkills';

const getData = async () => {
  
}

function Home() {
  useEffect(() => {
    getData();
  }, [])
  
  return(
    <>
    <AboutMe />
    <MySkills />
    </>
  )
}

export default Home;