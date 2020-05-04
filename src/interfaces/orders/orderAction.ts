import {
  FETCH_ORDERS_FAILED,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  PURCHASE_BURGER_FAILED,
  PURCHASE_BURGER_START,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_INIT,
} from "../../store/actions/actionTypes";

export type TOrderAction =
  | {
      type: typeof PURCHASE_BURGER_FAILED;
      error: any;
    }
  | {
      type: typeof PURCHASE_BURGER_SUCCESS;
      orderId: string;
      orderData: any;
    }
  | { type: typeof PURCHASE_BURGER_START }
  | { type: typeof PURCHASE_INIT }
  | {
      type: typeof FETCH_ORDERS_SUCCESS;
      orders: any[];
    }
  | {
      type: typeof FETCH_ORDERS_FAILED;
      error: any;
    }
  | { type: typeof FETCH_ORDERS_START };
