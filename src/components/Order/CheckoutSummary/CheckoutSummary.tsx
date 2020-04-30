import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import s from './CheckoutSummary.module.css';
import { GenericHandler } from "../../../types/callbacks";

type CSType = {
  ingredients: any;
  checkoutCancelled: GenericHandler;
  checkoutContinued: GenericHandler;
};

const checkoutSummary = (props: CSType) => {
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
