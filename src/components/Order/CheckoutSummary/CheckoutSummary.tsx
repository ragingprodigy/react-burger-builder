import React from 'react';
import Burger from '../../../components/Burger/Burger';
import Button from '../../../components/UI/Button/Button';
import s from './CheckoutSummary.module.css';
import { ICheckoutSummaryProps } from '../../../interfaces/checkoutSummary/checkoutSummaryProps';

const checkoutSummary = (props: ICheckoutSummaryProps) => (
  <div className={s.CheckoutSummary}>
    <h1>We hope it tastes well!</h1>
    <div
      style={{
        width: '100%',
        margin: 'auto',
      }}
    >
      <Burger ingredients={props.ingredients}></Burger>
    </div>
    <Button clicked={props.checkoutCancelled} buttonType="Danger">
      CANCEL
    </Button>
    <Button clicked={props.checkoutContinued} buttonType="Success">
      CONTINUE
    </Button>
  </div>
);

export default checkoutSummary;
