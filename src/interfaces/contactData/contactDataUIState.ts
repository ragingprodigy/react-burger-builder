import { FormElement } from '../forms/forms';

export interface IContactDataUIState {
  formIsValid: boolean;
  orderForm: {
    [ElementNames: string]: FormElement;
  };
}

export enum ElementNames {
  name = 'name',
  email = 'email',
  street = 'street',
  postCode = 'postCode',
  country = 'country',
  deliveryMethod = 'deliveryMethod',
}
