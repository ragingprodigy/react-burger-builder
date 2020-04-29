import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.module.css';

const sideDrawer = (props: any) => {

  return (
    <div className={classes.SideDrawer}>
      <Logo />
      <NavigationItems />
    </div>
  );
};

export default sideDrawer;