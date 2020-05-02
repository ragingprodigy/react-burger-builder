import { Ingredients } from '../states/ui/burger-builder';

export type OrderProps = {
  ingredients: Ingredients;
  price: number;
};