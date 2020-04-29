import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = ({ingredients}: { ingredients: any; }) => {
  const ingredientSummary = Object.keys(ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout?</p>
    </Aux>
  );
};

export default orderSummary;