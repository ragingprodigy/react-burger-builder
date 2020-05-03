import { GenericHandler } from '../callbacks';
import { TIngredients } from '@burger/interfaces/ingredients/ingredients';

export type BuildControlsProps = {
  ingredients: TIngredients;
  ingredientAdded: (type: string) => void;
  ingredientRemoved: (type: string) => void;
  disabled: { [string: string]: boolean };
  price: number;
  purchaseable: boolean;
  ordered: GenericHandler;
};
