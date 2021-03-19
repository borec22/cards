import React from 'react';
import {Routes} from '../m3-Routes/Routes';
import {Header} from '../m1-Header/Header';
import {theme} from '../../../utils/theme';
import {ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
   appMain: {
      width: '100%'
   }
})

export const Main: React.FC = () => {
   const classes = useStyles();

   return (
      <ThemeProvider theme={theme}>
         <Header/>

         <div className={classes.appMain}>
            <Routes/>
         </div>
         <CssBaseline/>
      </ThemeProvider>
   );
};