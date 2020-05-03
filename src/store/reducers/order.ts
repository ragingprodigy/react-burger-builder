import { combineReducers } from "redux";
import { TOrderState } from '@burger/interfaces/order/order';
import { TOrderAction } from '@burger/interfaces/order/orderAction';
import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAILED, PURCHASE_BURGER_START, PURCHASE_INIT } from '../actions/actionTypes';

const initialState: TOrderState = {
  loading: false,
  // error: false,
  orders: [],
  purchased: false,
};

export default combineReducers<TOrderState, TOrderAction>({
  orders: (state = initialState.orders, action: TOrderAction) => {
    switch (action.type) {
      case PURCHASE_BURGER_SUCCESS:
        const newOrder = { ...action.orderData, id: action.orderId };
        return [...state, newOrder];
      default: return state;
    }
  },
  loading: (state = initialState.loading, action: TOrderAction) => {
    switch (action.type) {
      case PURCHASE_BURGER_START: return true;
      case PURCHASE_BURGER_SUCCESS: return false;
      case PURCHASE_BURGER_FAILED: return false;
      default: return state;
    }
  },
  purchased: (state = initialState.purchased, action: TOrderAction) => {
    switch (action.type) {
      case PURCHASE_INIT: return false;
      case PURCHASE_BURGER_SUCCESS: return true;
      case PURCHASE_BURGER_FAILED: return true;
      default: return state;
    }
  }
});
