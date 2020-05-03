import { FormElement } from '@burger/interfaces/forms/forms';

export type ContactDataState = {
  formIsValid: boolean;
  orderForm?: {
    [ElementNames: string]: FormElement;
  };
};

export enum ElementNames { 
  name = 'name',
  email = 'email',
  street = 'street',
  postCode = 'postCode',
  country = 'country',
  deliveryMethod = 'deliveryMethod',
};
