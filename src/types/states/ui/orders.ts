import { Order } from '../../models/order';

export interface OrdersState{
  loading: boolean;
  orders: Order[];
}
