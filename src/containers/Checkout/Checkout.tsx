import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

export default class Checkout extends Component<any, any> {
  state = {
    ingredients: {
      meat: 1,
      salad: 1,
      cheese: 1,
      bacon: 1,
    },
  };

  checkoutCancelledHandler = () => this.props.history.goBack();

  checkoutContinuedHandler = () => this.props.history.replace('/checkout/contact-data');

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.state.ingredients} />
      </div>
    );
  }
}
