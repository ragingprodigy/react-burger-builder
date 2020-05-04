import React from 'react';
import classes from './DrawerToggle.module.css';
import { GenericHandler } from '../../../../interfaces/callbacks';

const drawerToggle = (props: { clicked: GenericHandler }) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;
