import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { TAppState } from "../../interfaces/appState";
import { IOrderProps } from "../../interfaces/order/orderProps";
import { fetchOrders, initIngredients } from "../../store/actions";
import { Order as OrderModel } from "../../types/models/order";
import React, { Component } from "react";
import { connect } from "react-redux";

export class Orders extends Component<IOrderProps> {
  componentDidMount() {
    if (!this.props.ingredients.length) {
      this.props.initIngredients();
    }

    const { userId, token } = this.props;
    this.props.fetchOrders(token, userId);
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
  ingredients: state.burgerBuilder.ingredients,
  loading: state.order.loading,
  error: state.order.error,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchOrders: (token: string, userId: string) =>
    dispatch(fetchOrders(token, userId)),
  initIngredients: () => dispatch(initIngredients()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
