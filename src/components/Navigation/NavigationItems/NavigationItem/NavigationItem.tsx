import React from 'react';
import classes from './NavigationItem.module.css';

type NIProps = {
  link: string;
  active: boolean;
  children: any;
};

const navigationItem = (props: NIProps) => (
  <li className={classes.NavigationItem}>
    <a href={props.link} className={
      props.active ? classes.active : ''
    }>{props.children}</a>
  </li>
);

export default navigationItem;
