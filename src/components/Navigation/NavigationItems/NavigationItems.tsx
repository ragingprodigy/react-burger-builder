import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props: any) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem active={true} link="/">
      Burger Builder
    </NavigationItem>
    <NavigationItem active={false} link="/">
     Checkout
    </NavigationItem>
  </ul>
);

export default navigationItems;