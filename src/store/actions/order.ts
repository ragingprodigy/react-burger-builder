import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAILED, PURCHASE_BURGER_START, PURCHASE_INIT } from './actionTypes';
import axios from '@burger/axios-orders';
import { TOrderAction } from '@burger/interfaces/order/orderAction';

export const purchaseBurgerSuccess = (id: string, orderData: any): TOrderAction => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  };
};
 
export const purchaseBurgerFail = (error: any): TOrderAction => ({ type: PURCHASE_BURGER_FAILED, error });
export const purchaseBurgerStart = (): TOrderAction => ({ type: PURCHASE_BURGER_START });

export const purchaseBurger = (orderData: any) => {
  return (dispatch: any) => {
    dispatch(purchaseBurgerStart());
    
    axios.post('orders.json', orderData).then(r => {
      dispatch(purchaseBurgerSuccess(r.data.name, orderData));
    }).catch(e => {
      dispatch(purchaseBurgerFail(e));
    });
  };
};

export const purchaseInit = (): TOrderAction => ({ type: PURCHASE_INIT });
