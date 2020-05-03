import { TIngredients } from '@burger/interfaces/ingredients/ingredients';

export interface Order {
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
