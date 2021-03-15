import {Dispatch} from 'redux';
import {authAPI} from '../api/api';
import {handleError} from '../utils/error-utils';
import {ThunkAction} from 'redux-thunk';
import {AppRootStateType} from './store';
import {
   setIsLoggedIn,
   SetIsLoggedInActionType,
   setUserData,
   SetUserDataActionType
} from '../features/SignIn/authReducer';

enum APP_ACTIONS_TYPE {
   SET_STATUS = 'APP/SET-STATUS',
   SET_ERROR = 'APP/SET-ERROR',
   SET_IS_INITIALIZED = 'APP/SET_IS_INITIALIZED',
}

const initialState = {
   status: 'idle' as RequestStatusType,
   error: null as string | null,
   isInitialized: false
}


export const appReducer = (state = initialState, action: AppActions): InitialStateType => {
   switch (action.type) {
      case APP_ACTIONS_TYPE.SET_STATUS:
         return {...state, status: action.status}

      case APP_ACTIONS_TYPE.SET_ERROR: {
         return {...state, error: action.error}
      }

      case APP_ACTIONS_TYPE.SET_IS_INITIALIZED: {
         return {...state, isInitialized: action.isInitialized}
      }

      default:
         return state
   }
}


// actions
export const setAppStatus = (status: RequestStatusType) =>
   ({type: APP_ACTIONS_TYPE.SET_STATUS, status} as const);

export const setAppError = (error: null | string) =>
   ({type: APP_ACTIONS_TYPE.SET_ERROR, error} as const);

export const setIsInitialized = (isInitialized: boolean) =>
   ({type: APP_ACTIONS_TYPE.SET_IS_INITIALIZED, isInitialized} as const);


// thunks
export const initializeApp = (): ThunkAction<Return, AppRootStateType, ExtraArgument, AppActions> =>
   async (dispatch, getState) => {
      try {
         dispatch(setAppStatus('loading'));

         const data = await authAPI.me();
         const userProfileData = getState().auth.userData;

         if (!userProfileData) {
            dispatch(setUserData(data));
         }

         dispatch(setIsLoggedIn(true));
         dispatch(setAppStatus('succeeded'));

      } catch (e) {
         handleError(e, dispatch);
      } finally {
         dispatch(setIsInitialized(true));
      }
   }


// types
type Return = void;
type ExtraArgument = {};
type IGetState = () => AppRootStateType;

export type InitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type SetAppStatusActionType = ReturnType<typeof setAppStatus>;
export type SetAppErrorActionType = ReturnType<typeof setAppError>;

type AppActions =
   | SetAppStatusActionType
   | SetAppErrorActionType
   | ReturnType<typeof setIsInitialized>
   | SetIsLoggedInActionType
   | SetUserDataActionType