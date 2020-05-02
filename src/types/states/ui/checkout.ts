import { Ingredients } from "@burger/types/states/ui/burger-builder";

export type CheckoutState = {
  ingredients: Ingredients | null;
  totalPrice: number;
};
