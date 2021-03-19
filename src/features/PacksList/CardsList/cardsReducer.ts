import {AppRootStateType} from '../../../app/store';


enum CARDS_ACTIONS_TYPE {
   SET_IS_LOGGED_IN = 'AUTH/SET-IS-LOGGED-IN',
}

const initialState = {

}


export const cardsReducer = (state = initialState, action: any): CardsInitialStateType => {
   switch (action.type) {

      default:
         return state
   }
}


// actions
/*export const setIsLoggedIn = (isLoggedIn: boolean) =>
   ({type: AUTH_ACTIONS_TYPE.SET_IS_LOGGED_IN, payload: {isLoggedIn}} as const)*/


// thunks
/*export const login = (data: LoginParamsType): ThunkAction<Return, AppRootStateType, ExtraArgument, AuthActions> =>
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
   }*/


// types
type Return = void;
type ExtraArgument = {};
type IGetState = () => AppRootStateType;

export type CardsInitialStateType = typeof initialState

type CardsActions = null


