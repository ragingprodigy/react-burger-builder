import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Layout from "./hoc/Layout/Layout";
import { IAppProps } from "./interfaces/appProps";
import { TAppState } from "./interfaces/appState";
import { checkAuthState } from "./store/actions";

class App extends Component<IAppProps> {
  componentDidMount() {
    this.props.checkAuthState();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state: TAppState) => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch: any) => ({
  checkAuthState: () => dispatch(checkAuthState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
