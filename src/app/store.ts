import {applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import thunk from 'redux-thunk';
import {authReducer} from '../features/authorization/a1-SignIn/authReducer';
import {appReducer} from './appReducer';
import {packsReducer} from '../features/PacksList/packsReducer';
import {cardsReducer} from '../features/PacksList/CardsList/cardsReducer';

const rootReducer = combineReducers({
   app: appReducer,
   auth: authReducer,
   packs: packsReducer,
   cards: cardsReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));