import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import { GenericHandler } from '../../../types/callbacks';

const toolbar = (props: { openDrawer: GenericHandler; }) => (
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
