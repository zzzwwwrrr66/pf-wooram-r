import { useState, useEffect } from 'react';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService } from '../../../firebase';
import { ref, deleteObject } from "@firebase/storage";
import { storageService } from '../../../firebase'

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
          <p>{itemObj.comment}</p>
          {
            itemObj.imgInfo && 
            <div style={{maxWidth:'500px', width:`${itemObj.imgInfo.width}px`}}>
              <img src={itemObj.imgInfo.url} alt="" style={{width:'100%'}} />
            </div>
          }
          {
            isMine &&
            <ul>
              <li>
                <button onClick={handleDeleteItem(`${itemObj.commentId}`)}>Delete</button>
                <button onClick={hadleUpdateToggle}>Update</button>
              </li>
            </ul>
          }
        </>
      }
      
    </li>
  )
}

export default CommentList;