export type BurgerBuilderState = Readonly<{
  ingredients: Readonly<{
    salad: number;
    cheese: number;
    meat: number;
    bacon: number;
  }>;
  totalPrice: number;
}>;
