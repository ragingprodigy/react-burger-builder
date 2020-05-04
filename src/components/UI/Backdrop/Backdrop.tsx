import React from 'react';
import classes from './Backdrop.module.css';
import { TEventHandler } from '../../../interfaces/callbacks';

const backdrop = (props: { show: boolean; clicked: TEventHandler }) =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;

export default backdrop;
