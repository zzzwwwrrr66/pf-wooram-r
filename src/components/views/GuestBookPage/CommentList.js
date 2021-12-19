import { useState, useEffect } from 'react';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService } from '../../../firebase';
import { ref, deleteObject } from "@firebase/storage";
import { storageService } from '../../../firebase'
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import {CircularProgress, usePagination} from '@mui/material/';

function CommentList ({itemObj, isMine}) {

  const [isUpdateComment, setIsUpdateComment] = useState(false);
  const [comment, setComment] = useState(itemObj.comment);

  const hadleUpdateToggle = () => {
    setIsUpdateComment(prev=> !prev);
  }

  const changeComment = (e) => {
    setComment(e.target.value);
  }

  const hadleUpdateItem = async () => {
    if(comment===itemObj.comment && !comment) return;

    const ok = window.confirm('Are you sure UPDATE this item?');
    if(ok) {
      const myDoc = doc(dbService, "guest_book", itemObj.commentId);
      await updateDoc(myDoc, {
        comment,
      });
      setIsUpdateComment(false);
    }
  }

  const handleDeleteItem = (itemId) => async () => {
    const ok = window.confirm('Are you sure DLETE this item?');
    if(ok) {
      const myDoc = doc(dbService, "guest_book", itemId);
      await deleteDoc(myDoc);
      if(itemObj && itemObj.imgInfo) {
        const _ref = ref(storageService, itemObj.imgInfo.url);
        await deleteObject(_ref);
      }
    }
    return
  }


  return (
    <li style={{ fontSize: '18px' }}>
      {
        isUpdateComment
        ? <> 
          <input value={comment} onChange={changeComment} />
          <ul>
            <li>
              <button onClick={hadleUpdateItem}>Update</button> 
              <button onClick={hadleUpdateToggle}>Cancle</button>
            </li>
          </ul>
        </>
        : <> 
        <div className="nes-container is-rounded" style={{marginBottom: '15px'}}>
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
            itemObj.imgInfo 
            && <div style={{textAlign: 'center'}}>
              <img src={itemObj.imgInfo.url} alt="" style={{maxWidth:`200px`,width:'100%'}} />
            </div>
          }
            {
            isMine &&
            <ul>
              <li>
              <button type="button" className="nes-btn is-small" onClick={handleDeleteItem(`${itemObj.commentId}`)} >Delete</button>
              </li>
            </ul>
          }
        </div>
        </>
      }
      
    </li>
  )
}

export default CommentList;