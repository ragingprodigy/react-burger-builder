import { TAppState } from "@burger/interfaces/appState";
import { OrderProps } from "@burger/types/props/order";
import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Order.module.css";

class Order extends Component<OrderProps> {
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

const mapStateToProps = ({ burderBuilder }: TAppState) => ({
  coreIngs: burderBuilder.ingredients,
});

export default connect(mapStateToProps)(Order);
