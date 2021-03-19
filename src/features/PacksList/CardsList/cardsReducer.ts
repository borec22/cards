import {AppRootStateType} from '../../../app/store';
import {cardsApi, CardType} from '../../../api/api';
import {ThunkAction} from 'redux-thunk';
import {SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../../../app/appReducer';
import {handleError} from '../../../utils/error-utils';


enum CARDS_ACTIONS_TYPE {
   SET_CARDS = 'CARDS/SET-CARDS',
}

const initialState = {
   cards: [] as CardType[]
}


export const cardsReducer = (state = initialState, action: CardsActions): CardsInitialStateType => {
   switch (action.type) {
      case CARDS_ACTIONS_TYPE.SET_CARDS: {
         return {...state, ...action.payload}
      }

      default:
         return state
   }
}


// actions
export const setCards = (cards: CardType[]) =>
   ({type: CARDS_ACTIONS_TYPE.SET_CARDS, payload: {cards}} as const)


// thunks
export const getCards = (cardsPack_id: string): ThunkAction<Return, AppRootStateType, ExtraArgument, CardsActions> =>
   async (dispatch) => {
      try {
         dispatch(setAppStatus('loading'));

         const data = await cardsApi.getCards(cardsPack_id);

         dispatch(setCards(data.cards));
         dispatch(setAppStatus('succeeded'));
      } catch (e) {
         handleError(e, dispatch);
      }
   }


// types
type Return = void;
type ExtraArgument = {};
type IGetState = () => AppRootStateType;

export type CardsInitialStateType = typeof initialState

type CardsActions =
   | ReturnType<typeof setCards>
   | SetAppStatusActionType
   | SetAppErrorActionType


