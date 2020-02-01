import React from 'react';

import classes from "./Input.module.scss";

const input = (props:any) => {

  let validationError = null;
  if (props.invalid && props.touched) {
      validationError = <p className="errorMessage">Please enter a valid {' ' + props.elementConfig.type + ' '}!</p>;
  }

  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if(props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid)
  }

  switch (props.elementType) {
    case ('input'):
      inputElement =
      <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed} />;
          console.log("Input 'props.value:' ", props.value);
      break;
    case ('textarea'):
      inputElement =
      <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}  />;
      break;
      case ( 'select' ):
          inputElement = (
              <select
                  className={inputClasses.join(' ')}
                  value={props.value}
                  onChange={props.changed}>
                  {props.elementConfig.options.map((option:any) => (
                      <option key={option.value} value={option.value}>
                          {option.displayValue}
                      </option>
                  ))}
              </select>
          );
          break;
          default:
              inputElement = <input
                  className={inputClasses.join(' ')}
                  {...props.elementConfig}
                  value={props.value}
                  onChange={props.changed} />;
        }
  return (
    <div className="input">
        <label> {props.label} </label>
        {inputElement}
        {validationError}
    </div>
  );
}
export default input;
