import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import s from './ContactData.module.css';
import { ContactDataState } from './contact-data-state';

export class ContactData extends Component<any, ContactDataState> {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postCode: '',
    }
  };

  render() {
    return (
      <div className={s.ContactData}>
        <h4>Enter your COntact Data</h4>
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

          <Button buttonType="Success" clicked={() => {}}>
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
