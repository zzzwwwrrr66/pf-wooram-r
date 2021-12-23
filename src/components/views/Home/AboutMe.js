import {useState} from 'react';
import './css/MySkills.css'

function AboutMe () {
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
        <h3 className="title">about me</h3>
        <div className='about-me-wrap' >
          <div>
              <p>name: cho wooram チョ ウラム</p>
              <p>age: 30</p>
              <p>hobby: 読書、旅行、ゲーム、WEB勉強</p>
              <p>comment: コツコツ、繰り返すより新しい冒険</p>
              <div className="about-me-ico-wrap">
                <a href='https://github.com/zzzwwwrrr66' target='_blank' rel="noopener">
                  <i className="nes-icon github is-medium"></i>
                </a>
                <a href="mailto:zzzwwwrrr66@gmail.com" title='email' target='_blank' rel="noopener" style={{marginLeft: '15px'}}>
                  <i className="nes-icon gmail is-medium"></i>
                </a>
              </div>
          </div>
          <div>
            <img alt='me' src={require('./me.png').default} style={{width: '200px'}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutMe;