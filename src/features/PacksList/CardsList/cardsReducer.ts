import {AppRootStateType} from '../../../app/store';
import {cardsApi, CardType} from '../../../api/api';
import {ThunkAction} from 'redux-thunk';
import {SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../../../app/appReducer';
import {handleError} from '../../../utils/error-utils';


enum CARDS_ACTIONS_TYPE {
   SET_CARDS = 'CARDS/SET-CARDS',
   SET_CARDS_TOTAL_COUNT = 'PACKS/SET_CARDS_TOTAL_COUNT'
}

const initialState = {
   cards: [] as CardType[],
   cardsTotalCount: null as number | null
}


export const cardsReducer = (state = initialState, action: CardsActions): CardsInitialStateType => {
   switch (action.type) {
      case CARDS_ACTIONS_TYPE.SET_CARDS_TOTAL_COUNT:
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

export const setCardsTotalCount = (cardsTotalCount: number) =>
   ({type: CARDS_ACTIONS_TYPE.SET_CARDS_TOTAL_COUNT, payload: {cardsTotalCount}} as const)


// thunks
export const getCards = (cardsPack_id: string, countCards: number): ThunkAction<Return, AppRootStateType, ExtraArgument, CardsActions> =>
   async (dispatch) => {
      try {
         dispatch(setAppStatus('loading'));

         const data = await cardsApi.getCards(cardsPack_id, countCards);

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
   | ReturnType<typeof setCardsTotalCount>
   | SetAppStatusActionType
   | SetAppErrorActionType


