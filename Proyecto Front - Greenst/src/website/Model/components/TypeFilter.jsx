import React, { useEffect } from "react";
import { FormGroup, Input, Label } from "reactstrap";
const TypeFilter = ({ value, setValue }) => {
  useEffect(
      ()=>{
          setValue("coche");
      },
      [setValue]
  )
  return (
    <FormGroup>
      <Label for="type">Tipo de Vehículo</Label>
      <Input
        id="type"
        value={value}
        onChange={(e) => {
          const currentValue = e.currentTarget.value;
          setValue(currentValue);
        }}
        type="select"
      >
        <option value="coche">Coche</option>
        <option value="moto">Moto</option>
        <option value="furgoneta">Furgoneta</option>
      </Input>
    </FormGroup>
  );
};

export default TypeFilter;
