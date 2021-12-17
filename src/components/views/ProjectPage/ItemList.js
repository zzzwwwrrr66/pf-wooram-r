import React, { useState, useReducer, useEffect, memo } from "react";
import { connect } from 'react-redux';
import _ from 'lodash';

import {actionProjectDetailOpen, actionProjectDetailClose} from '../../../store';
import ItemDetailDialog from './ItemDetailDialog'


const ItemList = ({state, dispatch, openDialog}) => {
  const [allItems, setAllItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(state.projectStatus.currentPage);
  const [currentCount, setCurrentCount] = useState(0);
  

  useEffect(() => {
    console.log(state.projectStatus.data);
    setAllItems(prev=>[...prev, ...state.projectStatus.data]);
  }, []);
  
  useEffect(() => {
    setCurrentItems(pagingItems(state.projectStatus.data));
    setCurrentCount(state.projectStatus.data.length);
  }, [state.projectStatus.currentPage]);

  useEffect(() => {
    var initData = pagingItems(state.projectStatus.data);
    let sortData = [];

    if(state.projectStatus.currentYear === 'all' && !state.projectStatus.currentLabel.length) {
      setCurrentItems(initData);
      setCurrentCount(initData.length);
      return;
    }

    for(let i = 0; i < initData.length; i++) {
      // label
      if(state.projectStatus.currentLabel.length) {
        console.log('current label ',state.projectStatus.currentLabel, ' item label ', initData[i].tech);
        let diff = _.intersection(state.projectStatus.currentLabel, initData[i].tech);
        console.log(diff);
        if(!diff.length) continue; 
      }

      // year
      if(state.projectStatus.currentYear !== 'all' && initData[i].add_year !== state.projectStatus.currentYear) continue;
      
      sortData.push(initData[i])
    }
    setCurrentItems(sortData);
    setCurrentCount(sortData.length);
  }, [state.projectStatus.currentYear, state.projectStatus.currentLabel]);

  
  const pagingItems = (itemArr) => {
    const result = [];
    let startNum = ((state.projectStatus.currentPage - 1) * 10 + 1) - 1;
    let lastNum = state.projectStatus.currentPage * 10;
    console.log('currentPage ', state.projectStatus.currentPage, 'startNum', startNum, ' lastNum', lastNum);
    for(let i = startNum; i < lastNum; i++) {
      if(itemArr[i]) result.push(itemArr[i])
    }
    return result;
  }

  

  return (
    <>
    {/* <ul>currentLabel : 
    {
      state.projectStatus.currentLabel.map(v=>(<li>{v}</li>))
    }
    </ul>
    <p>currentPage : {state.projectStatus.currentPage}</p>
    <p>currentYear : {state.projectStatus.currentYear}</p> */}

    <div style={{display:'flex', justifyContent: 'flex-end'}}>
      <p>COUNT : {currentCount}</p>
    </div>
    <ul>
      {
        currentItems.length && 
        currentItems.map(v =>
          (
            <li key={v.index} style={{backgroundColor: '#eee', marginBottom: '15px'}}>
              <p>{v.title}</p>
              <p>{v.add_year}</p>
              <div>
                {
                  v.tech.map(skill=>(
                    <span>{skill} </span>
                  ))
                }
              </div>
              <div >
                <button type="button" className="nes-btn is-small is-main" onClick={()=>openDialog(v.index)}>learn more</button>
              </div>
            </li>
          )
          )
        }
        <ItemDetailDialog  />
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
    openDialog: (detailId)=>{dispatch(actionProjectDetailOpen(detailId))}
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (memo(ItemList));