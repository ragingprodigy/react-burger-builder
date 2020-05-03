import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
} from '@burger/store/actions/actionTypes';
import { BurgerBuilderState, BurgerIngredient } from './burger-builder.state';

export type BurgerBuilderAction =
  | {
      type: typeof ADD_INGREDIENT;
      ingredientName: BurgerIngredient;
    }
  | {
      type: typeof REMOVE_INGREDIENT;
      ingredientName: BurgerIngredient;
    }
  | {
      type: typeof SET_INGREDIENTS;
      ingredients: BurgerBuilderState["ingredients"];
    };
