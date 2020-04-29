import React from 'react';
import classes from './Button.module.css';

type BtnProps = {
  clicked: () => void | undefined;
  children: React.ReactNode;
  buttonType: 'Success' | 'Danger';
};

const button = (props: BtnProps) => (
  <button
    className={[ classes.Button, classes[props.buttonType] ].join(' ')}
    onClick={props.clicked}
  >{props.children}</button>
);

export default button;