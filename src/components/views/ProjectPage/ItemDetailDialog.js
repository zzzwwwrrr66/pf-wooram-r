import React, { useState, useReducer, useEffect, memo } from "react";
import { connect } from 'react-redux';
import {actionProjectDetailOpen, actionProjectDetailClose} from '../../../store'


import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

function ItemDetailDialog({closeDialog, state, }) {
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    console.log(state.projectStatus.detailId);
    if(state.projectStatus.detailId) {
      setCurrentItem(
        state.projectStatus.data.filter(v=> {
          if(v.index === state.projectStatus.detailId) return true;
          else return false;
        })[0]
      )
    } else {
      setCurrentItem(null);
    }
    return;
  }, [state.projectStatus.detailId]);

  return (
    <Dialog onClose={closeDialog} open={state.projectStatus.detailIsOpen} maxWidth='md'>
      <div className="nes-container with-title is-centered " style={{maxWidth: '900px', width: '100%'}}> 
        {
          currentItem&&
          <>
            <p style={{fontSize: '20px'}}>{currentItem.title}</p>
            <p>{currentItem.kinds}</p>
            <div>
              {
                currentItem.page_url &&
                <a href={currentItem.page_url} target='_blank' style={{margin:'0 5px 0', color: '#33bdb2'}} >Move PC Page</a>
              }
              {
                currentItem.page_url_02 &&
                <a href={currentItem.page_url_02} target='_blank' style={{margin:'0 5px 0', color: '#33bdb2'}}>Move SP Page</a>
              }
            </div>
            <ul>
            {
              currentItem.info_01
            }
            </ul>
          </>
        }
        
      </div>
    </Dialog>
  );
}


function mapStateToProps(state){
  return {state};
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    closeDialog: function(){dispatch(actionProjectDetailClose())},
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (memo(ItemDetailDialog));