import React, { ReactNode } from 'react';
import classes from './Button.module.css';
import { GenericHandler } from '../../../interfaces/callbacks';

type BtnProps = {
  clicked: GenericHandler;
  children?: ReactNode;
  disabled?: boolean;
  buttonType: 'Success' | 'Danger';
};

const button = (props: BtnProps) => (
  <button
    type="button"
    disabled={props.disabled}
    className={[classes.Button, classes[props.buttonType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
