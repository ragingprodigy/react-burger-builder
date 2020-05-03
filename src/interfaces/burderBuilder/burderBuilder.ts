import { TIngredients } from '../ingredients/ingredients';

export type TBurgerBuilderState = {
  ingredients: TIngredients;
  error: boolean;
}
