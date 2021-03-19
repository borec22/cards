import {Grid} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core/styles';
import React from 'react';
import { Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import {PATH} from '../../main/m3-Routes/Routes';
import {theme} from '../../../utils/theme';


export const CardsList = () => {
   console.log('render PacksList component');
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

   if (!isLoggedIn) {
      return <Redirect to={PATH.SIGN_IN_PATH}/>
   }

   return (
      <ThemeProvider theme={theme}>
         <Grid container spacing={0} direction="column" alignItems="center" justify="center"
               style={{minHeight: '80vh'}}>
            <Grid item xs={4}>
               Cards
            </Grid>
         </Grid>
      </ThemeProvider>
   );
}