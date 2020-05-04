import { TIngredients } from '../ingredients/ingredients';

export interface IContactDataProps {
  ingredients: TIngredients;
  loading: boolean;
  token: string;
  userId: string;
  onOrderBurger: (orderData: any, token: string) => any;
}
