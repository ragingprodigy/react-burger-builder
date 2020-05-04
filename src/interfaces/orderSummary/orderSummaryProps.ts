import { TIngredients } from '../ingredients/ingredients';
import { GenericHandler } from '../callbacks';

export interface IOrderSummaryProps {
  ingredients: TIngredients;
  purchaseCancelled: GenericHandler;
  purchaseContinued: GenericHandler;
  price: number;
};
