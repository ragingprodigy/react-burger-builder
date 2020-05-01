import React from 'react';
import s from './Input.module.css';
import { InputProps } from '@burger/types/props/input';

const input = (props: InputProps) => {
  let inputElement = null;

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input onChange={props.changed}
          className={s.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea onChange={props.changed}
          className={s.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select className={s.InputElement} value={props.value} onChange={props.changed}>
          {props.elementConfig!.options?.map((option) => (
            <option key={option.value} value={option.value}>{option.displayValue}</option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input onChange={props.changed}
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
