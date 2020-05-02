import CheckoutSummary from '@burger/components/Order/CheckoutSummary/CheckoutSummary';
import Spinner from '@burger/components/UI/Spinner/Spinner';
import { BurgerBuilderState } from '@burger/types/states/redux/burger-builder.state';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { CheckoutProps } from '@burger/types/props/checkout.props';

class Checkout extends Component<CheckoutProps> {

  checkoutCancelledHandler = () => this.props.history.goBack();
  checkoutContinuedHandler = () => this.props.history.replace('/checkout/contact-data');

  render() {
    let summary = <Spinner />;

    if (this.props.ingredients) {
      summary = (
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.props.ingredients}
        />
      );
    }

    return (
      <div>
        {summary}
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData} />
      </div>
    );
  }
}

const mapStateToProps = ({ingredients}: BurgerBuilderState) => ({ ingredients });

export default connect(mapStateToProps)(Checkout);