import React from 'react';
import classes from './Toolbar.module.css';

const toolbar = (props: any) => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <div>LOGO</div>
    <nav>
      ...
    </nav>
  </header>
);

export default toolbar;