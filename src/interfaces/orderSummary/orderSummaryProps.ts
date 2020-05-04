import { TIngredients } from '../ingredients/ingredients';
import { TEventHandler } from '../callbacks';

export interface IOrderSummaryProps {
  ingredients: TIngredients;
  purchaseCancelled: TEventHandler;
  purchaseContinued: TEventHandler;
  price: number;
}
