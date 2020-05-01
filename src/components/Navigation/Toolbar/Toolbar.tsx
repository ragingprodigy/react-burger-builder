import React from 'react';
import { ToolbarProps } from '@burger/types/props/toolbar';
import Logo from '@burger/components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.module.css';

const toolbar = (props: ToolbarProps) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.openDrawer} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
