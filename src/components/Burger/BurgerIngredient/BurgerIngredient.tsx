import React, { Component } from 'react';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

export enum PassiveIngredient {
  breadBottom = "bread-bottom",
  breadTop = "bread-top",
}

export enum Ingredient {
  meat = 'meat',
  cheese = 'cheese',
  salad = 'salad',
  bacon = 'bacon',
}

type AllIngredients = Ingredient | PassiveIngredient;

type Props = {
  type: AllIngredients;
};


export default class BurgerIngredient extends Component<Props> {

  static propTypes = {
    type: PropTypes.string.isRequired,
  };

  render() {
    let ingredient = null;

    switch (this.props.type) {
      case PassiveIngredient.breadBottom:
        ingredient = <div className={classes.BreadBottom}></div>;
        break;
      case PassiveIngredient.breadTop:
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;
      case Ingredient.meat:
        ingredient = <div className={classes.Meat}></div>;
        break;
      case Ingredient.cheese:
        ingredient = <div className={classes.Cheese}></div>;
        break;
      case Ingredient.salad:
        ingredient = <div className={classes.Salad}></div>;
        break;
      case Ingredient.bacon:
        ingredient = <div className={classes.Bacon}></div>;
        break;
      default:
        ingredient = null;
    }

    return ingredient;
  }
};
