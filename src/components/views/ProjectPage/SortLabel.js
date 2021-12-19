import React, { useState, useReducer, useEffect, memo, useRef } from "react";
import { connect } from 'react-redux';
import { actionProjectChangeLabel, actionProjectDeleteLabel } from '../../../store';

import _ from 'lodash';
import './css/Sort.css';

const SortLabel = ({state, dispatch}) => {
  const [currentLabel, setCurrentLabel] = useState([]);
  const btnRef = useRef([])

  useEffect(() => {
    setCurrentLabel(state.projectStatus.currentLabel);
    return () => {
    }
  }, []);
  
  // page change init
  useEffect(() => {
    btnRef.current.forEach(el=>{
      el.classList.remove('active');
    });
  }, [state.projectStatus.currentPage]);

  const clickLabel = (e) => {
    btnRef.current.forEach(el=>{
      if(el.value === e.target.value && !el.classList.contains('active')) {
        el.classList.add('active');
      } else if(el.value === e.target.value && el.classList.contains('active')) {
        el.classList.remove('active');
      }
    });
    
    if(!state.projectStatus.currentLabel.includes(e.target.value)) {
      dispatch(actionProjectChangeLabel(e.target.value));
    } else {
      dispatch(actionProjectDeleteLabel(e.target.value));
    }
  }
  
  return (
    <>
    <h4>sort label</h4>
    <div className='sort-skill-btn-wrap'>
      <button value='html' onClick={clickLabel} ref={el => btnRef.current[0] = el}>html</button>
      <button value='css' onClick={clickLabel} ref={el => btnRef.current[1] = el}>css</button>
      <button value='javascript' onClick={clickLabel} ref={el => btnRef.current[2] = el}>javascript</button>
      <button value='ajax' onClick={clickLabel} ref={el => btnRef.current[3] = el}>ajax</button>
      <button value='vue' onClick={clickLabel} ref={el => btnRef.current[4] = el}>vue</button>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps) (SortLabel);