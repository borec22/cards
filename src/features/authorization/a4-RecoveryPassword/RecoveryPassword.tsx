import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import {RequestStatusType, setAppError} from '../../../app/appReducer';
import {useFormik} from 'formik';
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from '../../../utils/theme';
import {Box, Button, FormControl, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core';
import {NavLink, Redirect, useParams} from 'react-router-dom';
import {PATH} from '../../main/m3-Routes/Routes';
import {RecoveryPasswordSchema} from '../../../utils/validators';
import {recoveryPassword, register} from '../a1-SignIn/authReducer';


type PropsType = {}

export const RecoveryPassword: React.FC<PropsType> = React.memo((props) => {
   console.log('render recovery password')
   const dispatch = useDispatch();
   const { token } = useParams<{token?: string}>();
   const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);


   const formik = useFormik({
      initialValues: {
         firstPassword: '',
         secondPassword: '',
      },
      validationSchema: RecoveryPasswordSchema,
      onSubmit: async (values, {setSubmitting}) => {
         const {firstPassword, secondPassword} = values;

         if (firstPassword !== secondPassword) {
            dispatch(setAppError('Passwords don\'t match!'))
         } else {
            token && await dispatch(recoveryPassword(firstPassword, token));
            setSubmitting(false);
         }
      },
   });

   if (status === 'succeeded') {
      return <Redirect to={PATH.SIGN_IN_PATH}/>
   }


   return (
      <ThemeProvider theme={theme}>
         <Grid container spacing={0} direction="column" alignItems="center" justify="center"
               style={{minHeight: '80vh'}}>
            <Grid item xs={8}>

               <form onSubmit={formik.handleSubmit}>
                  <FormControl style={{width: '300px'}}>
                     <FormGroup>
                        <TextField
                           label="Password"
                           type='password'
                           margin="normal"
                           color='secondary'
                           {...formik.getFieldProps('firstPassword')}
                        />
                        {formik.touched && formik.errors.firstPassword &&
                        <div style={{color: 'red'}}>{formik.errors.firstPassword}</div>}

                        <TextField
                           label="Confirm password"
                           type='password'
                           margin="normal"
                           color='secondary'
                           {...formik.getFieldProps('secondPassword')}
                        />
                        {formik.touched && formik.errors.secondPassword &&
                        <div style={{color: 'red'}}>{formik.errors.secondPassword}</div>}

                        <Button type={'submit'}
                                variant={'contained'}
                                color={'secondary'}
                                style={{marginTop: '20px'}}
                                disabled={!formik.isValid || formik.isSubmitting}>
                           Recovery password
                        </Button>

                        <FormLabel>
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
})