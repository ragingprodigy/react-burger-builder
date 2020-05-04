import { TIngredients } from '../ingredients/ingredients';
import { TEventHandler } from '../callbacks';

export interface ICheckoutSummaryProps {
  ingredients: TIngredients;
  checkoutCancelled: TEventHandler;
  checkoutContinued: TEventHandler;
}
