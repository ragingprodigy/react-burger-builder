import { Ingredients } from "App/types/states/ui/burger-builder";

export type CheckoutState = {
  ingredients: Ingredients | null;
  totalPrice: number;
};
