export interface BurgerBuilderState {
  ingredients: {
    salad: number;
    cheese: number;
    meat: number;
    bacon: number;
  } | any;
  totalPrice: number;
};


type NonOptionalKeys<T> = { [k in keyof T]-?: undefined extends T[k] ? never : k }[keyof T];


export type BurgerIngredient = keyof Partial<BurgerBuilderState["ingredients"]>;