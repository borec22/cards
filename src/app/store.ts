import {applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import thunk from 'redux-thunk';
import {authReducer} from '../features/SignIn/authReducer';
import {appReducer} from './appReducer';

const rootReducer = combineReducers({
   app: appReducer,
   auth: authReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));