import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, NavLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../Iconify';
import { AdminLogin } from '../../../_services/Admin.services/index';
import {
  postLogin,
  forgotPasswordFn,
  otpFunction,
  postUpdateCredentials
} from 'src/store/asyncMethod/AuthMethod';
import toast, { Toaster } from 'react-hot-toast';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [matchPasswordMsg, setMatchPasswordMsg] = useState('');
  const [credentials, setCredentials] = useState(false);
  const [credentialMsg, setCredentialsMsg] = useState('');
  const [otp, setOtp] = useState(false);
  const [otpMsg, setOtpMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loginErrors, token } = useSelector((state) => state.AuthReducer);
  const LoginSchema = Yup.object().shape({
    email: !otp
      ? Yup.string().email('Email must be a valid email address').required('Email is required')
      : '',
    password: !otp && !forgotPassword ? Yup.string().required('Password is required') : '',

    otp: otp && forgotPassword ? Yup.string().required('otp is required') : ''
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      cpassword: '',
      otp: '',
      remember: true
    },

    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      console.log('Login1');
      if (!otp && !forgotPassword) {
        console.log('Login2');
        const Email = values.email;
        const Password = values.password;
        const data = { Email, Password };
        console.log(data, 'email password');
        if (!credentials) {
          dispatch(postLogin(data));
        } else if (credentials && values.password === values.cpassword) {
          const response = await dispatch(postUpdateCredentials(data));
          if (response.status === 1) {
            setCredentials(false);
            setCredentialsMsg(false);
          }
        } else if (credentials && values.password !== values.cpassword) {
          setMatchPasswordMsg('confirm-password is not matched with password');
        }
      } else if (!otp && forgotPassword) {
        const Email = values.email;
        const data = { Email };
        console.log(data, 'email forgotPassword email');
        const response = await dispatch(forgotPasswordFn(data));
        console.log(response, 'status');
        if (response?.status === 1) {
          setOtpMsg(response.msg);
          setOtp(true);
        }
      } else if (otp && forgotPassword) {
        const otp = values.otp;
        const data = { otp };
        console.log(data, 'otp');
        const response = await dispatch(otpFunction(data));
        if (response?.status === 1) {
          setCredentials(true);
          setOtp(false);
          setForgotPassword(false);
          setCredentialsMsg(response?.msg);
          setOtpMsg('');
        }
      }
    }
  });

  useEffect(() => {
    if (loginErrors.length >= 0) {
      loginErrors.map((err) => {
        toast.error(err.msg);
      });
    }
  }, [loginErrors]);

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const HandleForgotPassword = () => {
    setForgotPassword(true);
  };

  return (
    <FormikProvider value={formik}>
      {console.log(values, 'values')}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: '14px'
          }
        }}
      />
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <div style={{ color: 'red' }}>{otpMsg}</div>
          <div style={{ color: 'red' }}>{credentialMsg}</div>
          {!otp ? (
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              name="email"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          ) : (
            <TextField
              fullWidth
              autoComplete="userotp"
              type="text"
              name="otp"
              label="Enter Otp"
              {...getFieldProps('otp')}
              error={Boolean(touched.otp && errors.otp)}
              helperText={touched.otp && errors.otp}
            />
          )}
          {!forgotPassword && (
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              name="password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          )}
          {matchPasswordMsg && <div style={{ color: 'red' }}>{matchPasswordMsg}</div>}
          {credentials && (
            <TextField
              fullWidth
              autoComplete="confirm-password"
              type="password"
              label="confirm - Password"
              name="cpassword"
              {...getFieldProps('cpassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.cpassword && errors.cpassword)}
              helperText={touched.cpassword && errors.cpassword}
            />
          )}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#" onClick={HandleForgotPassword}>
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
