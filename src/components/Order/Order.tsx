import React from 'react';
import classes from './Order.module.css';
import { OrderProps } from '@burger/types/props/order';

const order = (props: OrderProps) => {
  const ingredients = Object.keys(props.ingredients).map(name => {
    return {
      name,
      amount: props.ingredients[name],
    }
  });

  const ingredientsOut = ingredients.map(ig => {
    return <span
      style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #CCC', padding: '5px' }}
      key={ig.name}>{ig.name} ({ig.amount})</span>
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOut}</p>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
