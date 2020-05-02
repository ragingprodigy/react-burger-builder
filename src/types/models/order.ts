import { Ingredients } from '../states/ui/burger-builder';

export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    address: {
      street: string;
      postalCode: string;
    }
  },
  price: number;
  deliveryMethod: string;
  ingredients: Ingredients;
}
