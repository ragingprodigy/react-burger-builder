import { TOrderState } from "../../interfaces/orders/order";
import { TOrderAction } from "../../interfaces/orders/orderAction";
import { combineReducers } from "redux";
import {
  FETCH_ORDERS_FAILED,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  PURCHASE_BURGER_FAILED,
  PURCHASE_BURGER_START,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_INIT,
} from "../actions/actionTypes";

const initialState: TOrderState = {
  loading: false,
  error: false,
  orders: [],
  purchased: false,
};

export default combineReducers<TOrderState, TOrderAction>({
  orders: (state = initialState.orders, action: TOrderAction) => {
    switch (action.type) {
      case PURCHASE_BURGER_SUCCESS:
        const newOrder = { ...action.orderData, id: action.orderId };
        return [...state, newOrder];
      case FETCH_ORDERS_SUCCESS:
        return action.orders;
      default:
        return state;
    }
  },
  loading: (state = initialState.loading, action: TOrderAction) => {
    switch (action.type) {
      case PURCHASE_BURGER_START:
        return true;
      case PURCHASE_BURGER_SUCCESS:
        return false;
      case PURCHASE_BURGER_FAILED:
        return false;
      case FETCH_ORDERS_START:
        return true;
      case FETCH_ORDERS_SUCCESS:
        return false;
      case FETCH_ORDERS_FAILED:
        return false;
      default:
        return state;
    }
  },
  purchased: (state = initialState.purchased, action: TOrderAction) => {
    switch (action.type) {
      case PURCHASE_INIT:
        return false;
      case PURCHASE_BURGER_SUCCESS:
        return true;
      case PURCHASE_BURGER_FAILED:
        return true;
      default:
        return state;
    }
  },
  error: (state = initialState.error, action: TOrderAction) => {
    switch (action.type) {
      case PURCHASE_INIT:
        return false;
      case PURCHASE_BURGER_SUCCESS:
        return false;
      case PURCHASE_BURGER_FAILED:
        return true;
      case FETCH_ORDERS_START:
        return false;
      case FETCH_ORDERS_SUCCESS:
        return false;
      case FETCH_ORDERS_FAILED:
        return true;
      default:
        return state;
    }
  },
});
