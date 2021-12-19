import React, { useState, useReducer, useEffect, memo } from "react";
import './css/Paging.css';
import Pagination from "react-js-pagination";

import { connect } from 'react-redux';


const Paging = ({state, dispatch, actionChangePageNum, itemsCount, itemsAllCount}) => {
  const [allCount, setAllCount] = useState(0);

  useEffect(() => {
    if(itemsAllCount) setAllCount(itemsAllCount);
    return () => {
    }
  }, [itemsAllCount]);

  const [page, setPage] = useState(1);

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
    dispatch(actionChangePageNum(pageNum));
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={itemsCount}
      totalItemsCount={
        allCount && allCount
      }
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};


function mapStateToProps(state){
  return {state};
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Paging);