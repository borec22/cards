import {SignIn} from '../authorization/a1-SignIn/SignIn';
import {Profile} from './Profile';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {AuthInitialStateType, UserType} from '../authorization/a1-SignIn/authReducer';

export const ProfileContainer = () => {
   const {
      userData,
      isLoggedIn
   } = useSelector<AppRootStateType, AuthInitialStateType>(state => state.auth);

   return (
      <Profile userProfileData={userData} isLoggedIn={isLoggedIn}/>
   );
}