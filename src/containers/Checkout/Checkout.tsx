import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Ingredients } from '../../types/states/burger-builder';
import { CheckoutState } from './state';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

export default class Checkout extends Component<any, CheckoutState> {
  state = { ingredients: null };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients: Ingredients = {};

    query.forEach((v, k) => {
      ingredients[k] = +v;
    });

    this.setState({ ingredients });
  }

  checkoutCancelledHandler = () => this.props.history.goBack();
  checkoutContinuedHandler = () => this.props.history.replace('/checkout/contact-data');

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

    return <div>
      {summary}
      <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
    </div>;
  }
}
