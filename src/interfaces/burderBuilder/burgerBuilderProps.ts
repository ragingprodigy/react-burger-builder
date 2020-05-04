import { TIngredients } from '../ingredients/ingredients';
import { TBurgerBuilderAction } from './burgerBuilderAction';
import { TOrderAction } from '../order/orderAction';
import { TAuthAction } from '../auth/authAction';

export interface IBurgerBuilderProps {
  ingredients: TIngredients;
  isAuthenticated: boolean;
  buildingBurger: boolean;
  error: boolean;
  onAddIngredient: (name: string) => TBurgerBuilderAction;
  onRemoveIngredient: (name: string) => TBurgerBuilderAction;
  initIngredients: () => any;
  onInitPurchase: () => TOrderAction;
  onSetAuthRedirectPath: (path: string) => TAuthAction;
  history: {
    push: (...args: any) => any;
  },
}
