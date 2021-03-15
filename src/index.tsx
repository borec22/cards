import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {HashRouter, Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './app/store';
import createHistory from 'history/createHashHistory';

export const history = createHistory();

ReactDOM.render(
   <React.StrictMode>
      <HashRouter>
         {/*<Router history={history}>*/}
            <Provider store={store}>
               <App/>
            </Provider>
         {/*</Router>*/}
      </HashRouter>
   </React.StrictMode>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
