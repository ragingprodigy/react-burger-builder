import { TAuthState } from '../../interfaces/auth/auth';
import { TAuthAction } from '../../interfaces/auth/authAction';
import { combineReducers } from 'redux';
import { AUTH_FAILED, AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from '../actions/actionTypes';

const initialState: TAuthState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
};

export default combineReducers<TAuthState, TAuthAction>({
  authRedirectPath: (state = initialState.authRedirectPath, action) => {
    if (action.type === SET_AUTH_REDIRECT_PATH) {
      return action.path;
    }
    
    return state;
  },
  token: (state = initialState.token, action) => {
    switch (action.type) {
      case AUTH_START:
      case AUTH_LOGOUT:
      case AUTH_FAILED: return null;
      case AUTH_SUCCESS: return action.idToken;
      default: return state;
    }
  },
  userId: (state = initialState.userId, action) => {
    switch (action.type) {
      case AUTH_START:
      case AUTH_LOGOUT:
      case AUTH_FAILED: return null;
      case AUTH_SUCCESS: return action.userId;
      default: return state;
    }
  },
  error: (state = initialState.error, action) => {
    switch (action.type) {
      case AUTH_START:
        return null;
      case AUTH_SUCCESS:
        return null;
      case AUTH_FAILED:
        return action.error;
      default:
        return state;
    }
  },
  loading: (state = initialState.loading, action) => {
    switch (action.type) {
      case AUTH_START:
        return true;
      case AUTH_SUCCESS:
        return false;
      case AUTH_FAILED:
        return false;
      default:
        return state;
    }
  },
});