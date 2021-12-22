import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { dbService } from '../../../firebase';

import UserGuestBookList from './UserGuestBookList';

import {CircularProgress, usePagination} from '@mui/material/';

function UserGuestBook({state, dispatch}) {
  const [userItems, setUserItems] = useState([]);
  const [listLoading, setListLoading] = useState(false);

  const getMyGuestBookList = async () => {
    const q = query(
      collection(dbService, "guest_book"),
      where("userId", "==", state.userInfo.userId),
      orderBy("createAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {

      setUserItems(prevItems=> {
        return [...prevItems, doc.data()];
      })
    });
  };

  useEffect(()=>{
    getMyGuestBookList();
    
  }, []);

  return(
    <>
      <section className="message-list">
        {
          userItems.length
          ? userItems.map((itemObj, i)=> {
            return((
              <UserGuestBookList key={i} itemObj={itemObj} />
            ))
          })
          : <div><p>アイテムがありません</p></div>
          // : <div style={{display:'flex', justifyContent: 'center'}}><CircularProgress/></div>
        }
      </section>
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

export default connect(mapStateToProps, mapDispatchToProps) (UserGuestBook);