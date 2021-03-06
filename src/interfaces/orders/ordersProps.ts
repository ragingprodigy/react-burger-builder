import { TIngredients } from '../ingredients/ingredients';

export interface IOrdersProps {
  orders: any[];
  error: boolean;
  token: string;
  userId: string;
  loading: boolean;
  ingredients: TIngredients;
  fetchOrders: (token: string, userId: string) => void;
  initIngredients: () => void;
}
