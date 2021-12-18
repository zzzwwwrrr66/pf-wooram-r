import { useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {CircularProgress, usePagination} from '@mui/material/';
import { styled } from '@mui/material/styles';
import _ from 'lodash'

import ProjectData from './ProjectData';
import Paging from './Paging';
import {actionProjectChangePage} from '../../../store';
import SortLabel from './SortLabel';
import ItemList from './ItemList';
import SortYear from './SortYear'

function Project() {

  useEffect(() => {
  }, [])

  return(
    <>
    <div style={{padding: "0 10px 0"}}>
      <div 
        className="nes-container with-title" 
        style={{
          position: "relative", 
          width:"100%", 
          maxWidth:"860px", 
          margin: "30px auto 0",
          padding:'1.5rem 1rem', 
          marginTop: "30px",
          marginBottom: '30px', 
          boxSizing:"border-box" 
        }}>
        <h3 className="title">Project</h3>
        <SortLabel />
        <SortYear />
        <ItemList />
        <Paging actionProjectChangePage={actionProjectChangePage} itemsCount={10} />
      </div>
    </div>
    </>
  )
}

export default Project;