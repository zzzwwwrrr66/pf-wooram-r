import React, { useState, useReducer, useEffect, memo } from "react";
import { connect } from 'react-redux';
import _ from 'lodash';



const ItemList = ({state}) => {
  const [allItems, setAllItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(state.projectStatus.currentPage);
  

  useEffect(() => {
    console.log(state.projectStatus.data);
    setAllItems(prev=>[...prev, ...state.projectStatus.data]);
  }, []);
  
  useEffect(() => {
    setCurrentItems(pagingItems(state.projectStatus.data));
  }, [state.projectStatus.currentPage]);

  useEffect(() => {
    console.log(currentItems);    
    //currentYear 바뀔때 setCurrentItems
    //currentLabel 바뀔때 setCurrentItems
  }, [state.projectStatus.currentYear, state.projectStatus.currentLabel]);

  
  const pagingItems = (itemArr) => {
    const result = [];
    let startNum = ((state.projectStatus.currentPage - 1) * 5 + 1) - 1;
    let lastNum = state.projectStatus.currentPage * 5;
    console.log('currentPage ', state.projectStatus.currentPage, 'startNum', startNum, ' lastNum', lastNum);
    for(let i = startNum; i < lastNum; i++) {
      console.log(i);
      if(itemArr[i]) result.push(itemArr[i])
    }
    return result;
  }

  

  return (
    <>
    
    <ul>currentLabel : 
    {
      state.projectStatus.currentLabel.map(v=>(<li>{v}</li>))
    }
    </ul>
    <p>currentPage : {state.projectStatus.currentPage}</p>
    <p>currentYear : {state.projectStatus.currentYear}</p>

    <ul>
      {
        currentItems.length && 
        currentItems.map(v =>
          (
            <li>
              {v.title};
            </li>
          )
        )
      }
    </ul>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps) (memo(ItemList));