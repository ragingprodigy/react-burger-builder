import { TIngredients } from '../ingredients/ingredients';

export interface IOrderProps {
  orders: any[];
  error: boolean;
  token: string;
  loading: boolean;
  ingredients: TIngredients;
  fetchOrders: (token: string) => void;
  initIngredients: () => void;
}
