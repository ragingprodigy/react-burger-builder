import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import { Ingredient } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

type Ingredients = {
  [Ingredient: string]: number,
};

type StateType = {
  ingredients: Ingredients;
  totalPrice: number;
  purchaseable: boolean;
  purchasing: boolean;
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component<any, StateType> {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  };

  updatePurchaseState() {
    const ingredients = { ...this.state.ingredients };
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey as Ingredient];
      })
      .reduce((sum, el) => sum + el, 0);
    
    this.setState({ purchaseable: sum > 0 });
  }

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
    }, () => {
      this.updatePurchaseState();
    });
  };
  
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => this.setState({purchasing: false});
  
  removeIngredientHandler = (type: Ingredient) => {
    this.setState((prevState) => {
      const { ingredients, purchaseable, purchasing, totalPrice } = prevState;
      const oldCount = ingredients[type];
      if (oldCount === 0) {
        return;
      }

      const updatedIngredients = { ...ingredients };
      updatedIngredients[type] = oldCount - 1;

      const itemPrice = INGREDIENT_PRICES[type];

      return {
        totalPrice: totalPrice - itemPrice,
        ingredients: updatedIngredients,
        purchaseable,
        purchasing,
      };
    }, () => {
      this.updatePurchaseState();
    });
  };

  purchaseContinueHandler = () => alert('Continue Order');

  render() {
    const disabledInfo: any = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
          disabled={disabledInfo} />
      </Aux>
    );
  }
}

export default BurgerBuilder;