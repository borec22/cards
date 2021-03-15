import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
   email: Yup.string().email('Invalid email address').required('Required'),
   password: Yup.string()
      .min(7, 'Password must be more than 7 characters')
      .required('Required')
});

export const SignUpSchema = Yup.object().shape({
   email: Yup.string().email('Invalid email address').required('Required'),
   firstPassword: Yup.string()
      .min(7, 'Password must be more than 7 characters')
      .required('Required'),
   secondPassword: Yup.string()
      .min(7, 'Password must be more than 7 characters')
      .required('Required')
});

export const ForgotPasswordSchema = Yup.object().shape({
   email: Yup.string().email('Invalid email address').required('Required')
});

export const RecoveryPasswordSchema = Yup.object().shape({
   firstPassword: Yup.string()
      .min(7, 'Password must be more than 7 characters')
      .required('Required'),
   secondPassword: Yup.string()
      .min(7, 'Password must be more than 7 characters')
      .required('Required')
});