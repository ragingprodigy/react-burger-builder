import { TAuthState } from '@burger/interfaces/auth/auth';
import { TAuthAction } from '@burger/interfaces/auth/authAction';
import { combineReducers } from 'redux';
import { AUTH_FAILED, AUTH_START, AUTH_SUCCESS } from '../actions/actionTypes';

const initialState: TAuthState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

export default combineReducers<TAuthState, TAuthAction>({
  token: (state = initialState.token, action) => {
    switch (action.type) {
      case AUTH_START: return null;
      case AUTH_SUCCESS: return action.idToken;
      case AUTH_FAILED: return null;
      default: return state;
    }
  },
  userId: (state = initialState.userId, action) => {
    switch (action.type) {
      case AUTH_START: return null;
      case AUTH_SUCCESS: return action.userId;
      case AUTH_FAILED: return null;
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