import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
import { TAppState } from '../../interfaces/appState';
import { ILayoutProps } from '../../interfaces/layout/layoutProps';
import { ILayoutUIState } from '../../interfaces/layout/layoutUIState';

class Layout extends Component<ILayoutProps, ILayoutUIState> {
  state: ILayoutUIState = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => this.setState({ showSideDrawer: false });

  sideDrawerToggleHandler = () =>
    this.setState((prevState) => ({
      showSideDrawer: !prevState.showSideDrawer,
    }));

  render() {
    return (
      <Aux>
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          openDrawer={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state: TAppState) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
