import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGOUT } from '@burger/store/actions/actionTypes';

export type TAuthAction =
  | { type: typeof AUTH_START }
  | { type: typeof AUTH_LOGOUT }
  | { type: typeof AUTH_SUCCESS; idToken: string; userId: string }
  | { type: typeof AUTH_FAILED; error: any };