import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import {SignIn} from '../SignIn/SignIn';
import {Container} from '@material-ui/core';
import {Profile} from '../Profile/Profile';
import {ProfileContainer} from '../Profile/ProfileContainer';
import {SignUp} from '../SignUp/SignUp';
import {ForgotPassword} from '../ForgotPassword/ForgotPassword';
import {RecoveryPassword} from '../RecoveryPassword/RecoveryPassword';

export enum PATH {
   SIGN_IN_PATH = '/sign-in',
   PROFILE_PATH = '/profile',
   REGISTER_PATH = '/register',
   FORGOT_PATH = '/forgot',
   SET_NEW_PASSWORD_PATH = '/set-new-password/:token?',
}


export const Routes: React.FC = () => {
   return (
      <Container fixed>
         <Switch>
            <Route exact path={'/'} render={() => <Redirect to={PATH.PROFILE_PATH}/>}/>
            <Route path={PATH.PROFILE_PATH} render={() => <ProfileContainer/>}/>

            <Route path={PATH.SIGN_IN_PATH} render={() => <SignIn/>}/>
            <Route path={PATH.REGISTER_PATH} render={() => <SignUp/>}/>
            <Route path={PATH.FORGOT_PATH} render={() => <ForgotPassword/>}/>
            <Route path={PATH.SET_NEW_PASSWORD_PATH} render={() => <RecoveryPassword/>}/>


            {/*<Route path={STAND_PATH} render={() => <DemoSuperComponentsStand/>}/>*/}
         </Switch>
      </Container>
   );
};