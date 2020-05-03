import { Ingredient, PassiveIngredient } from '../enums/burger';
import { TIngredients } from '@burger/interfaces/ingredients/ingredients';

export type AllIngredients = Ingredient | PassiveIngredient;
export type BurgerIngredientProps = { type: AllIngredients | string; };

export type BurgerProps = {
  ingredients: TIngredients;
};
