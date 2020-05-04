import { TIngredients } from '../../interfaces/ingredients/ingredients';
import { RouteComponentProps } from 'react-router-dom';

export interface CheckoutProps extends RouteComponentProps {
  ingredients: TIngredients;
  purchased: boolean;
}
