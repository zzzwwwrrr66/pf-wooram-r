import { useState } from 'react';

import SendEmailForm from './SendEmailForm';

function Contact() {
 
  return(
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
        <h3 className="title">Contact Me</h3>
        <SendEmailForm />

      </div>
    </div>
    
  )
}

export default Contact;