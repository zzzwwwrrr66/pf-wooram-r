import { useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {CircularProgress, usePagination} from '@mui/material/';
import { styled } from '@mui/material/styles';
import _ from 'lodash'

import ProjectData from './ProjectData';
import Paging from './Paging';
import SortLabel from './SortLabel';
import ItemList from './ItemList';
import SortYear from './SortYear'

function Project() {

  useEffect(() => {
  }, [])

  return(
    <>
    <h1>
    Project Page
    </h1>
    <SortLabel />
    <SortYear />
    <Paging />
    <ItemList />
    </>
  )
}

export default Project;