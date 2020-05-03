import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAILED, PURCHASE_BURGER_START } from './actionTypes';
import axios from '@burger/axios-orders';

export const purchaseBurgerSuccess = (id: string, orderData: any) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  };
};
 
export const purchaseBurgerFail = (error: any) => ({ type: PURCHASE_BURGER_FAILED, error });
export const purchaseBurgerStart = () => ({ type: PURCHASE_BURGER_START });

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
