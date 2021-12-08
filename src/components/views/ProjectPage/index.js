import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Project() {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#5bcac1',
        main: '#33bdb2',
        dark: '#23847c',
        contrastText: '#fff',
      },
      secondary: {
        light: '#5bcac1',
        main: '#33bdb2',
        dark: '#23847c',
        contrastText: '#000',
      },
    },
  });
  return(
    <>
    <h1>
    Project Page
    </h1>
    </>
  )
}

export default Project;