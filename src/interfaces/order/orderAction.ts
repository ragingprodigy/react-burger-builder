import { PURCHASE_BURGER_FAILED, PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_START, PURCHASE_INIT } from '@burger/store/actions/actionTypes';

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
  | { type: typeof PURCHASE_INIT };
