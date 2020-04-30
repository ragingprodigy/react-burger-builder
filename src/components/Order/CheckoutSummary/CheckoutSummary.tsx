import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import s from './CheckoutSummary.module.css';

const checkoutSummary = (props: any) => {
  return (
    <div className={s.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{
          width: '100%',
          margin: 'auto',
        }}>
        <Burger ingredients={props.ingredients}></Burger>
      </div>
      <Button clicked={() => {}} buttonType='Danger'>
        CANCEL
      </Button>
      <Button clicked={() => {}} buttonType='Success'>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
