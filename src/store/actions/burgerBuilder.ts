import axios from "../../axios-orders";
import { TBurgerBuilderAction } from "../../interfaces/burderBuilder/burgerBuilderAction";
import { TIngredients } from '../../interfaces/ingredients/ingredients';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED } from "./actionTypes";

export const addIngredient = (
  ingredientName: string
): TBurgerBuilderAction => ({
  type: ADD_INGREDIENT,
  ingredientName,
});

export const removeIngredient = (
  ingredientName: string
): TBurgerBuilderAction => ({
  type: REMOVE_INGREDIENT,
  ingredientName,
});

export const setIngredients = (
  ingredients: TIngredients
): TBurgerBuilderAction => {
  return {
    type: SET_INGREDIENTS,
    ingredients,
  };
};

export const fetchIngredientsFailed = (): TBurgerBuilderAction => ({ type: FETCH_INGREDIENTS_FAILED });

export const initIngredients = () => {
  return (dispatch: any) => {
    axios
      .get("ingredients.json")
      .then((response) => {
        const values: TIngredients = Object.values(response.data);
        dispatch(setIngredients(values));
      })
      .catch(() => dispatch(fetchIngredientsFailed()));
  };
};
