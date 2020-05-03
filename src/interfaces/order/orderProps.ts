import { TIngredients } from '../ingredients/ingredients';

export interface IOrderProps {
  orders: any[];
  loading: boolean;
  ingredients: TIngredients;
  fetchOrders: () => void;
  initIngredients: () => void;
}
