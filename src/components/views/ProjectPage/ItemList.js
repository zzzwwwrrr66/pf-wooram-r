import React, { useState, useReducer, useEffect, memo } from "react";
import { connect } from 'react-redux';
import _ from 'lodash';

import {actionProjectDetailOpen, actionProjectDetailClose, actionProjectSetCurrentData } from '../../../store';
import ItemDetailDialog from './ItemDetailDialog';

import './css/ItemList.css'


const ItemList = ({state, dispatch, openDialog}) => {
  const [allItems, setAllItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(state.projectStatus.currentPage);
  const [currentCount, setCurrentCount] = useState(0);
  
  // currentPage
  useEffect(() => {
    setAllItems(prev=>[...prev, ...state.projectStatus.data]);
  }, []);
  
  useEffect(() => {
    setCurrentItems(pagingItems(state.projectStatus.data));
    setCurrentCount(state.projectStatus.data.length);

  }, [state.projectStatus.currentPage]);

  // currentYear, currentLabel
  useEffect(() => {
    var initData = pagingItems(state.projectStatus.data);
    let sortData = [];
    let currentData = state.projectStatus.data
    let currentSortData = [];

    if(state.projectStatus.currentYear === 'all' && !state.projectStatus.currentLabel.length) {
      setCurrentItems(initData);
      setCurrentCount(initData.length);
      return;
    }

    for(let i = 0; i < initData.length; i++) {
      // label sort
      if(state.projectStatus.currentLabel.length) {
        let diff = _.intersection(state.projectStatus.currentLabel, initData[i].tech);
        if(!diff.length) continue; 
      }

      // year sort
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

    <div style={{display:'flex', justifyContent: 'flex-end',margin: '15px 0'}}>
      <p style={{margin: '0'}}>COUNT : {currentCount}</p>
    </div>
    <ul>
      {
        currentItems.length > 0  
        ? currentItems.map((v, i) =>
          (
            <li key={i} className='list-wrap' >
              <div style={{marginRight: '10px'}}>
                <p>{v.add_year}年作 【{v.kinds}】</p>
                <p style={{fontWeight: 'bold'}}>{v.title}</p>
                <div className='badge-wrap'>
                  {
                    v.tech.map((skill, i)=>(
                      <span className='nes-badge badge-txt' style={{margin:'7.5px 15px'}}>
                        <span className='is-warning'>{skill} </span>
                      </span>
                    ))
                  }
                </div>
                <div style={{marginTop: '10px'}}>
                  <button type="button" className="nes-btn is-small is-main btn" onClick={()=>openDialog(v.index)}>read more</button>
                </div>
              </div>
              {
                v.titleImg &&
                <div>
                  <img alt='' className='list-img' src={require(`./images/${v.titleImg}`).default} />
                </div>
              }
              
            </li>
          )
          )
        :<p>該当するアイテムがありません。</p>
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