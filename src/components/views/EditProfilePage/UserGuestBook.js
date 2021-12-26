import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { dbService } from '../../../firebase';

import UserGuestBookList from './UserGuestBookList';

import {CircularProgress, usePagination} from '@mui/material/';

import {actionGuestBookChangePage} from '../../../store';
import Paging from '../../Paging';

function UserGuestBook({state, dispatch}) {
  const [userItems, setUserItems] = useState([]);
  const [currentUserItems, setCurrentUserItems] = useState([]);
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

  useEffect(() => {
    setCurrentUserItems(pagingItems(userItems));
  }, [state.guestBookStatus.currentPage, userItems]);

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
      <section className="message-list">
        {
          currentUserItems.length
          ? currentUserItems.map((itemObj, i)=> {
            return((
              <UserGuestBookList key={i} itemObj={itemObj} />
            ))
          })
          : <div><p>アイテムがありません</p></div>
        }
      </section>

      <Paging actionChangePageNum={actionGuestBookChangePage} itemsCount={5} itemsAllCount={userItems.length} />
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