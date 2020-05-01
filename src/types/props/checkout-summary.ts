import { GenericHandler } from '../callbacks';

export type CheckoutSummaryProps = {
  ingredients: any;
  checkoutCancelled: GenericHandler;
  checkoutContinued: GenericHandler;
};
