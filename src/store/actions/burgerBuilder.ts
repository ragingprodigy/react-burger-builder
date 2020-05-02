import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "./actionTypes";
import { BurgerBuilderAction } from "@burger/types/states/redux/burger-builder.action";

export const addIngredient = (ingredientName: any): BurgerBuilderAction => ({
  type: ADD_INGREDIENT,
  ingredientName,
});

export const removeIngredient = (ingredientName: any): BurgerBuilderAction => ({
  type: REMOVE_INGREDIENT,
  ingredientName,
});
