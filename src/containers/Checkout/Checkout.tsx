import CheckoutSummary from '@burger/components/Order/CheckoutSummary/CheckoutSummary';
import Spinner from '@burger/components/UI/Spinner/Spinner';
import { Ingredients } from '@burger/types/states/burger-builder';
import { CheckoutState } from '@burger/types/states/checkout';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

export default class Checkout extends Component<any, CheckoutState> {
  state = { ingredients: null, totalPrice: 0 };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients: Ingredients = {};

    query.forEach((v, k) => {
      if (k === 'totalPrice') {
        this.setState({ totalPrice: +v });
      } else {
        ingredients[k] = +v;
      }
    });

    this.setState({ ingredients });
  }

  checkoutCancelledHandler = () => this.props.history.goBack();
  checkoutContinuedHandler = () =>
    this.props.history.replace('/checkout/contact-data');

  render() {
    let summary = <Spinner />;

    if (this.state.ingredients) {
      summary = (
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.state.ingredients!}
        />
      );
    }

    return (
      <div>
        {summary}
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients!}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
