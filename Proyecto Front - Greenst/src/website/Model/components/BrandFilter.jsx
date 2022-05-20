import React, { useEffect, useMemo, useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";

import BrandService from "../../Brand/services/BrandService";

const BrandFilter = ({ value, setValue }) => {
  const service = useMemo(() => new BrandService(), []);
  const [brands, setBrands] = useState();

  useEffect(() => {
    const fetchBrands = async () => {
      const response = await service.findAll();
      setBrands(response);
      if (response.length) {
        setValue(response[0]._id);
      }
    };
    fetchBrands();
  }, [service, setValue]);

  return (
    <FormGroup>
      <Label for="brand">Marca</Label>
      <Input
        id="brand"
        value={value}
        onChange={(e) => {
          const currentValue = e.currentTarget.value;
          setValue(currentValue);
        }}
        type="select"
      >
        {brands?.map((brand) => (
          <option key={brand._id} value={brand._id}>
            {brand.brandName}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
};

export default BrandFilter;
