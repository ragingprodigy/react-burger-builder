import axios from '@burger/axios-orders';
import BuildControls from '@burger/components/Burger/BuildControls/BuildControls';
import Burger from '@burger/components/Burger/Burger';
import OrderSummary from '@burger/components/Burger/OrderSummary/OrderSummary';
import Modal from '@burger/components/UI/Modal/Modal';
import Spinner from '@burger/components/UI/Spinner/Spinner';
import Aux from '@burger/hoc/Aux/Aux';
import withErrorHandler from '@burger/hoc/withErrorHandler/withErrorHandler';
import { TBurgerBuilderState } from '@burger/interfaces/burderBuilder/burderBuilder';
import { initIngredients } from '@burger/store/actions/burgerBuilder';
import { addIngredient, removeIngredient } from '@burger/store/actions/index';
// import { Ingredient } from '@burger/types/enums/burger';
import { BurgerBuilderProps } from '@burger/types/props/burger-builder.props';
// import { BurgerBuilderAction } from '@burger/types/states/redux/burger-builder.action';
// import { BurgerBuilderState, BurgerIngredient } from '@burger/types/states/redux/burger-builder.state';
import { BurgerBuilderState as UIState } from '@burger/types/states/ui/burger-builder';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class BurgerBuilder extends Component<BurgerBuilderProps, UIState> {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.initIngredients();
  }

  get purchaseable(): boolean {
    let itemCount = 0;
    this.props.ingredients.forEach(i => itemCount += i.units);
    return itemCount > 0;
  }

  get totalPrice(): number {
    let totalPrice = 4;
    this.props.ingredients.forEach(({units, price}) => {
      return totalPrice += units * price;
    });

    return totalPrice;
  }

  purchaseHandler = () => this.setState({ purchasing: true });
  purchaseCancelHandler = () => this.setState({ purchasing: false });

  purchaseContinueHandler = () => {
    this.props.history.push('checkout');
  };

  render() {
    let orderSummary = null;
    let burger = <Spinner />;

    if (this.props.ingredients) {
      const disabledInfo: any = {};
      this.props.ingredients.forEach(({units, label}) => {
        disabledInfo[label] = units === 0;
      });

      burger = (
        <Aux>
          <Burger
            ingredients={this.props.ingredients}
          />
          <BuildControls
            ingredientAdded={(name) => this.props.onAddIngredient(name)}
            ingredientRemoved={(name) => this.props.onRemoveIngredient(name)}
            price={this.totalPrice}
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

const mapStateToProps = ({ ingredients }: TBurgerBuilderState) => ({
  ingredients,
});

const mapDispatchToProps = (
  dispatch: (...args:any) => void
) => {
  return {
    onAddIngredient: (ingredientName: string) =>
      dispatch(addIngredient(ingredientName)),
    onRemoveIngredient: (ingredientName: string) =>
      dispatch(removeIngredient(ingredientName)),
    initIngredients: () => dispatch(initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
