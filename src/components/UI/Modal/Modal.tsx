import React from 'react';
import classes from './Modal.module.css';

const modal = (props: { children?: React.ReactNode; }) => (
  <div className={classes.Modal}>
    {props.children}
  </div>
);

export default modal;
