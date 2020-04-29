import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

type OrderSummaryProps = {
  ingredients: any;
  purchaseCancelled: () => void;
  purchaseContinued: () => void;
  price: number;
};

const orderSummary = ({
  ingredients,
  purchaseCancelled,
  purchaseContinued,
  price
}: OrderSummaryProps) => {
  const ingredientSummary = Object.keys(ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p><strong>Total Price: {price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button buttonType="Danger" clicked={purchaseCancelled}>
        CANCEL
      </Button>
      <Button buttonType="Success" clicked={purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;