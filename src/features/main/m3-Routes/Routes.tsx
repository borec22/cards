import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import {SignIn} from '../../authorization/a1-SignIn/SignIn';
import {Container} from '@material-ui/core';
import {Profile} from '../../Profile/Profile';
import {ProfileContainer} from '../../Profile/ProfileContainer';
import {SignUp} from '../../authorization/a2-SignUp/SignUp';
import {ForgotPassword} from '../../authorization/a3-ForgotPassword/ForgotPassword';
import {RecoveryPassword} from '../../authorization/a4-RecoveryPassword/RecoveryPassword';
import {PacksList} from '../../PacksList/PacksList';
import {CardsList} from '../../PacksList/CardsList/CardsList';

export enum PATH {
   SIGN_IN_PATH = '/sign-in',
   PROFILE_PATH = '/profile',
   REGISTER_PATH = '/register',
   FORGOT_PATH = '/forgot',
   SET_NEW_PASSWORD_PATH = '/set-new-password/:token?',
   PACKS_PATH = '/decks',
   CARDS_PATH = '/cards',
}


export const Routes: React.FC = () => {
   return (
      <>
         <Switch>
            <Route exact path={'/'} render={() => <Redirect to={PATH.PACKS_PATH}/>}/>
            <Route path={PATH.PROFILE_PATH} render={() => <ProfileContainer/>}/>

            <Route path={PATH.SIGN_IN_PATH} render={() => <SignIn/>}/>
            <Route path={PATH.REGISTER_PATH} render={() => <SignUp/>}/>
            <Route path={PATH.FORGOT_PATH} render={() => <ForgotPassword/>}/>
            <Route path={PATH.SET_NEW_PASSWORD_PATH} render={() => <RecoveryPassword/>}/>
            <Route path={PATH.PACKS_PATH} render={() => <PacksList/>}/>
            <Route path={PATH.CARDS_PATH} render={() => <CardsList/>}/>

            {/*<Route path={STAND_PATH} render={() => <DemoSuperComponentsStand/>}/>*/}
         </Switch>
      </>
   );
};