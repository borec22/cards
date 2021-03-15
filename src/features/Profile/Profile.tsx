import {Redirect} from 'react-router-dom';
import {PATH} from '../Routes/Routes';
import {Box, Grid} from '@material-ui/core';
import React from 'react';
import {UserType} from '../SignIn/authReducer';
import defaultPhoto from '../../assets/images/avatar-default.png';

type PropsType = {
   userProfileData: UserType | null
   isLoggedIn: boolean
}

export const Profile: React.FC<PropsType> = React.memo((
   {
      userProfileData, isLoggedIn
   }
) => {
   console.log('render Profile component');


   if (!isLoggedIn) {
      return <Redirect to={PATH.SIGN_IN_PATH}/>
   }

   return (
      <Grid container spacing={0} direction="column" alignItems="center" justify="center"
            style={{minHeight: '80vh'}}>
         <Grid item xs={8}>
            {userProfileData && <>
                <img style={{
                   borderRadius: '50%', height: 300, width: 300, display: 'block',
                   marginLeft: 'auto',
                   marginRight: 'auto',
                }}
                     src={userProfileData.avatar ? userProfileData.avatar : defaultPhoto} alt=""/>
                <Box mt={4} fontSize={'25px'}>
                    <strong>username:</strong>
                    <span style={{paddingLeft: '20'}}>  {userProfileData.name} </span>
                </Box>
            </>}
         </Grid>
      </Grid>
   );
});