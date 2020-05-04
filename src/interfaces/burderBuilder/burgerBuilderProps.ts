import { TIngredients } from '../ingredients/ingredients';
import { TBurgerBuilderAction } from './burgerBuilderAction';
import { TOrderAction } from '../order/orderAction';
import { RouteComponentProps } from 'react-router-dom';
import { TAuthAction } from '../auth/authAction';

export interface IBurgerBuilderProps extends RouteComponentProps {
  ingredients: TIngredients;
  isAuthenticated: boolean;
  buildingBurger: boolean;
  error: boolean;
  onAddIngredient: (name: string) => TBurgerBuilderAction;
  onRemoveIngredient: (name: string) => TBurgerBuilderAction;
  initIngredients: () => any;
  onInitPurchase: () => TOrderAction;
  onSetAuthRedirectPath: (path: string) => TAuthAction;
}
