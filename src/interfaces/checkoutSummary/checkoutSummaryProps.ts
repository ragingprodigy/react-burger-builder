import { TIngredients } from '../ingredients/ingredients';
import { GenericHandler } from '../callbacks';

export interface ICheckoutSummaryProps {
  ingredients: TIngredients;
  checkoutCancelled: GenericHandler;
  checkoutContinued: GenericHandler;
};
