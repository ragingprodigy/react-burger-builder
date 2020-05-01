import React from 'react';
import classes from './NavigationItem.module.css';
import { Children } from '@burger/types/overrides';
import { NavLink } from 'react-router-dom';

type NIProps = {
  link: string;
  active: boolean;
  children: Children;
};

const navigationItem = (props: NIProps) => (
  <li className={classes.NavigationItem}>
    <NavLink to={props.link}>
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
