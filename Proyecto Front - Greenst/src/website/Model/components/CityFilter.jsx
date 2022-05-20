import React, { useEffect, useMemo, useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import CityService from "../../City/services/CityService";
const CityFilter = ({ value, setValue }) => {
  const service = useMemo(() => new CityService(), []);
  const [cities, setCities] = useState();

  useEffect(() => {
    const fetchCities = async () => {
      const response = await service.findAll();
      setCities(response);
      if(response.length>0);
      setValue(response[0]._id);
    };
    fetchCities();
  }, [service,setValue]);

  return (
    <FormGroup>
      <Label for="city">Ciudad</Label>
      <Input
        id="city"
        type="select"
        value={value}
        onChange={(e) => {
          const currentValue = e.currentTarget.value;
          setValue(currentValue);

        }}
      >
        {cities?.map((city) => (
          <option key={city._id} value={city._id}>
            {city.cityName}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
};

export default CityFilter;
