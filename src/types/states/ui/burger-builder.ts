export type Ingredients = {
  [Ingredient: string]: number;
};

export type BurgerBuilderState = {
  purchasing: boolean;
  loading: boolean;
};
