import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredientComponent from './BurgerIngredient/BurgerIngredient';
import { BurgerProps } from "../../types/props/burger";
import { PassiveIngredient } from "../../types/enums/burger";
import { IIngredient } from "../../interfaces/ingredients/ingredient";

const burger = (props: BurgerProps) => {
  const ingredients = props.ingredients;

  let transformedIngredients = ingredients
    .map((ingredient: IIngredient) => {
      return [...Array(ingredient.units)]
        .map((_, i) => <BurgerIngredientComponent key={`${ingredient.label}-${i}`} type={ingredient.label} />)
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  
  if (transformedIngredients.length === 0) {
    transformedIngredients.push(<p key='prompt'>Please start adding ingredients</p>);
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredientComponent type={PassiveIngredient.breadTop} />
      {transformedIngredients}
      <BurgerIngredientComponent type={PassiveIngredient.breadBottom} />
    </div>
  );
};

export default burger;