import { RouteComponentProps } from 'react-router-dom';
import { TIngredients } from '@burger/interfaces/ingredients/ingredients';

export interface CheckoutProps extends RouteComponentProps {
  ingredients: TIngredients;
}
