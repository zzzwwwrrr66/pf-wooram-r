import { useState, useMemo, useEffect } from 'react';
import _ from 'lodash'

import ProjectData from './ProjectData';
import Paging from '../../Paging';
import {actionProjectChangePage} from '../../../store';
import SortLabel from './SortLabel';
import ItemList from './ItemList';
import SortYear from './SortYear'
import ProjectSummaryDialog from './ProjectSummaryDialog';

import { PfContainer, PfInner} from '../StyledComponents/index';

import { connect } from 'react-redux';
import { actionIsDarkmod } from '../../../store';

import DarkmodChkBox from '../../DarkmodChkBox';

function Project({state, dispatch}) {
  
  useEffect(()=>{
    return;
  },[state.darkMod]);

  return(
    <>
    <DarkmodChkBox />
    <PfContainer>
      <PfInner className={state.darkMod ? `with-title nes-container is-dark` : `with-title nes-container`}>
        <h3 className="title">Project</h3>
        <SortLabel />
        <SortYear />
        <ItemList />
        <Paging actionChangePageNum={actionProjectChangePage} itemsCount={10} itemsAllCount={ProjectData.length} />

        <ProjectSummaryDialog />
      </PfInner>
    </PfContainer>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps) (Project);