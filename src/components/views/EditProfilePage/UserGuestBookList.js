import { useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import moment from 'moment';

import { connect } from 'react-redux';

function UserGuestBookList ({itemObj, state}) {

  useEffect(()=>{
    return;
  }, [state.darkMod]);

  return (
    <li style={{ fontSize: '18px' }}>
        <div 
          className={state.darkMod ? "nes-container is-rounded is-dark" : "nes-container is-rounded"}
          style={{marginBottom: '15px'}}
        >
          <div style={{display:'flex', alignItems: 'center', marginBottom:'5px'}}>
            {
              itemObj.userImg
              ? <Avatar src={itemObj.userImg} />
              : <Avatar />
            }
            <p style={{margin: '0 0 0 5px' }}>
              {itemObj.userName || itemObj.userAccount}
            </p>
          </div>
          <p style={{fontSize:'14px', marginBottom: '10px'}}>
          {
            moment(itemObj.createAt).diff(Date.now()) > 0 
            ? moment(itemObj.createAt).startOf('day').fromNow()
            : moment(itemObj.createAt).startOf('hour').fromNow()
          }
          </p>
          <div style={{marginBottom: '10px'}}>
            <p>{itemObj.comment}</p>
          </div>
          {
            itemObj.imgInfo && 
            <div style={{textAlign: 'center'}}>
              <img src={itemObj.imgInfo.url} alt="" style={{maxWidth:`500px`,width:'100%'}} />
            </div>
          }
        </div>
    </li>
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

export default connect(mapStateToProps, mapDispatchToProps) (UserGuestBookList);