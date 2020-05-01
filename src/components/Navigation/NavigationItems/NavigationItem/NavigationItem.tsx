import React from 'react';
import classes from './NavigationItem.module.css';
import { Children } from '@burger/types/overrides';
import { NavLink } from 'react-router-dom';

type NIProps = {
  link: string;
  children: Children;
  exact?: boolean;
};

const navigationItem = (props: NIProps) => (
  <li className={classes.NavigationItem}>
    <NavLink to={props.link} exact={props.exact} activeClassName={classes.active}> {props.children} </NavLink>
  </li>
);

export default navigationItem;
