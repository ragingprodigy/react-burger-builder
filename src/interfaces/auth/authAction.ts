import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED } from '@burger/store/actions/actionTypes';

export type TAuthAction =
  | { type: typeof AUTH_START }
  | { type: typeof AUTH_SUCCESS, authData: any }
  | { type: typeof AUTH_FAILED, error: any };