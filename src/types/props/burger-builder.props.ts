import { TIngredients } from '@burger/interfaces/ingredients/ingredients';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '@burger/store/actions/actionTypes';
import { RouteComponentProps } from 'react-router-dom';
import { BurgerBuilderAction } from '../states/redux/burger-builder.action';
import { TOrderAction } from '@burger/interfaces/order/orderAction';
import { TBurgerBuilderAction } from '@burger/interfaces/burderBuilder/burgerBuilderAction';

type ExcludeTypeKey<K> = K extends "type" ? never : K;

type ExcludeTypeField<A> = { [K in ExcludeTypeKey<keyof A>]: A[K] };

type ExtractActionParameters<A, T> = A extends { type: T }
  ? ExcludeTypeField<A>
  : never;

export type IngredientName = ExtractActionParameters<BurgerBuilderAction, typeof ADD_INGREDIENT | typeof REMOVE_INGREDIENT>['ingredientName'];

export interface BurgerBuilderProps extends RouteComponentProps {
  ingredients: TIngredients;
  error: boolean;
  onAddIngredient: (name: string) => TBurgerBuilderAction;
  onRemoveIngredient: (name: string) => TBurgerBuilderAction;
  initIngredients: () => any;
  onInitPurchase: () => TOrderAction;
}
