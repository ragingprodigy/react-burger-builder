import {ADD_INGREDIENT, REMOVE_INGREDIENT } from './actions';
import { combineReducers } from 'redux';
import { BurgerBuilderState } from '@burger/types/states/redux/burger-builder.state';
import { BurgerBuilderAction } from '@burger/types/states/redux/burger-builder.action';

const initialState: BurgerBuilderState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0,
  },
  totalPrice: 4,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export default combineReducers<BurgerBuilderState, BurgerBuilderAction>({
  ingredients: (state = initialState.ingredients, action: BurgerBuilderAction) => {
    switch (action.type) {
      case ADD_INGREDIENT:
        return {
          ...state,
          [action.ingredientName]: state[action.ingredientName] + 1,
        };
      case REMOVE_INGREDIENT:
        if (state[action.ingredientName] <= 0) {
          return state;
        }

        return {
          ...state,
          [action.ingredientName]: state[action.ingredientName] - 1,
        };
      default: return state;
    }
  },
  totalPrice: (state = initialState.totalPrice, action: BurgerBuilderAction) => {
    switch (action.type) {
      case ADD_INGREDIENT:
        return state + INGREDIENT_PRICES[action.ingredientName];
      case REMOVE_INGREDIENT:
        return state - INGREDIENT_PRICES[action.ingredientName];
      default:
        return state;
    }
  }
});
