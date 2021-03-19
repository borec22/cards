import {Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core/styles';
import React from 'react';
import {theme} from '../../../utils/theme';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {login} from './authReducer';
import {AppRootStateType} from '../../../app/store';
import {NavLink, Redirect} from 'react-router-dom';
import {PATH} from '../../main/m3-Routes/Routes';
import {SignInSchema} from '../../../utils/validators';
import {setAppStatus} from '../../../app/appReducer';

type FormikLoginErrorType = {
   email?: string
   password?: string
}

export const SignIn = () => {
   console.log('render a1-SignIn component');
   const dispatch = useDispatch();
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         rememberMe: false
      },
      validationSchema: SignInSchema,
      onSubmit: async (values, {setSubmitting}) => {
         await dispatch(login(values));
         setSubmitting(false);
      },
   });

   if (isLoggedIn) {
      return <Redirect to={PATH.PACKS_PATH}/>
   }

   return (
      <ThemeProvider theme={theme}>
         <Grid container spacing={0} direction="column" alignItems="center" justify="center"
               style={{minHeight: '80vh'}}>
            <Grid item xs={4}>
               <form onSubmit={formik.handleSubmit}>
                  <FormControl style={{width: '300px'}}>
                     <FormLabel>
                        <p>Use common test account credentials:</p>
                        <p>Email: nya-admin@nya.nya</p>
                        <p>Password: 1qazxcvBG</p>
                     </FormLabel>
                     <FormGroup>
                        <TextField
                           label="Email"
                           defaultValue={'nya-admin@nya.nya'}
                           margin="normal"
                           color='secondary'
                           {...formik.getFieldProps('email')}
                        />
                        {formik.touched && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}

                        <TextField
                           type="password"
                           label="Password"
                           defaultValue={'1qazxcvBG'}
                           margin="normal"
                           color={'secondary'}
                           {...formik.getFieldProps('password')}
                        />
                        {formik.touched && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}

                        <FormControlLabel
                           label={'Remember me'}
                           control={<Checkbox color={'secondary'} {...formik.getFieldProps('rememberMe')}/>}
                        />
                        <Button type={'submit'}
                                variant={'contained'}
                                color={'secondary'}
                                style={{marginTop: '20px'}}
                                disabled={!formik.isValid || formik.isSubmitting}>
                           Sign In
                        </Button>

                        <FormLabel style={{marginTop: '20'}}>
                           <Box mt={5}>
                              <p>Doesn't have a account? <NavLink to={PATH.REGISTER_PATH}>sign up</NavLink></p>
                              <p>
                                 Forgot <NavLink to={PATH.FORGOT_PATH} onClick={() => {
                                    dispatch(setAppStatus('idle'));
                              }}> password? </NavLink>
                              </p>
                           </Box>
                        </FormLabel>
                     </FormGroup>
                  </FormControl>
               </form>
            </Grid>
         </Grid>
      </ThemeProvider>
   );
}