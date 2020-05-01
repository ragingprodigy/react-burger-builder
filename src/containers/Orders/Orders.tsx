import React, { Component } from 'react';
import Order from '@burger/components/Order/Order';
import axios from '@burger/axios-orders';
import withErrorHandler from '@burger/hoc/withErrorHandler/withErrorHandler';
import { OrdersState } from '@burger/types/states/orders';
import { Order as OrderModel } from '@burger/types/models/order';

export class Orders extends Component<any, OrdersState> {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios.get('orders.json')
      .then(res => {
        const orders = Object.keys(res.data).map((key) => {
          return { ...res.data[key], id: key } as OrderModel;
        });
        
        this.setState({ loading: false, orders });
      })
      .catch(err => this.setState({ loading: false }));
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order: OrderModel) => <Order key={order.id} ingredients={order.ingredients} price={order.price} />)}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
