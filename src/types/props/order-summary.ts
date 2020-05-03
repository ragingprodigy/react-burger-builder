import { GenericHandler } from '../callbacks';
import { TIngredients } from '@burger/interfaces/ingredients/ingredients';

export type OrderSummaryProps = {
  ingredients: TIngredients;
  purchaseCancelled: GenericHandler;
  purchaseContinued: GenericHandler;
  price: number;
};
