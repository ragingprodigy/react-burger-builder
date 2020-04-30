import React from 'react';
import classes from './BuildControls.module.css';
import { Ingredient } from '../BurgerIngredient/BurgerIngredient';
import BuildControl from './BuildControl/BuildControl';
import { GenericHandler } from '../../../types/callbacks';

const controls = [
  { label: 'Salad', type: Ingredient.salad },
  { label: 'Bacon', type: Ingredient.bacon },
  { label: 'Cheese', type: Ingredient.cheese },
  { label: 'Meat', type: Ingredient.meat },
];

type BCProps = {
  ingredientAdded: (type: Ingredient) => void;
  ingredientRemoved: (type: Ingredient) => void;
  disabled: { [string: string]: boolean };
  price: number;
  purchaseable: boolean;
  ordered: GenericHandler;
};

const buildControls = (props: BCProps) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button onClick={props.ordered} disabled={!props.purchaseable} className={classes.OrderButton}>ORDER NOW</button>
  </div>
);

export default buildControls;