import axios from '@burger/axios-orders';
import BuildControls from '@burger/components/Burger/BuildControls/BuildControls';
import Burger from '@burger/components/Burger/Burger';
import OrderSummary from '@burger/components/Burger/OrderSummary/OrderSummary';
import Modal from '@burger/components/UI/Modal/Modal';
import Spinner from '@burger/components/UI/Spinner/Spinner';
import Aux from '@burger/hoc/Aux/Aux';
import withErrorHandler from '@burger/hoc/withErrorHandler/withErrorHandler';
import { addIngredient, removeIngredient } from '@burger/store/actions/index';
import { Ingredient } from '@burger/types/enums/burger';
import { BurgerBuilderProps } from '@burger/types/props/burger-builder.props';
import { BurgerBuilderAction } from '@burger/types/states/redux/burger-builder.action';
import { BurgerBuilderState } from '@burger/types/states/redux/burger-builder.state';
import { BurgerBuilderState as UIState, Ingredients } from '@burger/types/states/ui/burger-builder';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class BurgerBuilder extends Component<BurgerBuilderProps, UIState> {
  state = {
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    // axios
    //   .get('ingredients.json')
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((e) => console.log(e));
  }

  get purchaseable(): boolean {
    const ingredients: Ingredients = this.props.ingredients;

    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey as Ingredient];
      })
      .reduce((sum, el) => sum + el, 0);
    
    return sum > 0;
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
      const disabledInfo: any = {
        ...((this.props.ingredients as unknown) as object),
      };
      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] === 0;
      }

      burger = (
        <Aux>
          <Burger
            ingredients={(this.props.ingredients as unknown) as Ingredients}
          />
          <BuildControls
            ingredientAdded={(name) => this.props.onAddIngredient(name)}
            ingredientRemoved={(name) => this.props.onRemoveIngredient(name)}
            price={this.props.totalPrice}
            purchaseable={this.purchaseable}
            ordered={this.purchaseHandler}
            disabled={disabledInfo}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
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

const mapStateToProps = ({ ingredients, totalPrice }: BurgerBuilderState) => ({
  ingredients,
  totalPrice,
});

const mapDispatchToProps = (
  dispatch: (action: BurgerBuilderAction) => void
) => {
  return {
    onAddIngredient: (ingredientName: any) => dispatch(addIngredient(ingredientName)),
    onRemoveIngredient: (ingredientName: any) => dispatch(removeIngredient(ingredientName)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
