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
    this.props.fetchOrders();
  }

  render() {
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
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchOrders: () => dispatch(fetchOrders()),
  initIngredients: () => dispatch(initIngredients()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
