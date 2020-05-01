import { Ingredients } from '../states/burger-builder';

export type ContactDataProps = {
  ingredients: Ingredients;
  totalPrice: number;
  history: {
    push: (path: any) => any;
  }
};
