import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED,
} from '../actions/actionTypes';
import { combineReducers } from 'redux';
import { TBurgerBuilderState } from '../../interfaces/burderBuilder/burderBuilder';
import { TBurgerBuilderAction } from '../../interfaces/burderBuilder/burgerBuilderAction';

const initialState: TBurgerBuilderState = {
  ingredients: [],
  error: false,
  buildingBurger: false,
};

export default combineReducers<TBurgerBuilderState, TBurgerBuilderAction>({
  error: (state = initialState.error, action: TBurgerBuilderAction) => {
    switch (action.type) {
      case SET_INGREDIENTS:
        return false;
      case FETCH_INGREDIENTS_FAILED:
        return true;
      default:
        return state;
    }
  },
  buildingBurger: (state = initialState.buildingBurger, action) => {
    switch (action.type) {
      case ADD_INGREDIENT:
      case REMOVE_INGREDIENT:
        return true;
      case SET_INGREDIENTS:
        return false;
      default:
        return state;
    }
  },
  ingredients: (
    state = initialState.ingredients,
    action: TBurgerBuilderAction
  ) => {
    switch (action.type) {
      case ADD_INGREDIENT:
        const ingredients = [...state];
        const ingredient = ingredients.find(
          (i) => i.label === action.ingredientName
        );
        if (ingredient) {
          ingredient.units += 1;
        }

        return [...ingredients];
      case REMOVE_INGREDIENT:
        const currentIngredients = [...state];
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
