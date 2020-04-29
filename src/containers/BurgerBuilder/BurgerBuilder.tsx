import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { Ingredient } from '../../components/Burger/BurgerIngredient/BurgerIngredient';

type Ingredients = {
  [Ingredient: string]: number,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component<any, { ingredients: Ingredients; totalPrice: number;}> {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 2,
      meat: 2,
    },
    totalPrice: 4
  };

  addIngredientHandler = (type: Ingredient) => {
    this.setState((prevState) => {
      const oldCount = prevState.ingredients[type];
      const updatedIngredients = { ...prevState.ingredients };
      updatedIngredients[type] = oldCount + 1;

      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = prevState.totalPrice;

      return {
        totalPrice: oldPrice + priceAddition,
        ingredients: updatedIngredients,
      };
    });
   };
  
  removeIngredientHandler = (type: Ingredient) => {
    this.setState((prevState) => {
      const oldCount = prevState.ingredients[type];
      if (oldCount > 0) {
        const updatedIngredients = { ...prevState.ingredients };
        updatedIngredients[type] = oldCount - 1;

        const price = INGREDIENT_PRICES[type];
        const oldPrice = prevState.totalPrice;

        return {
          totalPrice: oldPrice - price,
          ingredients: updatedIngredients,
        };
      }

      return prevState;
    });
  };

  render() {
    const disabledInfo: any = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo} />
      </Aux>
    );
  }
}

export default BurgerBuilder;