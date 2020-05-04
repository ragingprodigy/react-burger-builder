import { FormElement, Validations } from '@burger/interfaces/forms/forms';

export const checkValidity = (value: string, rules: FormElement["validation"]) : boolean => {
    let isValid = true;

    if (!rules) {
      return isValid;
    }

    if (rules[Validations.isRequired]) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules[Validations.minLength]) {
      isValid = value.trim().length >= rules![Validations.minLength] && isValid;
    }

    if (rules[Validations.maxLength]) {
      isValid = value.trim().length <= rules[Validations.maxLength] && isValid;
    }

    if (rules[Validations.isNumeric]) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value.trim()) && isValid;
    }

    if (rules[Validations.isEmail]) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value.trim()) && isValid;
    }

    return isValid;
  }