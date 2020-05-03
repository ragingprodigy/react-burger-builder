import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED } from './actionTypes';
import { TAuthAction } from '@burger/interfaces/auth/authAction';
import Axios from 'axios';

const authStart = (): TAuthAction => ({ type: AUTH_START });

const authSuccess = (authData: any): TAuthAction => ({ type: AUTH_SUCCESS, authData });

const authFailed = (error: any): TAuthAction => ({ type: AUTH_FAILED, error });

export const auth = (email: string, password: string) => {
  return (dispatch: any) => {
    dispatch(authStart());
    const payload = { email, password, returnSecureToken: true };
    Axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBR4qbTs4NunvTEj-AQZPei_4vgqVpYW58`, payload
    ).then(r => {
      console.log(r);
      dispatch(authSuccess(r.data));
    }).catch(e => {
      console.log(e);
      dispatch(authFailed(e));
    });
  }
};
