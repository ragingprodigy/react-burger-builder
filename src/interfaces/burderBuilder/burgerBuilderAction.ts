import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
} from "@burger/store/actions/actionTypes";
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
    };
