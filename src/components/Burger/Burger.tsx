import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient, {Ingredient} from './BurgerIngredient/BurgerIngredient';

const burger = (props: any) => {
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={Ingredient.breadTop} />
      <BurgerIngredient type={Ingredient.cheese} />
      <BurgerIngredient type={Ingredient.meat} />
      <BurgerIngredient type={Ingredient.salad} />
      <BurgerIngredient type={Ingredient.breadBottom} />
    </div>
  );
};

export default burger;