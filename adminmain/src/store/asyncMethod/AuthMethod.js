import jwt_decoder from 'jwt-decode';
import axios from 'axios';
import {
  SET_LOADER,
  CLOSE_LOADER,
  SET_TOKEN,
  LOGIN_ERRORS,
  SET_MESSAGE,
  SET_ADMIN
} from '../types/AdminTypes';
export const postLogin = (credentials) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADER });
      const { data } = await axios.post('/admin/login', credentials, {
        withCredentials: true
      });
      dispatch({ type: CLOSE_LOADER });

      localStorage.setItem('adminLogin', data.token);
      dispatch({ type: SET_TOKEN, payload: data.token });
      console.log(data, 'dataeeee');
      const verifyToken = (token) => {
        const decodeToken = jwt_decoder(token);
        const expiresIn = new Date(decodeToken.exp * 1000);
        if (new Date() > expiresIn) {
          localStorage.removeItem('adminLogin');
          return null;
        } else {
          return decodeToken;
        }
      };

      const token = localStorage.getItem('adminLogin');
      if (token) {
        const decoded = verifyToken(token);

        if (decoded) {
          const { admin } = decoded;
          dispatch({ type: SET_MESSAGE, payload: data.msg });
          dispatch({ type: SET_ADMIN, payload: admin });
        }
      }
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: LOGIN_ERRORS, payload: error.response.data });
     
    }
  };
};

export const forgotPasswordFn = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    const { data } = await axios.post('/admin/forgotPassword', credentials, {
      withCredentials: true
    });
    dispatch({ type: CLOSE_LOADER });
    return data;
  };
};

export const otpFunction = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    const { data } = await axios.post('/admin/otpVerification', credentials, {
      withCredentials: true
    });
    dispatch({ type: CLOSE_LOADER });
    return data;
  };
};

export const postUpdateCredentials = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    const { data } = await axios.patch('/admin/updateCredentials', credentials, {
      withCredentials: true
    });
    dispatch({ type: CLOSE_LOADER });
    console.log(data);
    return data;
  };
};
