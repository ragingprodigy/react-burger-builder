export type Ingredients = {
  [Ingredient: string]: number;
};

export type BurgerBuilderState = {
  ingredients: Ingredients | any;
  totalPrice: number;
  purchaseable: boolean;
  purchasing: boolean;
  loading: boolean;
};
