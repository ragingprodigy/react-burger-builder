import reducer from './auth';
import { TAuthAction } from '../../interfaces/auth/authAction';
import { TAuthState } from '../../interfaces/auth/auth';
import {
  SET_AUTH_REDIRECT_PATH,
  AUTH_SUCCESS,
  AUTH_START,
  AUTH_FAILED,
} from '../actions/actionTypes';

describe('auth reducer', () => {
  let initialState: TAuthState;

  beforeEach(() => {
    initialState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as TAuthAction)).toEqual(initialState);
  });

  it('should set authRedirectPath', () => {
    expect(
      reducer(undefined, { type: SET_AUTH_REDIRECT_PATH, path: 'some-path' })
    ).toEqual({
      ...initialState,
      authRedirectPath: 'some-path',
    });
  });

  it('should handle AUTH_START', () => {
    expect(reducer(undefined, { type: AUTH_START })).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle AUTH_FAILED', () => {
    expect(
      reducer(undefined, { type: AUTH_FAILED, error: 'some_error' })
    ).toEqual({
      ...initialState,
      loading: false,
      error: 'some_error',
    });
  });

  it('should set the token and userId on successful login', () => {
    expect(
      reducer(undefined, {
        type: AUTH_SUCCESS,
        idToken: 'token',
        userId: 'user.id',
      })
    ).toEqual({
      ...initialState,
      userId: 'user.id',
      token: 'token',
    });
  });
});
