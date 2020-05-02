import React from 'react';
import { CheckoutSummaryProps } from '@burger/types/props/checkout-summary';
import Burger from "@burger/components/Burger/Burger";
import Button from '@burger/components/UI/Button/Button';
import s from './CheckoutSummary.module.css';

const checkoutSummary = (props: CheckoutSummaryProps) => {
  return (
    <div className={s.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{
          width: '100%',
          margin: 'auto',
        }}>
        <Burger ingredients={props.ingredients}></Burger>
      </div>
      <Button clicked={props.checkoutCancelled} buttonType='Danger'>
        CANCEL
      </Button>
      <Button clicked={props.checkoutContinued} buttonType='Success'>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
