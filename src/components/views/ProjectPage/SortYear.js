import React, { useState, useReducer, useEffect, memo } from "react";
import { connect } from 'react-redux';
import { actionProjectChangeYear } from '../../../store';

import './css/Sort.css';

const SortYear = ({state, dispatch}) => {
  const [currentSelect, setCurrentSelect] = useState('all');

  // page change init
  useEffect(()=>{
    setCurrentSelect('all');
  }, [state.projectStatus.currentPage])

  const changeSelect = (e) => {
    setCurrentSelect(e.target.value);
    dispatch(actionProjectChangeYear(e.target.value));
  }

  useEffect(()=>{
    return;
  },[state.darkMod]);

  return (
    <>
    <h4 style={{marginTop:'10px'}}>
      sort year
    </h4>
    <div className={state.darkMod ? `nes-select select-wrap is-dark` : `nes-select select-wrap`}>
      <select id="default_select" onChange={changeSelect} value={currentSelect}>
        <option value="all">All</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
      </select>
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

export default connect(mapStateToProps, mapDispatchToProps) (SortYear);