import { Ingredient } from '../enums/burger';
import { GenericHandler } from '../callbacks';

export type BuildControlsProps = {
  ingredientAdded: (type: Ingredient) => void;
  ingredientRemoved: (type: Ingredient) => void;
  disabled: { [string: string]: boolean };
  price: number;
  purchaseable: boolean;
  ordered: GenericHandler;
};
