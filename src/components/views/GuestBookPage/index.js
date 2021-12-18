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
  } from "firebase/firestore";

import CommentList from './CommentList';

const List = styled('ul')({
  listStyle: 'none',
  padding: 1,
  margin: 0,
  display: 'flex',
});

function GuestBook({state}) {
  const [listLoading, setListLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listCount, setListCount] = useState(null);
  const { items } = usePagination({
    count: 5,
  });

  useEffect(() => {
    const q = query(collection(dbService, 'guest_book'), orderBy("createAt", "desc"));
    const unsub = onSnapshot(q, snapshot => {
      setListLoading(true);

      const itemsArr = snapshot.docs.map(item => (
          {
            commentId: item.id,
            ...item.data(),
          }
        )
      );
      console.log(itemsArr)
      setCommentList(itemsArr);
      setListLoading(false);
      setListCount(itemsArr.length);
      return ()=> {
        unsub();
      }
    });
  }, []);

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
      
        <h3 className="title">Guest Book List</h3>
        <section className="message-list">
        {
          commentList.length
          ? commentList.map(itemObj=> {
            return((
              <CommentList key={itemObj.commentId} itemObj={itemObj} isMine={
                itemObj.userId && state.userInfo
                ? itemObj.userId === state.userInfo.userId
                : null
              } />
            ))
          })
          : <div style={{display:'flex', justifyContent: 'center'}}><CircularProgress/></div>
        }
      </section>
      

        <nav style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}>
        <List>
          {items.map(({ page, type, selected, ...item }, index) => {
            let children = null;

            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              children = '…';
            } else if (type === 'page') {
              children = (
                <button
                  type="button"
                  style={{
                    fontWeight: selected ? 'bold' : undefined, padding: '2px', margin:'0 5px'
                  }}
                  {...item}
                >
                  {page}
                </button>
              );
            } else {
              children = (
                <button type="button" {...item} style={{padding: '2px', margin:'0 10px'}}>
                  {
                  type == 'next'
                  ? `>`
                  : `<`
                  }
                </button>
              );
            }

            return <li key={index}>{children}</li>;
          })}
        </List>
      </nav>
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