import { Ingredient, PassiveIngredient } from '../models/burger';

export type AllIngredients = Ingredient | PassiveIngredient;
export interface IBurgerIngredientProps {
  type: AllIngredients | string;
};
