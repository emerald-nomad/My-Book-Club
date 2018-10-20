import React from "react";
import { FormGroup, Input } from "reactstrap";
import isEmpty from "../../validation/is-empty";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  classes
}) => {
  return (
    <FormGroup className={classes}>
      <Input
        type={type}
        className="form-control form-control-lg"
        invalid={!isEmpty(error)}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error ? <div className="invalid-feedback">{error}</div> : null}
      {info ? <small className="form-text text-muted">{info}</small> : null}
    </FormGroup>
  );
};

export default TextFieldGroup;
