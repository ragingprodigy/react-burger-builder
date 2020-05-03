import CheckoutSummary from '@burger/components/Order/CheckoutSummary/CheckoutSummary';
import { TAppState } from '@burger/interfaces/appState';
import { CheckoutProps } from '@burger/types/props/checkout.props';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component<CheckoutProps> {

  checkoutCancelledHandler = () => this.props.history.goBack();
  checkoutContinuedHandler = () => this.props.history.replace('/checkout/contact-data');

  render() {
    let summary = <Redirect to='/' />;

    if (this.props.ingredients.length) {
      summary = (
        <div>
          <CheckoutSummary
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            ingredients={this.props.ingredients}
          />

          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = ({burderBuilder}: TAppState) => ({ ingredients: burderBuilder.ingredients });

export default connect(mapStateToProps)(Checkout);