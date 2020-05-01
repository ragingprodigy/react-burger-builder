import { GenericHandler } from '../callbacks';
import { Ingredients } from '../states/burger-builder';

export type CheckoutSummaryProps = {
  ingredients: Ingredients;
  checkoutCancelled: GenericHandler;
  checkoutContinued: GenericHandler;
};
