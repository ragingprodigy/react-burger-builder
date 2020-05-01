import { Ingredient, PassiveIngredient } from '../enums/burger';

export type AllIngredients = Ingredient | PassiveIngredient;
export type BurgerIngredientProps = { type: AllIngredients; };

export type BurgerProps = {
  ingredients: {
    [Ingredient: string]: number;
  };
};
