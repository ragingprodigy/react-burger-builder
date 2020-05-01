import { Ingredients } from "@burger/types/states/burger-builder";

export type CheckoutState = {
  ingredients: Ingredients | null;
  totalPrice: number;
};
