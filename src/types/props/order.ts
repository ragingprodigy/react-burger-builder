import { Ingredients } from '../states/burger-builder';

export type OrderProps = {
  ingredients: Ingredients;
  price: number;
};