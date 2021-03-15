import {instance} from './apiSettings';

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
};


// types
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
