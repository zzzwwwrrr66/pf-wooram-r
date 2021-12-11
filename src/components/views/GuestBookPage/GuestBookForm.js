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
    <h1>GuestBookForm</h1>
      <Container style={{
        display:'flex',
        justifyContent: 'center'
      }}>
        <Box
        id="outlined-multiline-static"
          component="form"
          sx={{
            maxWidth: '100%',
          }}
        >
          <TextField
            id="outlined-multiline-static"
            fullWidth
            value={val}
            placeholder=""
            required
            sx={{
              width: 500,
              maxWidth: '100%',
            }}
            onChange={hadleVal}
          />
          {
            fileInfo && 
            <div style={{display:'flex', justifyContent: 'center', position: 'relative', flexDirection: 'column'}}>
              <div>
                <img src={fileInfo.url} style={{width:`${fileInfo.width}px`,maxWidth:`450px`}} alt="" />
              </div>
              <p><button type="button" onClick={handleClearImg}>clear img</button></p>
            </div>
          }

          <div >
            <label class="nes-btn">
              <span>Select your file</span>
              <input type="file" accept="image/*" onChange={handleFile} ref={inputFileRef}/>
            </label>
            {/* <input type="file" /> */}
          </div>
        <Stack direction="row"  sx={{mt:2}}>
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleAddData}>
            Send
          </Button>
        </Stack>
      </Box>
    </Container>
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