import { INavItemsProps } from '../../../interfaces/navigationItems/navigationsItemsProps';
import React, { Fragment } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props: INavItemsProps) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated ? (
      <Fragment>
        <NavigationItem link="orders">Orders</NavigationItem>
        <NavigationItem link="logout">Logout</NavigationItem>
      </Fragment>
    ) : (
      <NavigationItem link="auth">Authenticate</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
