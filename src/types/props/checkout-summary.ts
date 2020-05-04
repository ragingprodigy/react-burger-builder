import { TEventHandler } from '../../interfaces/callbacks';
import { TIngredients } from '../../interfaces/ingredients/ingredients';

export type CheckoutSummaryProps = {
  ingredients: TIngredients;
  checkoutCancelled: TEventHandler;
  checkoutContinued: TEventHandler;
};
