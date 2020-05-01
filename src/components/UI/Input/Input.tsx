import React from 'react';
import s from './Input.module.css';
import { InputProps } from '@burger/types/props/input';

const input = (props: InputProps) => {
  let inputElement = null;

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={s.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={s.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={s.InputElement}
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
  )
};

export default input;
