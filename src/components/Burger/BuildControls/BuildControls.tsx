import React, { Component } from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import { BuildControlsProps } from '@burger/types/props/build-controls';
import { connect } from 'react-redux';
import { TBurgerBuilderState } from '@burger/interfaces/burderBuilder/burderBuilder';

class BuildControls extends Component<BuildControlsProps> {
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
          ORDER NOW
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ ingredients }: TBurgerBuilderState) => ({ ingredients });

export default connect(mapStateToProps)(BuildControls);