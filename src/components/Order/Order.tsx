import { TAppState } from '../../interfaces/appState';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Order.module.css';
import { IOrderProps } from '../../interfaces/order/orderProps';

class Order extends Component<IOrderProps> {
  get orderAmount(): number {
    let totalAmount = 4;

    this.props.ingredients.forEach(({ label, units }) => {
      const coreIng = this.props.coreIngs.find((i) => i.label === label);
      if (!coreIng) {
        totalAmount += 0;
      } else {
        totalAmount += coreIng.price * units;
      }
    });

    return totalAmount;
  }

  render() {
    const ingredientsOut = this.props.ingredients.map((ig) => {
      return (
        <span className={classes.Label} key={ig.label}>
          {ig.label} ({ig.units})
        </span>
      );
    });

    return (
      <div className={classes.Order}>
        <p>Ingredients: {ingredientsOut}</p>
        <p>
          Price: <strong>USD {this.orderAmount.toFixed(2)}</strong>
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ burgerBuilder: burderBuilder }: TAppState) => ({
  coreIngs: burderBuilder.ingredients,
});

export default connect(mapStateToProps)(Order);
