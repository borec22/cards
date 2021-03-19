import {AppRootStateType} from '../../app/store';
import {packsApi, PackType} from '../../api/api';
import {ThunkAction} from 'redux-thunk';
import {SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../../app/appReducer';
import {handleError} from '../../utils/error-utils';


enum PACKS_ACTIONS_TYPE {
   SET_PACKS = 'PACKS/SET-PACKS',
}

const initialState = {
   cardPacks: [] as PackType[]
}


export const packsReducer = (state = initialState, action: PacksActions): PacksInitialStateType => {
   switch (action.type) {
      case PACKS_ACTIONS_TYPE.SET_PACKS: {
         return {...state, ...action.payload}
      }

      default:
         return state
   }
}


// actions
export const setPacks = (cardPacks: PackType[]) =>
   ({type: PACKS_ACTIONS_TYPE.SET_PACKS, payload: {cardPacks}} as const)


// thunks
export const getCardPacks = (): ThunkAction<Return, AppRootStateType, ExtraArgument, PacksActions> =>
   async (dispatch) => {
      try {
         dispatch(setAppStatus('loading'));

         const data = await packsApi.getPacks();

         dispatch(setPacks(data.cardPacks));
         dispatch(setAppStatus('succeeded'));
      } catch (e) {
         handleError(e, dispatch);
      }
   }

export const addCardPack = (): ThunkAction<Return, AppRootStateType, ExtraArgument, PacksActions> =>
   async (dispatch) => {
      try {
         dispatch(setAppStatus('loading'));

         const data = await packsApi.createPack();

         dispatch(getCardPacks());
         dispatch(setAppStatus('succeeded'));
      } catch (e) {
         handleError(e, dispatch);
      }
   }

export const updateCardPack = (id: string, name: string = 'update pack'): ThunkAction<Return, AppRootStateType, ExtraArgument, PacksActions> =>
   async (dispatch) => {
      try {
         dispatch(setAppStatus('loading'));

         const data = await packsApi.updatePack(id, name);

         dispatch(getCardPacks());
         dispatch(setAppStatus('succeeded'));
      } catch (e) {
         handleError(e, dispatch);
      }
   }

export const deleteCardPack = (id: string): ThunkAction<Return, AppRootStateType, ExtraArgument, PacksActions> =>
   async (dispatch) => {
      try {
         dispatch(setAppStatus('loading'));

         const data = await packsApi.deletePack(id);

         dispatch(getCardPacks());
         dispatch(setAppStatus('succeeded'));
      } catch (e) {
         handleError(e, dispatch);
      }
   }


// types
type Return = void;
type ExtraArgument = {};
type IGetState = () => AppRootStateType;

export type PacksInitialStateType = typeof initialState

type PacksActions =
   | ReturnType<typeof setPacks>
   | SetAppStatusActionType
   | SetAppErrorActionType


