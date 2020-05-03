import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAILED,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILED,
} from "./actionTypes";
import axios from "@burger/axios-orders";
import { TOrderAction } from "@burger/interfaces/order/orderAction";
import { Order } from '@burger/types/models/order';
import { TIngredients } from '@burger/interfaces/ingredients/ingredients';

const purchaseBurgerSuccess = (id: string, orderData: any): TOrderAction => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

const purchaseBurgerFail = (error: any): TOrderAction => ({
  type: PURCHASE_BURGER_FAILED,
  error,
});
const purchaseBurgerStart = (): TOrderAction => ({
  type: PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData: any) => {
  return (dispatch: any) => {
    dispatch(purchaseBurgerStart());

    axios
      .post("orders.json", orderData)
      .then((r) => {
        dispatch(purchaseBurgerSuccess(r.data.name, orderData));
      })
      .catch((e) => {
        dispatch(purchaseBurgerFail(e));
      });
  };
};

export const purchaseInit = (): TOrderAction => ({ type: PURCHASE_INIT });

const fetchOrdersSuccess = (orders: any[]) => ({
  type: FETCH_ORDERS_SUCCESS,
  orders,
});
const fetchOrdersFail = (error: any) => ({ type: FETCH_ORDERS_FAILED, error });

export const fetchOrders = () => {
  return (dispatch: any) => {
    axios
      .get("orders.json")
      .then((r) => {
        console.log("Orders: ", r.data);
        const orders = Object.keys(r.data).map((key) => {
          return {
            ...r.data[key],
            id: key,
            ingredients: (() => Object.values(r.data[key].ingredients) as TIngredients)()
          } as Order;
        });

        dispatch(fetchOrdersSuccess(orders));
      })
      .catch((e) => {
        dispatch(fetchOrdersFail(e));
      });
  };
};
