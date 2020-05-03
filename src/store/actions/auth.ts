import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED } from "./actionTypes";
import { TAuthAction } from "@burger/interfaces/auth/authAction";
import Axios from "axios";

const authStart = (): TAuthAction => ({ type: AUTH_START });

const authSuccess = (idToken: string, userId: string): TAuthAction => ({
  type: AUTH_SUCCESS,
  idToken,
  userId,
});

const authFailed = (error: any): TAuthAction => ({ type: AUTH_FAILED, error });

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
        console.log(r);
        dispatch(authSuccess(r.data.idToken, r.data.localId));
      })
      .catch((e) => {
        console.log(e);
        dispatch(authFailed(e));
      });
  };
};
