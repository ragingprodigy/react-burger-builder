import React from 'react';
import classes from './Backdrop.module.css';
import { GenericHandler } from '../../../types/callbacks';

const backdrop = (props: { show: boolean; clicked: GenericHandler; }) => (
  props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;