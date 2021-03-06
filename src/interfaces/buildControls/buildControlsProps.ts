import { TIngredients } from '../ingredients/ingredients';
import { TEventHandler } from '../callbacks';

export interface IBuildControlsProps {
  ingredients: TIngredients;
  ingredientAdded: (type: string) => void;
  ingredientRemoved: (type: string) => void;
  disabled: { [string: string]: boolean };
  price: number;
  purchaseable: boolean;
  ordered: TEventHandler;
  isAuthenticated: boolean;
}
