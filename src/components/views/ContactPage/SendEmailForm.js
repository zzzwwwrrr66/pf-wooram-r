import { useState, useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
import CircularProgress from '@mui/material/CircularProgress';
import { connect } from 'react-redux';

init("user_ookQUxWA7b2z7WZNGZSV5");

// emailjs.sendForm('service_ms44ect', 'template_jpm1v5k', formRef.current, 'user_ookQUxWA7b2z7WZNGZSV5')
function checkEmail(val) {
  if(val) {
    const emailRules = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ 
    if(emailRules.test(val)) return true;
    else return false
  }
}

function checkName(val) {
  if(val === '' && val.length <= 40) {
    if(val === '') {
      return 'ネームは必須です。'
    } else if(val.length <= 40) {
      return 'ネームは40文字以下です。'
    }
  }
  else return false
}
function checkMessage(val) {
  if(val === '' && val.length <= 200) {
    if(val === '') {
      return 'メッセージは必須です。'
    } else if(val.length <= 200) {
      return 'メッセージは200文字以下です。'
    }
  }
  else return false
}

function SendEmailForm({state}) {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sendLoading, setSendLoading] = useState(false);
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const messageRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    
  }, [state.darkMod]);

  const init = () => {
    setEmail('');
    setName('');
    setMessage('');
    setSendLoading(false);
  }

  const emailChange = (e) => {
    checkEmail(e.target.value);
    setEmail(e.target.value);
  }
  const nameChange = (e) => {
    setName(e.target.value);
  }
  const infoChange = (e) => {
    setMessage(e.target.value);
  }
  const sendEmailSubmit = (e) => {
    e.preventDefault();

    if(!checkEmail(email)) {
      alert('メールアドレスを再確認してください。');
      emailRef.current.focus();
      return
    }

    let checkNameVal = checkName(name)
    if(checkNameVal) {
      alert(checkNameVal);
      nameRef.current.focus();
      return
    }

    let checkMessageVal = checkMessage(message)
    if(checkMessageVal) {
      alert(checkMessageVal);
      messageRef.current.focus();
      return
    }


    setSendLoading(true);
    emailjs.sendForm('service_ms44ect', 'template_jpm1v5k', formRef.current, 'user_ookQUxWA7b2z7WZNGZSV5')
    .then((result) => {
      alert('send email sucess!');
      init();
    }, (error) => {
        console.log(error.text);
        setSendLoading(false);
    });
  }

  return(
    <>
    <form ref={formRef} onSubmit={sendEmailSubmit}>
      <div className="nes-field" style={{marginBottom: '15px'}}>
        <label htmlFor="email_field">Your email</label>
        <input 
          type="text" 
          name='user_email' 
          value={email} 
          id="email_field" 
          className={state.darkMod ? "nes-input is-dark" : "nes-input" } 
          onChange={emailChange} 
          ref={emailRef} 
        />
      </div>
      <div className="nes-field" style={{marginBottom: '15px'}}>
        <label htmlFor="name_field">Your name</label>
        <input 
          type="text" 
          name='user_name' 
          value={name} 
          id="name_field" 
          className={state.darkMod ? "nes-input is-dark" : "nes-input" } 
          onChange={nameChange} 
          ref={nameRef}  
        />
      </div>
      <div className="nes-field" style={{marginBottom: '30px'}}>
        <label htmlFor="textarea_field">Your message</label>
        <textarea 
          id="textarea_field" 
          className={state.darkMod ? "nes-textarea is-dark" : "nes-textarea" } 
          value={message} 
          name='user_message' 
          onChange={infoChange} 
          ref={messageRef}
        ></textarea>
      </div>

      <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '15px'}}>
        <button 
          type="submit" 
          className={state.darkMod ? 'nes-btn is-main is-dark' : 'nes-btn is-main'}
          style={{width:'184px'}}
        >
        {
          sendLoading
          ? <CircularProgress size={20} style={{color:'#fff'}} />
          : 'Send Email'
        }
        </button>
      </div>
  </form>
  </>
  )
}

function mapStateToProps( state ){
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (SendEmailForm);