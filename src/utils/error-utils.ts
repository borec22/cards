import {Dispatch} from 'redux';
import {setAppError, SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../app/appReducer';

export const handleError = (e: ErrorType, dispatch: ErrorUtilsDispatchType) => {
   const error = e.response
      ? e.response.data.error
      : (e.message);

   dispatch(setAppError(error));
   dispatch(setAppStatus('failed'));
}


// types
type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>
type ErrorType = {
   message: string,
   response: {
      data: {
         error: string
      }
   }
}