import { useEffect } from 'react';

import { PfContainer, PfInner} from './views/StyledComponents';

import { connect } from 'react-redux';
import { actionIsDarkmod } from '../store';

function DarkmodChkBox({state, dispatch}) {
  
  useEffect(()=>{
    return;
  },[state.darkMod]);

  const darkmodChange = (e) => {
    if(e.target.checked) {
      dispatch(actionIsDarkmod(true));
      document.body.classList.add('dark');
    } else {
      dispatch(actionIsDarkmod(false));
      document.body.classList.remove('dark');
    }
    
  };

  return(
    <PfContainer>
      <PfInner style={{display:'flex', justifyContent:'flex-end', padding: '0'}}>
      <label>
        <input type="checkbox" className={state.darkMod ? "nes-checkbox is-dark" : "nes-checkbox"} onChange={darkmodChange} checked={state.darkMod ? true : false} />
        <span>Dark Mode</span>
      </label>
      </PfInner>
    </PfContainer>
  )
}

function mapStateToProps(state){
  return {state};
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (DarkmodChkBox);