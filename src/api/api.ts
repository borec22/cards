import {instance} from './apiSettings';
import {insert} from 'formik';

export interface ISignInData {

}


export const authAPI = {
   login(data: LoginParamsType) {
      return instance.post<ResponseLoginMeType>('auth/login', data)
         .then(response => response.data);
   },
   logout() {
      return instance.delete<ResponseLoginMeType>('auth/me')
         .then(response => response.data);
   },
   register(email: string, password: string) {
      return instance.post<ResponseRegisterType>('auth/register', {email, password})
         .then(response => response.data);
   },
   forgotPassword: (email: string) => {
      return instance.post<ResponseForgotPasswordType>('/auth/forgot', {
         email,
         from: 'front-admin <serhioromanchuk@gmail.com>',
         message: `<div style="background-color: lime; padding: 15px">	
	                         password recovery link: 		
                            <a href='https://borec22.github.io/cards/#/set-new-password/$token$'>link</a>
                            <!--<a href='http://localhost:3000/set-new-password/$token$'>link</a>-->
	                      </div>`

      })
         .then(response => response.data);
   },
   recoveryPassword(password: string, token: string) {
      return instance.post<ResponseRecoveryPasswordType>(`auth/set-new-password`, {
         'password': password,
         'resetPasswordToken': token
      })
         .then(response => response.data)
   },
   me() {
      return instance.post<ResponseLoginMeType>('auth/me')
         .then(response => response.data);
   }
}
export const packsApi = {
   getPacks() {
      return instance.get<ResponseGetPacksType>('cards/pack', {
         params: {
            pageCount: 26
         }
      })
         .then(response => response.data);
   },
   updatePack(_id: string, name: string) {
      return instance.put<ResponseUpdatePackType>('cards/pack', {
         cardsPack: {
            _id,
            name
         }
      })
         .then(response => response.data);
   },
   createPack() {
      return instance.post<ResponseCreatePackType>('cards/pack', {
         cardsPack: {
            name: 'new pack added',
            path: '',
            private: false,
            deckCover: '',
            type: 'pack'
         }
      })
         .then(response => response.data);
   },
   deletePack(id: string) {
      return instance.delete<ResponseDeletePackType>('cards/pack', {
         params: {id}
      })
   }
}
export const cardsApi = {
   getCards(cardsPack_id: string) {
      return instance.get<ResponseGetCardsType>('cards/card', {
         params: {
            cardsPack_id
         }
      })
         .then(response => response.data);
   },
   createCard(model: CreateApiCardModelType) {
      return instance.post<ResponseCreateCardType>('cards/card', {
         card: {...model}
      })
         .then(response => response.data);
   },
   deleteCard(id: string) {
      return instance.delete<ResponseDeleteCardType>('cards/card', {
         params: {id}
      })
         .then(response => response.data);
   },
   updateCard(model: UpdateApiCardModelType) {
      return instance.put<ResponseUpdateCardType>('cards/card', {
         card: {...model}
      })
         .then(response => response.data);
   }
}


// types
// cards_type
export type CardType = {
   answer: string
   cardsPack_id: string
   comments: string
   created: string
   grade: number
   more_id: string
   question: string
   questionImg: string
   rating: number
   shots: number
   type: string
   updated: string
   user_id: string
   __v: number
   _id: string
}
type ResponseGetCardsType = {
   cards: CardType[],
   cardsTotalCount: number
   maxGrade: number
   minGrade: number
   packUserId: string
   page: number
   pageCount: number
   token: string
   tokenDeathTime: number
}
type ResponseCreateCardType = {
   newCard: {}
}
type CreateApiCardModelType = {
   cardsPack_id: string
   question?: string
   answer?: string
   grade?: number
   shots?: number
   rating?: number
   answerImg?: string
   questionImg?: string
   questionVideo?: string
   answerVideo?: string
   type?: string
}
type ResponseDeleteCardType = { deletedCard: {} }
type UpdateApiCardModelType = {
   _id: string
   question?: string
   answer?: string
   grade?: number
   shots?: number
   rating?: number
   answerImg?: string
   questionImg?: string
   questionVideo?: string
   answerVideo?: string
   type?: string
}
type ResponseUpdateCardType = { updatedCard: {} }

// packs_types
export type PackType = {
   cardsCount: number
   created: string
   grade: number
   deckCover: string
   more_id: string
   name: string
   path: string
   rating: number
   shots: number
   type: string
   updated: string
   user_id: string
   user_name: string
   __v: number
   _id: string
}
type ResponseGetPacksType = {
   cardPacks: PackType[],
   cardPacksTotalCount: number
   maxCardsCount: number
   minCardsCount: number
   page: number
   pageCount: number
   token: string
   tokenDeathTime: number

}
type ResponseUpdatePackType = {
   updatedCardsPack: {}
}
type ResponseCreatePackType = {
   newCardsPack: {}
}
type ResponseDeletePackType = {
   deletedCardsPack: {}
}

// auth_types
type ResponseRecoveryPasswordType = {
   'error': string
   'method': string
   'url': string
   'query': Object
   'body': {
      'password': string
      'resetPasswordToken': string
   }
}
type ResponseForgotPasswordType = {
   info: string,
   success: boolean,
   answer: boolean,
   html: boolean
}
export type LoginParamsType = {
   email: string,
   password: string,
   rememberMe: boolean
}
export type ResponseLoginMeType = {
   '_id': string,
   'email': string,
   'rememberMe': boolean,
   'isAdmin': boolean,
   'name': string,
   'verified': boolean,
   'publicCardPacksCount': number,
   'created': string,
   'updated': string,
   '__v': number,
   'token': string,
   'tokenDeathTime': number
   avatar: string;
}
type ResponseRegisterType = {
   'addedUser': {
      '_id': string,
      'email': string,
      'rememberMe': boolean,
      'isAdmin': boolean,
      'name': string,
      'verified': boolean,
      'publicCardPacksCount': number,
      'created': string,
      'updated': string,
      '__v': number
   }
}
