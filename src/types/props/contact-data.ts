import { RouteComponentProps } from 'react-router-dom';
import { TIngredients } from '../../interfaces/ingredients/ingredients';

export interface ContactDataProps extends RouteComponentProps {
  ingredients: TIngredients;
  loading: boolean;
  token: string,
  onOrderBurger: (orderData: any, token: string) => any;
}
