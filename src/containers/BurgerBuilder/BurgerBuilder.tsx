import axios from "../../axios-orders";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Aux/Aux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { TAppState } from "../../interfaces/appState";
import { TAuthAction } from "../../interfaces/auth/authAction";
import { TBurgerBuilderAction } from "../../interfaces/burderBuilder/burgerBuilderAction";
import { IBurgerBuilderProps } from "../../interfaces/burderBuilder/burgerBuilderProps";
import { TOrderAction } from "../../interfaces/orders/orderAction";
import { addIngredient, initIngredients, purchaseInit, removeIngredient, setAuthRedirectPath } from "../../store/actions";
import React, { Component } from "react";
import { connect } from "react-redux";

interface UIState {
  purchasing: boolean;
}

export class BurgerBuilder extends Component<IBurgerBuilderProps, UIState> {
  state = {
    purchasing: false,
  };

  static defaultProps: IBurgerBuilderProps = {
    ingredients: [],
    isAuthenticated: false,
    buildingBurger: false,
    error: false,
    initIngredients: () => null,
    onAddIngredient: () => ({} as TBurgerBuilderAction),
    onRemoveIngredient: () => ({} as TBurgerBuilderAction),
    onInitPurchase: () => ({} as TOrderAction),
    onSetAuthRedirectPath: () => ({} as TAuthAction),
    history: { push: () => null },
  };

  componentDidMount() {
    if (!this.props.ingredients.length || this.props.buildingBurger) {
      this.props.initIngredients();
    }
  }

  get purchaseable(): boolean {
    let itemCount = 0;
    this.props.ingredients.forEach((i) => (itemCount += i.units));
    return itemCount > 0;
  }

  get totalPrice(): number {
    let totalPrice = 4;
    this.props.ingredients.forEach(({ units, price }) => {
      return (totalPrice += units * price);
    });

    return totalPrice;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("checkout");
      this.props.history.push("auth");
    }
  };
  purchaseCancelHandler = () => this.setState({ purchasing: false });

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("checkout");
  };

  render() {
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    const disabledInfo: any = {};
    this.props.ingredients.forEach(({ units, label }) => {
      disabledInfo[label] = units === 0;
    });

    if (this.props.ingredients.length && !this.props.error) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={(name) => this.props.onAddIngredient(name)}
            ingredientRemoved={(name) => this.props.onRemoveIngredient(name)}
            price={this.totalPrice}
            isAuthenticated={this.props.isAuthenticated}
            purchaseable={this.purchaseable}
            ordered={this.purchaseHandler}
            disabled={disabledInfo}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
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

const mapStateToProps = (state: TAppState): Partial<IBurgerBuilderProps> => {
  const { ingredients, error } = state.burgerBuilder;
  return {
    ingredients,
    error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.buildingBurger,
  };
};

const mapDispatchToProps = (
  dispatch: (...args: any) => any
): Partial<IBurgerBuilderProps> => {
  return {
    onAddIngredient: (ingredientName: string) =>
      dispatch(addIngredient(ingredientName)),
    onRemoveIngredient: (ingredientName: string) =>
      dispatch(removeIngredient(ingredientName)),
    initIngredients: () => dispatch(initIngredients()),
    onInitPurchase: () => dispatch(purchaseInit()),
    onSetAuthRedirectPath: (path: string) =>
      dispatch(setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
