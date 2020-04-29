import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import Burger from './components/Burger/Burger';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Burger />
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
