import React from 'react';
import burgerLogo from '@burger/assets/images/logo.png';
import classes from './Logo.module.css';

const logo = (props: any) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="Burger Builder" />
  </div>
);

export default logo;