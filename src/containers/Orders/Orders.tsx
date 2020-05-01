import React, { Component } from 'react';
import Order from '@burger/components/Order/Order';
import axios from '@burger/axios-orders';
import withErrorHandler from '@burger/hoc/withErrorHandler/withErrorHandler';

export class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios.get('orders.json')
      .then(res => {
        const orders = Object.keys(res.data).map((key) => {
          return { ...res.data[key], id: key };
        });
        
        this.setState({ loading: false, orders });
      })
      .catch(err => this.setState({ loading: false }));
  }

  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
