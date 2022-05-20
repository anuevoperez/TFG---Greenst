import React, { useEffect, useMemo, useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import OfficeService from "../../Office/services/OfficeService";
const OfficeFilter = ({ value, setValue, city }) => {
  const service = useMemo(() => new OfficeService(), []);

  const [offices, setOffices] = useState();
  useEffect(() => {
    const fetchCities = async () => {
      const response = await service.findAll();

      const newOffices = city
        ? response.filter((office) => office.city_id === city)
        : response;
      setOffices(newOffices);
      if(newOffices.length>0){
          setValue(newOffices[0]._id)
      }
    };
    fetchCities();
  }, [service, city,setValue]);

  return (
    <FormGroup>
      <Label for="office">Oficina de recogida</Label>
      <Input
        id="office"
        value={value}
        onChange={(e) => {
          const currentValue = e.currentTarget.value;
          setValue(currentValue);
        }}
        type="select"
      >
        {offices?.map((office) => (
          <option key={office._id} value={office._id}>
            {office.locationName}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
};
export default OfficeFilter;
