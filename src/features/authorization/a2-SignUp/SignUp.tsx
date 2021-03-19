import {theme} from '../../../utils/theme';
import {Box, Button, FormControl, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core';
import {NavLink, Redirect} from 'react-router-dom';
import {PATH} from '../../main/m3-Routes/Routes';
import {ThemeProvider} from '@material-ui/core/styles';
import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {SignUpSchema} from '../../../utils/validators';
import {setAppError} from '../../../app/appReducer';
import {AppRootStateType} from '../../../app/store';
import {register, setIsRegisteredSuccess} from '../a1-SignIn/authReducer';

export const SignUp = () => {
   const dispatch = useDispatch();
   const isRegisteredSuccess = useSelector<AppRootStateType, boolean>(state => state.auth.isRegisteredSuccess);

   useEffect(() => {
      return () => {
         dispatch(setIsRegisteredSuccess(false));
      }
   })

   const formik = useFormik({
      initialValues: {
         email: '',
         firstPassword: '',
         secondPassword: ''
      },
      validationSchema: SignUpSchema,
      onSubmit: async (values, {setSubmitting}) => {
         if (values.firstPassword !== values.secondPassword) {
            dispatch(setAppError('Passwords don\'t match!'))
         } else {
            // alert(JSON.stringify(values, null, 2));
            await dispatch(register(values.email, values.firstPassword));
            setSubmitting(false);
         }
      },
   });

   if (isRegisteredSuccess) {
      return <Redirect to={PATH.SIGN_IN_PATH}/>
   }

   return (
      <ThemeProvider theme={theme}>
         <Grid container spacing={0} direction="column" alignItems="center" justify="center"
               style={{minHeight: '80vh'}}>
            <Grid item xs={4}>
               <form onSubmit={formik.handleSubmit}>
                  <FormControl style={{width: '300px'}}>
                     <FormGroup>
                        <TextField
                           label="Email"
                           margin="normal"
                           color='secondary'
                           {...formik.getFieldProps('email')}
                        />
                        {formik.touched && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}

                        <TextField
                           type="password"
                           label="Password"
                           margin="normal"
                           color={'secondary'}
                           {...formik.getFieldProps('firstPassword')}
                        />
                        {formik.touched && formik.errors.firstPassword && <div style={{color: 'red'}}>{formik.errors.firstPassword}</div>}

                        <TextField
                           type="password"
                           label="Confirm password"
                           margin="normal"
                           color={'secondary'}
                           {...formik.getFieldProps('secondPassword')}
                        />
                        {formik.touched.secondPassword && formik.errors.secondPassword && <div style={{color: 'red'}}>{formik.errors.secondPassword}</div>}

                        <Button type={'submit'}
                                variant={'contained'}
                                color={'secondary'}
                                style={{marginTop: '20px'}}
                                disabled={!formik.isValid || formik.isSubmitting}>
                           Sign Up
                        </Button>

                        <FormLabel >
                           <Box mt={5}>
                              <p style={{textAlign: 'center'}}><NavLink to={PATH.SIGN_IN_PATH}>sign in</NavLink></p>
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