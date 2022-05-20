import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const ModelFilter = ({ value, setValue }) => {
  return (
    <FormGroup>
      <Label for="model">Modelo de Vehiculo</Label>
      <Input
        type="text"
        id="model"
        value={value}
        onChange={(e) => {
          const currentValue = e.currentTarget.value;
          setValue(currentValue);
        }}
      />
    </FormGroup>
  );
};

export default ModelFilter;
