import { useState, useEffect, useRef } from 'react';

import { connect } from 'react-redux';

import {Container, Box, TextField, Stack, Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { dbService } from '../../../firebase';
import { getDocs, collection, addDoc, serverTimestamp, onSnapshot, doc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { storageService } from '../../../firebase'
import { v4 as uuidv4 } from 'uuid';

import "nes.css/css/nes.min.css";

function GuestBookForm({state}) {
  const [val, setVal] = useState('');
  const [isLogined, setIsLogined] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef(null);

  useEffect(() => {
    if(state.userInit) {
      setIsLogined(state.isLogin);
    }
    return;
  }, [isLogined]);

  const hadleVal = (e) => {
    setVal(e.target.value);
  }

  const handleFile = (e) => {
    const thisFile = e.target.files[0]
    if(!thisFile) return;

    const reader = new FileReader(); 
    
    reader.onloadend = (finished) => {
      const dataObj = {
        url: finished.target.result,
        width: null,
        height: null,
      }
      const img = new Image();    
      img.src = finished.target.result;
      img.onload = function(){
        dataObj['width'] = this.width
        dataObj['height'] = this.height
        setFileInfo(prev=>({...prev, ...dataObj}));
      }
    }
    reader.readAsDataURL(thisFile);
  }

  const handleClearImg = () => {
    setFileInfo(null);
    inputFileRef.current.value = null;
  }

  const handleAddData = async (e) => {
    e.preventDefault();

    if(state.isLogin) {
      // file upload
      let imgUrl = null;
      if(fileInfo) {
        const fileRef = ref(storageService, `${state.userInfo.userId}/${uuidv4()}`);
        const response = await uploadString(fileRef, fileInfo.url, "data_url");
        imgUrl = await getDownloadURL(response.ref);

      }
      if(val){
        await addDoc(collection(dbService, "guest_book"), {
          comment: val,
          createAt: Date.now(),
          userAccount: state.userInfo.userAccount,
          userImg: state.userInfo.userImg,
          userId: state.userInfo.userId,
          userName : state.userInfo.userName,
          imgInfo: imgUrl 
          ? {
            url : imgUrl,
            width: fileInfo.width,
            height: fileInfo.height,
          } 
          : null,
        });

        setFileInfo(null);
        inputFileRef.current.value = null;

      } else {
        alert('글자입력 하세요')
      }
    } else {
      alert('Please Login')
    }
    
    setVal('');
  }

  return (
    <>
        <h3 className="title">Guest Book</h3>

        <div>
          <label htmlFor="textarea_field">Your Guestbook</label>
          <textarea id="textarea_field" className="nes-textarea" onChange={hadleVal} value={val} required></textarea>
        </div>

        {
          fileInfo && 
          <div style={{paddingTop:'5px'}}>
            <div style={{textAlign: 'center'}}>
              <img src={fileInfo.url} style={{maxWidth:`500px`,width:'100%', objectFit:'cover'}} alt="" />
            </div>
            {/* <p><button type="button" onClick={handleClearImg} style={{padding:'5px'}}>clear img</button></p> */}
            <button type="button" className="nes-btn is-small" onClick={handleClearImg} style={{padding:'5px'}}>Clear Img</button>
          </div>
          }

          <div style={{paddingTop:'10px'}}>
            <label className="nes-btn is-small">
              <span>Select Your Image</span>
              <input type="file" accept="image/*" onChange={handleFile} ref={inputFileRef}/>
            </label>
            {/* <input type="file" /> */}
          </div>
          <div style={{display:'flex', justifyContent: 'center', position: 'relative', flexDirection: 'column', paddingTop:'15px', marginBottom: '30px'}}>
            <button type="button" className="nes-btn is-main" onClick={handleAddData}>Send</button>
          </div>

    
    </>
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

export default connect(mapStateToProps, mapDispatchToProps) (GuestBookForm);