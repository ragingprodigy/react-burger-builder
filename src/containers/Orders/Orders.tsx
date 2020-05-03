import axios from "@burger/axios-orders";
import Order from "@burger/components/Order/Order";
import Spinner from "@burger/components/UI/Spinner/Spinner";
import withErrorHandler from "@burger/hoc/withErrorHandler/withErrorHandler";
import { TAppState } from "@burger/interfaces/appState";
import { IOrderProps } from "@burger/interfaces/order/orderProps";
import { fetchOrders, initIngredients } from "@burger/store/actions";
import { Order as OrderModel } from "@burger/types/models/order";
import React, { Component } from "react";
import { connect } from "react-redux";

export class Orders extends Component<IOrderProps> {
  componentDidMount() {
    if (!this.props.ingredients.length) {
      this.props.initIngredients();
    }
    this.props.fetchOrders(this.props.token);
  }

  render() {
    if (this.props.error) {
      return <p>Please Sign IN</p>;
    }

    let orders = this.props.ingredients.length ? (
      <div>
        {this.props.orders.map((order: OrderModel) => (
          <Order key={order.id} ingredients={order.ingredients} />
        ))}
      </div>
    ) : (
      <Spinner />
    );

    return orders;
  }
}

const mapStateToProps = (state: TAppState) => ({
  orders: state.order.orders,
  ingredients: state.burderBuilder.ingredients,
  loading: state.order.loading,
  error: state.order.error,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchOrders: (token: string) => dispatch(fetchOrders(token)),
  initIngredients: () => dispatch(initIngredients()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
