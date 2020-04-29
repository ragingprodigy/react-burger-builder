import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient, {Ingredient} from './BurgerIngredient/BurgerIngredient';

type BurgerProps = {
  ingredients: {
    [Ingredient: string]: number,
  },
};

const burger = ({ingredients}: BurgerProps) => {
  const transformedIngredients = Object.keys(ingredients)
    .map(ingredient => {
      return [...Array(ingredients[ingredient])]
        .map((_, i) => <BurgerIngredient key={ingredient + i} type={ingredient as Ingredient} />)
    });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={Ingredient.breadTop} />
      { transformedIngredients }
      <BurgerIngredient type={Ingredient.breadBottom} />
    </div>
  );
};

export default burger;