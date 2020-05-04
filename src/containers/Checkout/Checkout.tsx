import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { TAppState } from '../../interfaces/appState';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { ICheckoutProps } from '../../interfaces/checkout/checkoutProps';

class Checkout extends Component<ICheckoutProps> {
  checkoutCancelledHandler = () => this.props.history.goBack();
  checkoutContinuedHandler = () =>
    this.props.history.replace('/checkout/contact-data');

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ingredients.length) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;

      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            ingredients={this.props.ingredients}
          />

          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = ({
  burgerBuilder: burderBuilder,
  order,
}: TAppState) => ({
  ingredients: burderBuilder.ingredients,
  purchased: order.purchased,
});

export default connect(mapStateToProps)(Checkout);
