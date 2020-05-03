import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS } from "../actions/actionTypes";
import { combineReducers } from "redux";
import { TBurgerBuilderState } from "@burger/interfaces/burderBuilder/burderBuilder";
import { TBurgerBuilderAction } from '@burger/interfaces/burderBuilder/burgerBuilderAction';

const initialState: TBurgerBuilderState = {
  ingredients: [],
};

export default combineReducers<TBurgerBuilderState, TBurgerBuilderAction>({
  ingredients: (
    state = initialState.ingredients,
    action: TBurgerBuilderAction
  ) => {
    switch (action.type) {
      case ADD_INGREDIENT:
        let ingredients = [...state];
        const ingredient = ingredients.find(
          (i) => i.label === action.ingredientName
        );
        if (ingredient) {
          ingredient.units += 1;
        }

        return [...ingredients];
      case REMOVE_INGREDIENT:
        let currentIngredients = [...state];
        const activeIngredient = currentIngredients.find(
          (i) => i.label === action.ingredientName
        );
        if (activeIngredient && activeIngredient.units > 0) {
          activeIngredient.units -= 1;
        }

        return [...currentIngredients];
      case SET_INGREDIENTS:
        return action.ingredients;
      default:
        return state;
    }
  },
});
