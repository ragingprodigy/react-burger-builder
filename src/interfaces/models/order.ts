import { TIngredients } from '../ingredients/ingredients';

export interface IOrder {
  id: string;
  orderData: {
    id: string;
    name: string;
    email: string;
    street: string;
    postalCode: string;
    deliveryMethod: string;
  };
  ingredients: TIngredients;
}
