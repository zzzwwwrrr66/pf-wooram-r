import React, { useState, useReducer, useEffect, memo } from "react";
import './Paging.css';
import Pagination from "react-js-pagination";

import { connect } from 'react-redux';
import {actionProjectChangePage} from '../../../store';



const Paging = ({state, dispatch}) => {
  const [allCount, setAllCount] = useState(0);

  useEffect(() => {
    console.log('paging rerender');
    setAllCount(state.projectStatus.dataCount);
    return () => {
    }
  }, [])

  const [page, setPage] = useState(1);

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
    dispatch(actionProjectChangePage(pageNum));
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={5}
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