import { TAppState } from "@burger/interfaces/appState";
import { IBuildControlsProps } from "@burger/interfaces/buildControls/buildControlsProps";
import React, { Component } from "react";
import { connect } from "react-redux";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

class BuildControls extends Component<IBuildControlsProps> {
  render() {
    return (
      <div className={classes.BuildControls}>
        <p>
          Current Price: <strong>{this.props.price.toFixed(2)}</strong>
        </p>
        {this.props.ingredients.map(({ label }) => (
          <BuildControl
            key={label}
            label={label}
            added={() => this.props.ingredientAdded(label)}
            removed={() => this.props.ingredientRemoved(label)}
            disabled={this.props.disabled[label]}
          />
        ))}
        <button
          onClick={this.props.ordered}
          disabled={!this.props.purchaseable}
          className={classes.OrderButton}
        >
          {this.props.isAuthenticated ? "ORDER NOW" : "SIGN UP TO ORDER"}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: TAppState) => {
  const { ingredients } = state.burgerBuilder;
  return {
    ingredients,
  };
};

export default connect(mapStateToProps)(BuildControls);
