import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { actionIsLogin, actionUserInfo } from '../../../store'

import { updateProfile } from "@firebase/auth";
import { authService } from '../../../firebase';
import { ref, uploadString, getDownloadURL, deleteObject } from "@firebase/storage";
import { storageService ,dbService} from '../../../firebase'
import { v4 as uuidv4 } from 'uuid';

import { CircularProgress } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import './style.css';

import UserGuestBook from './UserGuestBook';

// 내가 tweet 한거, 프로필 수정, where사용해서 내 tweet 가져오기(orderBy) -> 에러링크 들어가면 자동으로 만들어줌 
// updateProfile 사용 수정-> displayName과 PhotoURL밖에 사용못함 -> 실시간으로 가져오려면 setuserObj(authService.currentUser.displayName or userId or photoUrl) => refreshUser function 을 만들것!!! 
// 리프레쉬 펑션 -> 프로필수정할때마다 리프레쉬 실행 -> 새로받아온 유저 정보를 리덕스 디스패치

// const refreshUserInfo = () => {
//   setUserObj({
//   uid: authService.getAuth().currentUser.uid,
//   displayName: authService.getAuth().currentUser.displayName
//   })
//   }
window.addEventListener("dragover", function(e) {
  e.preventDefault();
}, false);
window.addEventListener("drop", function(e) {
  e.preventDefault();
}, false);
  

function EditProfile({state, dispatch}) {
  console.log('edit profile is renderd ');
  const [userName, setuserName] = useState(state.userInfo.userName);
  const [userImg, setUserImg] = useState(state.userInfo.userImg);
  const [defalutUserImg, setDefalutUserImg] = useState(state.userInfo.userImg);
  const [editLoading, setEditLoading] = useState(false);
  const profileRef = useRef(null)
  const mediaFileRef = useRef(null)

  useEffect(()=>{
    profileRef.current.classList.add('dragging');
    profileRef.current.classList.remove('dragging');

    profileRef.current.addEventListener('dragover', function() {
      profileRef.current.classList.add('dragging');
    });
    profileRef.current.addEventListener('dragleave', function() {
      profileRef.current.classList.add('dragging');
    });
  }, []);

 

  const reloadUser = async () => {
    // change로 지켜보고 되는지 확인, loading 
    
    if(userName !== state.userInfo.userName) {
      setEditLoading(true)
      await updateProfile(await authService.getAuth().currentUser, {
        displayName: userName,
      });
      refreshUserInfo();
    }
    if(userImg !== state.userInfo.userImg) {
      setEditLoading(true)
      console.log('Image is changed');
      let imgUrl = null;
      
      if(userImg) {
        const fileRef = ref(storageService, `${state.userInfo.userId}/${uuidv4()}`);
        const response = await uploadString(fileRef, userImg, "data_url");
        imgUrl = await getDownloadURL(response.ref);
      }
      await updateProfile(await authService.getAuth().currentUser, {
        photoURL: imgUrl,
      });

      if(defalutUserImg) {
        const _deleteRef = ref(storageService, defalutUserImg);
        await deleteObject(_deleteRef);
      }
      
      refreshUserInfo();
    }
    setEditLoading(false)
    return false;
  }

  const refreshUserInfo= () => {
    // if -> photo 바꾸는지 name바꾸는지 <- 여기선 필요없을듯???
    let userObj = {};
    if(userName !== state.userInfo.userName) {
      console.log(authService.getAuth().currentUser)
      userObj = {
        ...userObj,
        userName: authService.getAuth().currentUser.displayName,
      }
    }
    if(userImg !== state.userInfo.userImg) {
      userObj = {
        ...userObj,
        userImg: authService.getAuth().currentUser.photoURL,
      }
    }
    
    dispatch(actionIsLogin(true));
    dispatch(actionUserInfo(userObj));
  }
  

  

  const handleImgDrop = (e) => {
    profileRef.current.classList.remove('dragging');
    profileRef.current.classList.remove('hasImage');
    var file = e.dataTransfer.files[0]
    if (file) {

      var reader = new FileReader();

      //attach event handlers here...
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        setUserImg(reader.result);
        profileRef.current.style.backgroundImage = 'url(' + reader.result + ')';
        profileRef.current.classList.add('hasImage');
      }
    }
  }

  const handleImgChange = (e) => {
    var input = e.target;
    if (input.files && input.files[0]) {
      var file = input.files[0];
  
      var reader = new FileReader();
  
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        setUserImg(reader.result);
        profileRef.current.style.backgroundImage = 'url(' + reader.result + ')';
        profileRef.current.classList.add('hasImage');
      }
    }
  }

  const handleImgClick = () => {
    mediaFileRef.current.click();
  }
  const inputChange = (e) => {
    setuserName(e.target.value);
  }
  const handleUpdateUserName = () => {
    reloadUser();
  }
  
  return(
    <>
    <div style={{padding: "0 10px 0"}}>
      <div className="nes-container with-title" style={{position: "relative", width:"100%", maxWidth:"860px", margin: "30px auto 0",padding:'1.5rem', marginTop: "30px", boxSizing:"border-box" }}>
          <h3 className="title">{state.userInfo.userName}'s Profile</h3>
          <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto', textAlgin:"center", padding: '15px 10px 0 15px', alignItems: 'center', justifyContent:"center" }}>
            <div 
              id="profile" 
              ref={profileRef} 
              onClick={handleImgClick}
              onDrop={handleImgDrop}
              style={{ backgroundImage: `url(${state.userInfo.userImg})`, textAlign:'center', position: 'relative' }}
            >
            <div style={{position: 'absolute',padding:'2px',backgroundColor: '#33bdb2', bottom: '0', right:'0', borderRadius: '5px'}}>
              <span><CameraAltIcon style={{color:'#fff'}}/></span>
            </div>
            <div className="dashes"></div>
            {/* <label>Click or drag an image</label> 카메라 아이콘넣기 */}
          </div>
            {
              state.userInfo.userAccount 
              && <p style={{margin:'0 -1rem 10px'}}>{state.userInfo.userAccount}</p>
            }
            <div className="nes-field">
              <label htmlFor="name_field">Your name</label>
              <input value={userName ? userName : ''} onChange={inputChange} type="text" id="name_field" className="nes-input" maxLength="9" style={{minWidth: '232px'}}/>
            </div>
            <div style={{marginTop: '20px'}}>
              <button onClick={handleUpdateUserName} type="button" className="nes-btn" style={{minWidth: '232px'}}>
                {
                  editLoading
                  ? <CircularProgress sx={{color: '#33bdb2'}}/>
                  : `Update Profile`
                }
              </button>
            </div>
          </div>
      </div>
    </div>

    <div style={{padding: "0 10px 0"}}>
      <div className="nes-container with-title" style={{position: "relative", width:"100%", maxWidth:"860px", margin: "30px auto 0",padding:'1.5rem', marginTop: "30px", boxSizing:"border-box" }}>
          <h3 className="title">{state.userInfo.userName}'s Guest Book</h3>
          <UserGuestBook />
      </div>
    </div>
    
    <input type="file" id="mediaFile" ref={mediaFileRef} onChange={handleImgChange} />
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

export default connect(mapStateToProps, mapDispatchToProps) (EditProfile);


// "Ars7bBm7JCPYseAVm4ilBNV7IsI3 Ars7bBm7JCPYseAVm4ilBNV7IsI3