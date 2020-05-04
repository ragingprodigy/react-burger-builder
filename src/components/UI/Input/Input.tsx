import React from 'react';
import s from './Input.module.css';
import { IInputProps } from '../../../interfaces/forms/input/inputProps';

const input = (props: IInputProps) => {
  let inputElement = null;
  const inputClasses = [s.InputElement];

  if (props.invalid && props.touched) {
    inputClasses.push(s.Invalid);
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          onChange={props.changed}
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig?.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
  }

  return (
    <div className={s.Input}>
      <label className={s.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
