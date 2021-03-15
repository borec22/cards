import {authAPI, LoginParamsType, ResponseLoginMeType} from '../../api/api';
import {ThunkAction} from 'redux-thunk';
import {AppRootStateType} from '../../app/store';
import {SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../../app/appReducer';
import {handleError} from '../../utils/error-utils';

enum AUTH_ACTIONS_TYPE {
   SET_IS_LOGGED_IN = 'AUTH/SET-IS-LOGGED-IN',
   SET_USER_DATA = 'AUTH/SET_USER_DATA',
   SET_IS_REGISTERED_SUCCESS = 'AUTH/SET_IS_REGISTERED_SUCCESS',
}

const initialState = {
   isLoggedIn: false as boolean,
   userData: null as null | UserType,
   isRegisteredSuccess: false as boolean
}


export const authReducer = (state = initialState, action: AuthActions): AuthInitialStateType => {
   switch (action.type) {
      case AUTH_ACTIONS_TYPE.SET_IS_LOGGED_IN:
      case AUTH_ACTIONS_TYPE.SET_IS_REGISTERED_SUCCESS:
      case AUTH_ACTIONS_TYPE.SET_USER_DATA: {
         return {...state, ...action.payload}
      }

      default:
         return state
   }
}


// actions
export const setIsLoggedIn = (isLoggedIn: boolean) =>
   ({type: AUTH_ACTIONS_TYPE.SET_IS_LOGGED_IN, payload: {isLoggedIn}} as const)

export const setUserData = (userData: UserType) =>
   ({type: AUTH_ACTIONS_TYPE.SET_USER_DATA, payload: {userData}} as const)

export const setIsRegisteredSuccess = (isRegisteredSuccess: boolean) =>
   ({type: AUTH_ACTIONS_TYPE.SET_IS_REGISTERED_SUCCESS, payload: {isRegisteredSuccess}} as const)


// thunks
export const login = (data: LoginParamsType): ThunkAction<Return, AppRootStateType, ExtraArgument, AuthActions> =>
   async (dispatch) => {
      try {
         dispatch(setAppStatus('loading'));

         const responseData = await authAPI.login(data);

         dispatch(setUserData(responseData));
         dispatch(setIsLoggedIn(true));
         dispatch(setAppStatus('succeeded'));
      } catch (e) {
         handleError(e, dispatch);
      }
   }

export const logout = (): ThunkAction<Return, AppRootStateType, ExtraArgument, AuthActions> =>
   async (dispatch) => {
      try {
         dispatch(setAppStatus('loading'));

         const data = await authAPI.logout();

         dispatch(setIsLoggedIn(false));
         dispatch(setAppStatus('succeeded'));
      } catch (e) {
         handleError(e, dispatch);
      }
   }

export const register = (email: string, password: string): ThunkAction<Return, AppRootStateType, ExtraArgument, AuthActions> =>
   async (dispatch) => {
      try {
         dispatch(setAppStatus('loading'));

         const data = await authAPI.register(email, password);

         dispatch(setIsRegisteredSuccess(true));
         dispatch(setAppStatus('succeeded'));
      } catch (e) {
         handleError(e, dispatch);
      }
   }

export const forgotPassword = (email: string): ThunkAction<Return, AppRootStateType, ExtraArgument, AuthActions> =>
   async (dispatch) => {
      try {
         dispatch(setAppStatus('loading'));

         const data = await authAPI.forgotPassword(email);

         dispatch(setAppStatus('succeeded'));
      } catch (e) {
         handleError(e, dispatch);
      }
   }

export const recoveryPassword = (password: string, token: string): ThunkAction<Return, AppRootStateType, ExtraArgument, AuthActions> =>
   async (dispatch) => {
      try {
         dispatch(setAppStatus('loading'));

         const data = await authAPI.recoveryPassword(password, token);

         dispatch(setAppStatus('succeeded'));
      } catch (e) {
         handleError(e, dispatch);
      }
   }

// types
type Return = void;
type ExtraArgument = {};
type IGetState = () => AppRootStateType;

export type UserType = ResponseLoginMeType;

export type AuthInitialStateType = typeof initialState
export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedIn>;
export type SetUserDataActionType = ReturnType<typeof setUserData>;

type AuthActions =
   | SetIsLoggedInActionType
   | SetUserDataActionType
   | ReturnType<typeof setIsRegisteredSuccess>
   | SetAppStatusActionType
   | SetAppErrorActionType
