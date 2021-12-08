import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GuestBookForm from './GuestBookForm';
import { dbService } from '../../../firebase';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  } from "firebase/firestore";

import CommentList from './CommentList';

function GuestBook({state}) {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    const q = query(collection(dbService, 'guest_book'), orderBy("createAt", "desc"));
    const unsub = onSnapshot(q, snapshot => {
      const itemsArr = snapshot.docs.map(item => (
          {
            commentId: item.id,
            ...item.data(),
          }
        )
      );
      console.log(itemsArr)
      setCommentList(itemsArr);

      return ()=> {
        unsub();
      }
    });
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        light: '#5bcac1',
        main: '#33bdb2',
        dark: '#23847c',
        contrastText: '#fff',
      },
      secondary: {
        light: '#5bcac1',
        main: '#33bdb2',
        dark: '#23847c',
        contrastText: '#000',
      },
    },
  });
  return(
    <>
    <h1>
    GuestBook Page
    </h1>
    <GuestBookForm  />
    <ul>
      {
        commentList.map(itemObj=> {
          return((
            <CommentList key={itemObj.commentId} itemObj={itemObj} isMine={
              itemObj.userId && state.userInfo
              ? itemObj.userId === state.userInfo.userId
              : null
            } />
          ))
        })
      }
    </ul>
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