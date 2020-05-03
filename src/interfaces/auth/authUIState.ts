import { FormElement } from '../forms/forms';

export interface IAuthUIState {
  formIsValid: boolean;
  controls: {
    email: FormElement;
    password: FormElement;
  };
};

export type TAuthControlKey = keyof IAuthUIState['controls'];