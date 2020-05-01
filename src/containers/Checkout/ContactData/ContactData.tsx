import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import s from './ContactData.module.css';
import { ContactDataProps, ContactDataState } from './props-and-state';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";

export class ContactData extends Component<ContactDataProps, ContactDataState> {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postCode: '',
    },
    loading: false,
  };

  orderHandler = (event: MouseEvent) => {
    event.preventDefault();
    
    this.setState({ loading: true });
    const { name, email, address } = this.state;
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: { name, email, address },
      deliveryMethod: 'sameday',
    };

    axios.post('/orders.json', order).then(r => {
      this.setState({ loading: false });
      this.props.history.push('/');
    }).catch(e => {
      console.log(e);
      this.setState({ loading: false });
    });
  };

  render() {
    let form = (
      <form>
        <input
          className={s.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={s.Input}
          type="email"
          name="email"
          placeholder="Your email"
        />
        <input
          className={s.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={s.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />

        <Button buttonType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
     form = <Spinner />;
    }

    return (
      <div className={s.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
