import { GenericHandler } from '../callbacks';

export type OrderSummaryProps = {
  ingredients: any;
  purchaseCancelled: GenericHandler;
  purchaseContinued: GenericHandler;
  price: number;
};
