import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAILED,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILED,
  FETCH_ORDERS_START,
} from './actionTypes';
import axios from '../../axios-orders';
import { TOrderAction } from '../../interfaces/orders/orderAction';
import { TIngredients } from '../../interfaces/ingredients/ingredients';
import { IOrder } from '../../interfaces/models/order';

const purchaseBurgerSuccess = (id: string, orderData: any): TOrderAction => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: {
      ...orderData,
      ingredients: ((): TIngredients =>
        Object.values(orderData.ingredients) as TIngredients)(),
    },
  };
};

const purchaseBurgerFail = (error: any): TOrderAction => ({
  type: PURCHASE_BURGER_FAILED,
  error,
});
const purchaseBurgerStart = (): TOrderAction => ({
  type: PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData: any, token: string) => {
  return (dispatch: any): any => {
    dispatch(purchaseBurgerStart());

    axios
      .post(`orders.json?auth=${token}`, orderData)
      .then((r) => {
        dispatch(purchaseBurgerSuccess(r.data.name, orderData));
      })
      .catch((e) => {
        dispatch(purchaseBurgerFail(e));
      });
  };
};

export const purchaseInit = (): TOrderAction => ({ type: PURCHASE_INIT });

const fetchOrdersSuccess = (orders: any[]): TOrderAction => ({
  type: FETCH_ORDERS_SUCCESS,
  orders,
});
const fetchOrdersFail = (error: any): TOrderAction => ({
  type: FETCH_ORDERS_FAILED,
  error,
});

const fetchOrdersStart = (): TOrderAction => ({ type: FETCH_ORDERS_START });

export const fetchOrders = (token: string, userId: string) => {
  return (dispatch: any): any => {
    dispatch(fetchOrdersStart());

    axios
      .get(`orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then((r) => {
        const orders = Object.keys(r.data).map((key) => {
          return {
            ...r.data[key],
            id: key,
            ingredients: ((): TIngredients =>
              Object.values(r.data[key].ingredients) as TIngredients)(),
          } as IOrder;
        });

        dispatch(fetchOrdersSuccess(orders));
      })
      .catch((e) => {
        dispatch(fetchOrdersFail(e));
      });
  };
};
