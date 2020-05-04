import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED,
} from "../../store/actions/actionTypes";
import { TIngredients } from "../ingredients/ingredients";

export type TBurgerBuilderAction =
  | {
      type: typeof ADD_INGREDIENT;
      ingredientName: string;
    }
  | {
      type: typeof REMOVE_INGREDIENT;
      ingredientName: string;
    }
  | {
      type: typeof SET_INGREDIENTS;
      ingredients: TIngredients;
  }
  | { type: typeof FETCH_INGREDIENTS_FAILED };
