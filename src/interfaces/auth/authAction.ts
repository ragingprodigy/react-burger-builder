import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAILED,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH,
  AUTH_CHECK_STATE,
} from "../../store/actions/actionTypes";

export type TAuthAction =
  | { type: typeof AUTH_START }
  | { type: typeof AUTH_CHECK_STATE }
  | { type: typeof AUTH_LOGOUT }
  | { type: typeof AUTH_SUCCESS; idToken: string; userId: string }
  | { type: typeof AUTH_FAILED; error: any }
  | { type: typeof SET_AUTH_REDIRECT_PATH; path: string };