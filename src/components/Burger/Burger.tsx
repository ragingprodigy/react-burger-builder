import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient, {Ingredient, PassiveIngredient} from './BurgerIngredient/BurgerIngredient';

type BurgerProps = {
  ingredients: {
    [Ingredient: string]: number,
  },
};

const burger = ({ingredients}: BurgerProps) => {
  let transformedIngredients: any = Object.keys(ingredients)
    .map(ingredient => {
      return [...Array(ingredients[ingredient])]
        .map((_, i) => <BurgerIngredient key={ingredient + i} type={ingredient as Ingredient} />)
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={PassiveIngredient.breadTop} />
      {transformedIngredients}
      <BurgerIngredient type={PassiveIngredient.breadBottom} />
    </div>
  );
};

export default burger;