import React, {useEffect} from 'react';
import './App.css';
import {Main} from '../features/Main/Main';

import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {initializeApp} from './appReducer';
import {CircularProgress} from '@material-ui/core';
import {theme} from '../utils/theme';
import {ThemeProvider} from '@material-ui/core/styles';


function App() {
   const dispatch = useDispatch();
   const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);

   useEffect(() => {
      dispatch(initializeApp());
   }, [dispatch])

   if (!isInitialized) {
      return (
         <ThemeProvider theme={theme}>
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
               <CircularProgress color={'primary'}/>
            </div>
         </ThemeProvider>
      );
   }

   return (
      <div className="App">
         <Main/>
      </div>
   );
}

export default App;
