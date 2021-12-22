import { useEffect } from 'react';



const getData = async () => {
  
}

function Home() {
  useEffect(() => {
    getData();
  }, [])
  
  return(
    <>
    <h1>
    Home 
    </h1>
    </>
  )
}

export default Home;