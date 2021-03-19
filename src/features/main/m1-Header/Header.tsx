import React, {useState} from 'react';

import {
   AppBar,
   Button,
   createStyles,
   IconButton,
   LinearProgress,
   makeStyles,
   Theme,
   Toolbar,
   Typography
} from '@material-ui/core';
import {ErrorSnackbar} from '../../../components/ErrorSnackbar/ErrorSnackbar';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import {RequestStatusType} from '../../../app/appReducer';
import {PATH} from '../m3-Routes/Routes';
import {logout} from '../../authorization/a1-SignIn/authReducer';
import {NavLink} from 'react-router-dom';
import {history} from '../../../index';


const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         flexGrow: 1,
      },
      logo: {
         marginRight: theme.spacing(3),
      },
      links: {
         flexGrow: 1,
      },
      navLink: {
         color: 'white',
         textDecoration: 'none',
         paddingLeft: '15px'
      },
      selectedLink: {
         color: '#4caf50   '
      }
   }),
);


export const Header: React.FC = () => {
   console.log('m1-Header component')
   const classes = useStyles();
   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

   const dispatch = useDispatch();
   const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

   const handlerLogin = () => {
      history.push(PATH.SIGN_IN_PATH);

   }

   const handleLogout = async () => {
      setIsSubmitting(true);
      await dispatch(logout());
      setIsSubmitting(false);
   }

   return (
      <>
         <ErrorSnackbar/>
         <div className={classes.root}>
            <AppBar position="static" color={'primary'}>
               <Toolbar>
                  <IconButton edge="start" className={classes.logo} color="inherit" aria-label="logo">
                     CARDS
                  </IconButton>
                  <Typography variant="h6" className={classes.links}>
                     <NavLink activeClassName={classes.selectedLink} to={PATH.PROFILE_PATH}
                              className={classes.navLink}>Profile</NavLink>

                     <NavLink activeClassName={classes.selectedLink} to={PATH.PACKS_PATH}
                              className={classes.navLink}>Packs</NavLink>
                  </Typography>
                  <Typography variant="h6">

                  </Typography>
                  {!isLoggedIn && <Button color="inherit" onClick={handlerLogin}>Login</Button>}
                  {isLoggedIn && <Button color="inherit" onClick={handleLogout} disabled={isSubmitting}>Logout</Button>}
               </Toolbar>
            </AppBar>
         </div>
         {status === 'loading' && <LinearProgress/>}
      </>
   );
};

