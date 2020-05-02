import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '@burger/store/actions/actionTypes';
import { BurgerBuilderState } from './burger-builder.state';

export type BurgerBuilderAction =
  | {
      type: typeof ADD_INGREDIENT;
      ingredientName: keyof BurgerBuilderState["ingredients"];
    }
  | {
      type: typeof REMOVE_INGREDIENT;
      ingredientName: keyof BurgerBuilderState["ingredients"];
    };
