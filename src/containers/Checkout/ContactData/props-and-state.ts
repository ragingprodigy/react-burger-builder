import { Ingredients } from '../../../types/states/burger-builder';

export type ContactDataState = {
  name: string;
  email: string;
  address: {
    street: string;
    postCode: string;
  };
  loading: boolean;
};

export type ContactDataProps = {
  ingredients: Ingredients;
  totalPrice: number;
  history: {
    push: (path: any) => any;
  }
};