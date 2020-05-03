import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from "./actionTypes";
import { TAuthAction } from "@burger/interfaces/auth/authAction";
import Axios from "axios";

const authStart = (): TAuthAction => ({ type: AUTH_START });

const authSuccess = (idToken: string, userId: string): TAuthAction => ({
  type: AUTH_SUCCESS,
  idToken,
  userId,
});

const authFailed = (error: any): TAuthAction => ({ type: AUTH_FAILED, error });

export const logout = (): TAuthAction => {
  localStorage.clear();
  return { type: AUTH_LOGOUT };
};

const checkAuthTimeout = (expires: number) => { 
  return (dispatch: any) => {
    setTimeout(() => dispatch(logout()), expires * 1000);
  };
};

export const auth = (email: string, password: string, isSignUp = true) => {
  return (dispatch: any) => {
    dispatch(authStart());
    const payload = { email, password, returnSecureToken: true };
    const API_KEY = `AIzaSyBR4qbTs4NunvTEj-AQZPei_4vgqVpYW58`;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${
      isSignUp ? "signUp" : "signInWithPassword"
    }?key=${API_KEY}`;

    Axios.post(url, payload)
      .then((r) => {
        const expiryDate = Date.now() + +r.data.expiresIn * 1000;
        localStorage.setItem('token', r.data.idToken);
        localStorage.setItem("userId", r.data.localId);
        localStorage.setItem("expiryDate", expiryDate.toString());
        dispatch(authSuccess(r.data.idToken, r.data.localId));
        dispatch(checkAuthTimeout(+r.data.expiresIn));
      })
      .catch((e) => {
        dispatch(authFailed(e.response.data.error));
      });
  };
};

export const checkAuthState = () => {
  return (dispatch: any) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      dispatch(logout());
    } else {
      const expiryTime = localStorage.getItem("expiryDate");
      if (null === expiryTime) {
        dispatch(logout());
      } else {
        if (+expiryTime < Date.now()) {
          dispatch(logout());
        } else {
          dispatch(authSuccess(token, userId));
          const timeDiff = (+expiryTime - Date.now()) / 1000;
          dispatch(checkAuthTimeout(timeDiff));
        }
      }
    }
  };
};

export const setAuthRedirectPath = (path: string): TAuthAction => ({ type: SET_AUTH_REDIRECT_PATH, path});
