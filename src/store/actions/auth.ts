import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED } from './actionTypes';
import { TAuthAction } from '@burger/interfaces/auth/authAction';

const authStart = (): TAuthAction => ({ type: AUTH_START });

const authSuccess = (authData: any): TAuthAction => ({ type: AUTH_SUCCESS, authData });

const authFailed = (error: any): TAuthAction => ({ type: AUTH_FAILED, error });

export const auth = (email: string, password: string) => {
  return (dispatch: any) => {
    dispatch(authStart());
  }
};
