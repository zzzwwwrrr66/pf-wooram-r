import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import SendEmailForm from './SendEmailForm';

import { PfContainer, PfInner} from '../StyledComponents/index';
import DarkmodChkBox from '../../DarkmodChkBox';

function Contact({state}) {

  useEffect(() => {
    return;
  }, [state.darkMod]);

  return(
    <>
    <DarkmodChkBox />
    <PfContainer >
      <PfInner 
        className={state.darkMod ? "nes-container with-title is-dark" : "nes-container with-title"}
      > 
        <h3 className="title">Contact Me</h3>
        <SendEmailForm />

      </PfInner>
    </PfContainer>
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

export default connect(mapStateToProps, mapDispatchToProps) (Contact);