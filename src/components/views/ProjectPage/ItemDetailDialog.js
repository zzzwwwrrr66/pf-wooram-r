import React, { useState, useReducer, useEffect, memo } from "react";
import { connect } from 'react-redux';
import {actionProjectDetailOpen, actionProjectDetailClose} from '../../../store';


import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';

function ItemDetailDialog({closeDialog, state, }) {
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
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

  useEffect(()=> {
    return;
  }, [state.darkMod]);

  return (
    <Dialog onClose={closeDialog} open={state.projectStatus.detailIsOpen} maxWidth='md' sx={{margin:'10px'}} style={{margin:'10px'}}>
      <div 
        className={state.darkMod ? "nes-container with-title is-centered is-dark" : "nes-container with-title is-centered"}
        style={{positon: 'relative' ,maxWidth: '900px', width: '100%', fontFamily: `"メイリオ", "Meiryo", "ＭＳ Ｐゴシック", "MS PGothic", -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`}}
      > 
        {
          currentItem&&
          <>
            <p style={{fontSize: '20px', fontWeight: 'bold'}}>{currentItem.title}</p>
            <p>{currentItem.kinds}</p>
            <div style={{textAlign:'left'}}>
              {
                currentItem.page_url &&
                <a href={currentItem.page_url} target='_blank' rel="noopener" style={{margin:'0 5px 0', color: '#33bdb2'}} >Move Page</a>
              }
              {
                currentItem.page_url_02 &&
                <a href={currentItem.page_url_02} target='_blank' rel="noopener" style={{margin:'0 5px 0', color: '#33bdb2'}}>Move SP Page</a>
              }
            </div>
            <ul style={{textAlign: 'left'}}>
            {
              currentItem.info_01.split(',').map((v, i)=>(
                v !== '' &&
                <li key={i}>{v}</li>
              ))
            }
            </ul>
            <div className='img-wrap'>
              {
                currentItem.pc_img.length > 0 &&
                <>
                <p style={{marginTop:'20px'}}>PC image</p>
                {
                  currentItem.pc_img.map(imgName => (
                    <div key={imgName}>
                      <img src={require(`./images/${imgName}`).default} alt='' style={{maxWidth:'', width: '100%'}} />
                    </div>
                  ))
                }
                </>
                
              }
              {
                currentItem.sp_img.length > 0 &&
                <>
                <p style={{marginTop:'20px'}}>SP image</p>
                {
                  currentItem.sp_img.map(imgName => (
                    <div key={imgName}>
                    <img src={require(`./images/${imgName}`).default} alt='' style={{maxWidth:'364px', width: '100%'}} />
                    </div>
                  ))
                }
                </>
              }
            </div>
          </>
        }
        <CloseIcon fontSize='large' style={{cursor: 'pointer', position: 'absolute', top:'10px', right: '10px'}} onClick={closeDialog}/>
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