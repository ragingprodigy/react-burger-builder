import { FormElement } from '../forms/forms';

export interface IAuthUIState {
  formIsValid: boolean;
  controls: {
    email: FormElement;
    password: FormElement;
  };
  isSignUp: boolean;
}

export type TAuthControlKey = keyof IAuthUIState['controls'];
