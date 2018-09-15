import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, Row, Col } from "reactstrap";

const CheckboxGroup = ({ onChange, options, header, genres }) => {
  const boxes = options.map(option => (
    <Col key={option} sm="12" className="mb-2">
      <Label checked={false} onChange={onChange} check>
        <Input
          type="checkbox"
          checked={genres.includes(option)}
          name={option}
          value={option}
        />{" "}
        {option}
      </Label>
    </Col>
  ));

  return (
    <FormGroup check>
      {header ? <h4 className="text-muted">{header}</h4> : null}
      <Row>{boxes}</Row>
    </FormGroup>
  );
};

CheckboxGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default CheckboxGroup;
