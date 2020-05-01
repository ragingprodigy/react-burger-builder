import { Ingredients } from '../../types/states/burger-builder';

export type CheckoutState = {
  ingredients: Ingredients | null;
};