import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import {CircularProgress, usePagination} from '@mui/material/';
import { styled } from '@mui/material/styles';

import GuestBookForm from './GuestBookForm';
import { dbService } from '../../../firebase';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit
  } from "firebase/firestore";

import {actionGuestBookChangePage} from '../../../store';

import CommentList from './CommentList';
import Paging from '../../Paging';


function GuestBook({state}) {
  const [listLoading, setListLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [currentCommentList, setCurrentCommentList] = useState([]);
  const [listCount, setListCount] = useState(null);
 
  useEffect(() => {
    console.log('guest book paging ',state.guestBookStatus.currentPage)
    const q = query(collection(dbService, 'guest_book'), orderBy("createAt", "desc"),)
    const unsub = onSnapshot(q, snapshot => {
      setListLoading(true);

      const itemsArr = snapshot.docs.map(item => (
          {
            commentId: item.id,
            ...item.data(),
          }
        )
      );
      setCommentList(itemsArr);
      setListLoading(false);
      setListCount(itemsArr.length);
      setCurrentCommentList(pagingItems(itemsArr));
      return ()=> {
        unsub();
      }
    });
  }, []);

  useEffect(()=>{
    setCurrentCommentList(pagingItems(commentList));
  }, [state.guestBookStatus.currentPage]);

  const pagingItems = (itemArr) => {
    const result = [];
    let startNum = ((state.guestBookStatus.currentPage - 1) * 5 + 1) - 1;
    let lastNum = state.guestBookStatus.currentPage * 5;
    for(let i = startNum; i < lastNum; i++) {
      if(itemArr[i]) result.push(itemArr[i])
    }
    return result;
  }

  return(
    <>
    <div style={{padding: "0 10px 0", overflowX:'hidden'}}>
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
        }}
      >
      <GuestBookForm  />
        <section className="message-list">
        <h3 className="title">Guest Book List</h3>
        {
          currentCommentList.length > 0
          ? currentCommentList.map(itemObj=> {
            return((
              <CommentList key={itemObj.commentId} itemObj={itemObj} isMine={
                itemObj.userId && state.userInfo
                ? itemObj.userId === state.userInfo.userId
                : null
              } />
            ))
          })
          : <div style={{display:'flex', justifyContent: 'center'}}>
            <CircularProgress/>
            </div>
        }
      </section>

      <Paging actionChangePageNum={actionGuestBookChangePage && actionGuestBookChangePage} itemsCount={5} itemsAllCount={listCount && listCount} />
    </div>
    </div>
    
    </>
  )
}

// isMine={itemObj.userId === state.userInfo.userId} 

function mapStateToProps( state ){
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (GuestBook);