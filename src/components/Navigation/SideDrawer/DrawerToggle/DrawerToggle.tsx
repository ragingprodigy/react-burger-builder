import React from 'react';
import classes from './DrawerToggle.module.css';
import { TEventHandler } from '../../../../interfaces/callbacks';

const drawerToggle = (props: { clicked: TEventHandler }) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;
