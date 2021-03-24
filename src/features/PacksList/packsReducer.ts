import {AppRootStateType} from '../../app/store';
import {packsApi, PackType, AddOrEditPackDataType} from '../../api/api';
import {ThunkAction} from 'redux-thunk';
import {SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../../app/appReducer';
import {handleError} from '../../utils/error-utils';


enum PACKS_ACTIONS_TYPE {
   SET_PACKS = 'PACKS/SET-PACKS',
   SET_PACKS_TOTAL_COUNT = 'PACKS/SET_PACKS_TOTAL_COUNT'
}

const initialState = {
   cardPacks: [] as PackType[],
   cardPacksTotalCount: null as number | null
}


export const packsReducer = (state = initialState, action: PacksActions): PacksInitialStateType => {
   switch (action.type) {
      case PACKS_ACTIONS_TYPE.SET_PACKS_TOTAL_COUNT:
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

export const setPacksTotalCount = (cardPacksTotalCount: number) =>
   ({type: PACKS_ACTIONS_TYPE.SET_PACKS_TOTAL_COUNT, payload: {cardPacksTotalCount}} as const)


// thunks
export const getCardPacks = (): ThunkAction<Return, AppRootStateType, ExtraArgument, PacksActions> =>
   async (
      dispatch,
      getState: () => AppRootStateType
   ) => {
      const cardPacksTotalCount =  getState().packs.cardPacksTotalCount;

      try {
         dispatch(setAppStatus('loading'));

         const data = await packsApi.getPacks(cardPacksTotalCount ? cardPacksTotalCount : 0);

         dispatch(setPacks(data.cardPacks));
         dispatch(setPacksTotalCount(data.cardPacksTotalCount));

         dispatch(setAppStatus('succeeded'));
      } catch (e) {
         handleError(e, dispatch);
      }
   }

export const addCardPack = (data: AddOrEditPackDataType): ThunkAction<Return, AppRootStateType, ExtraArgument, PacksActions> =>
   async (dispatch) => {
      try {
         dispatch(setAppStatus('loading'));

         const responseData = await packsApi.createPack(data);

         dispatch(getCardPacks());
         dispatch(setAppStatus('succeeded'));
      } catch (e) {
         handleError(e, dispatch);
      }
   }

export const updateCardPack = (data: AddOrEditPackDataType): ThunkAction<Return, AppRootStateType, ExtraArgument, PacksActions> =>
   async (dispatch) => {
      try {
         dispatch(setAppStatus('loading'));

         const responseData = await packsApi.updatePack(data);

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
   | ReturnType<typeof setPacksTotalCount>
   | SetAppStatusActionType
   | SetAppErrorActionType


