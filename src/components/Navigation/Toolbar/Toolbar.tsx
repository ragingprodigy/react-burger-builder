import Logo from "@burger/components/Logo/Logo";
import { IToolbarProps } from "@burger/interfaces/toolbar/toolbarProps";
import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import classes from "./Toolbar.module.css";

const toolbar = (props: IToolbarProps) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.openDrawer} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuthenticated} />
    </nav>
  </header>
);

export default toolbar;
