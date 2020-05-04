import { GenericHandler } from '../callbacks';
import { TIngredients } from '../../interfaces/ingredients/ingredients';

export type CheckoutSummaryProps = {
  ingredients: TIngredients;
  checkoutCancelled: GenericHandler;
  checkoutContinued: GenericHandler;
};
