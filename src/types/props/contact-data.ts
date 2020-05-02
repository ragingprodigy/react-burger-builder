import { Ingredients } from '../states/ui/burger-builder';

export type ContactDataProps = {
  ingredients: Ingredients;
  totalPrice: number;
  history: {
    push: (path: any) => any;
  }
};
