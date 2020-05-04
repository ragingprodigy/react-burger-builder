import { TEventHandler } from '../../interfaces/callbacks';
import { TIngredients } from '../../interfaces/ingredients/ingredients';

export type OrderSummaryProps = {
  ingredients: TIngredients;
  purchaseCancelled: TEventHandler;
  purchaseContinued: TEventHandler;
  price: number;
};
