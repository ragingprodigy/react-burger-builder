import Logo from "@burger/components/Logo/Logo";
import Backdrop from "@burger/components/UI/Backdrop/Backdrop";
import Aux from "@burger/hoc/Aux/Aux";
import { ISideDrawerProps } from "@burger/interfaces/sideDrawer/sideDrawerProps";
import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";

const sideDrawer = (props: ISideDrawerProps) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop clicked={props.closed} show={props.open} />

      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </div>
    </Aux>
  );
};

export default sideDrawer;
