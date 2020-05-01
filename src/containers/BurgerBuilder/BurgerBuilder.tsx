import React, { Component } from 'react';
import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { Ingredient } from '../../types/enums/burger';
import { BurgerBuilderState, Ingredients } from '../../types/states/burger-builder';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component<any, BurgerBuilderState> {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    axios.get('ingredients.json').then((response) => {
      this.setState({ ingredients: response.data });
    });
  }

  updatePurchaseState() {
    const ingredients: Ingredients = this.state.ingredients!;

    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey as Ingredient];
      })
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchaseable: sum > 0 });
  }

  addIngredientHandler = (type: Ingredient) => {
    this.setState(
      (prevState) => {
        const ingredients = prevState.ingredients!;
        const oldCount = ingredients[type];
        const updatedIngredients = { ...ingredients };
        updatedIngredients[type] = oldCount + 1;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = prevState.totalPrice;

        return {
          totalPrice: oldPrice + priceAddition,
          ingredients: updatedIngredients,
        };
      },
      () => {
        this.updatePurchaseState();
      }
    );
  };

  purchaseHandler = () => this.setState({ purchasing: true });
  purchaseCancelHandler = () => this.setState({ purchasing: false });

  removeIngredientHandler = (type: Ingredient) => {
    this.setState(
      (prevState) => {
        const {
          ingredients,
          purchaseable,
          purchasing,
          totalPrice,
          loading,
        } = prevState;
        const oldCount = ingredients ? ingredients[type] : 0;
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
          loading,
        };
      },
      () => {
        this.updatePurchaseState();
      }
    );
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    const ingredients = this.state.ingredients!;

    for(let i of Object.keys(ingredients)) {
      queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(ingredients[i])}`);
    }

    const queryString = queryParams.join('&');
    
    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`,
    });
  };

  render() {
    let orderSummary = null;
    let burger = <Spinner />;

    if (this.state.ingredients) {
      const disabledInfo: any = {
        ...((this.state.ingredients as unknown) as object),
      };
      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] === 0;
      }

      burger = (
        <Aux>
          <Burger
            ingredients={(this.state.ingredients as unknown) as Ingredients}
          />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}
            disabled={disabledInfo}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
