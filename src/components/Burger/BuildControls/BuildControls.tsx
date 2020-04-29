import React from 'react';
import classes from './BuildControls.module.css';
import { Ingredient } from '../BurgerIngredient/BurgerIngredient';
import BuildControl from './BuildControl/BuildControl';

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
};

const buildControls = (props: BCProps) => (
  <div className={classes.BuildControls}>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
  </div>
);

export default buildControls;