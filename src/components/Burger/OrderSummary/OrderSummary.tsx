import React, { Component } from 'react';
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../../components/UI/Button/Button";
import { OrderSummaryProps } from "../../../types/props/order-summary";

class OrderSummary extends Component<OrderSummaryProps> {
  render() {
    const ingredientSummary = this.props.ingredients.map((ingredient: any) => {
      return (
        <li key={ingredient.label}>
          <span style={{ textTransform: "capitalize" }}>{ingredient.label}</span>:{" "}
          {ingredient.units}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button buttonType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button buttonType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;