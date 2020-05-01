import React from 'react';
import classes from './Button.module.css';
import { GenericHandler } from '@burger/types/callbacks';
import { Children } from '@burger/types/overrides';

type BtnProps = {
  clicked: GenericHandler;
  children: Children;
  disabled?: boolean;
  buttonType: 'Success' | 'Danger';
};

const button = (props: BtnProps) => (
  <button
    disabled={props.disabled}
    className={[ classes.Button, classes[props.buttonType] ].join(' ')}
    onClick={props.clicked}
  >{props.children}</button>
);

export default button;