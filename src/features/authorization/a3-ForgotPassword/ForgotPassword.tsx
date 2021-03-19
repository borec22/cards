import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import React, {useEffect} from 'react';
import {forgotPassword, register, setIsRegisteredSuccess} from '../a1-SignIn/authReducer';
import {useFormik} from 'formik';
import {ForgotPasswordSchema, SignUpSchema} from '../../../utils/validators';
import {RequestStatusType, setAppError, setAppStatus} from '../../../app/appReducer';
import {NavLink, Redirect} from 'react-router-dom';
import {PATH} from '../../main/m3-Routes/Routes';
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from '../../../utils/theme';
import {Box, Button, FormControl, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core';

type PropsType = {}

export const ForgotPassword: React.FC<PropsType> = React.memo((props) => {
   console.log('render forgot password')
   const dispatch = useDispatch();
   const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

   const formik = useFormik({
      initialValues: {
         email: '',
      },
      validationSchema: ForgotPasswordSchema,
      onSubmit: async (values, {setSubmitting}) => {
         await dispatch(forgotPassword(values.email));
         setSubmitting(false);
      },
   });


   return (
      <ThemeProvider theme={theme}>
         <Grid container spacing={0} direction="column" alignItems="center" justify="center"
               style={{minHeight: '80vh'}}>
            <Grid item xs={8}>
               {status === 'succeeded' ? (
                  <div style={{backgroundColor: '#d3efe0', padding: '20px', fontSize: '1.5em'}}>
                     <h1>Check your email</h1>
                     <p>We've sent on email to the address provided. Click the link in the email to reset your password.</p>
                     <p>If you don't see the email, check other places it might be; kike your spam, social, or other folders</p>
                  </div>
               ) : (
                  <form onSubmit={formik.handleSubmit}>
                     <FormControl style={{width: '300px'}}>
                        <FormGroup>
                           <TextField
                              label="Email"
                              margin="normal"
                              color='secondary'
                              {...formik.getFieldProps('email')}
                           />
                           {formik.touched && formik.errors.email &&
                           <div style={{color: 'red'}}>{formik.errors.email}</div>}

                           <Button type={'submit'}
                                   variant={'contained'}
                                   color={'secondary'}
                                   style={{marginTop: '20px'}}
                                   disabled={!formik.isValid || formik.isSubmitting}>
                              Send
                           </Button>

                           <FormLabel>
                              <Box mt={5}>
                                 <p style={{textAlign: 'center'}}><NavLink to={PATH.SIGN_IN_PATH}>sign in</NavLink></p>
                              </Box>
                           </FormLabel>
                        </FormGroup>
                     </FormControl>
                  </form>
               )}
            </Grid>
         </Grid>
      </ThemeProvider>
   );
})