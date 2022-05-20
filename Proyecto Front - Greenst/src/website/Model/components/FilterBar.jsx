import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import BrandFilter from "./BrandFilter";
import CityFilter from "./CityFilter";
import ModelFilter from "./ModelFilter";
import OfficeFilter from "./OfficeFilter";
import TypeFilter from "./TypeFilter";

const FilterBar = ({ value, setValue }) => {
  const [city, setCity] = useState(value.city);
  const [office, setOffice] = useState(value.office);
  const [typeV, setTypeV] = useState(value.typeV);
  const [brand, setBrand] = useState(value.brand);
  const [model, setModel] = useState(value.model);
  useEffect(() => {
    setValue({
      city,
      office,
      typeV,
      brand,
      model,
    });
  }, [city, office, typeV, brand, model,setValue]);
  return (
    <>
      <Row>
        <Col md={2}>
          <CityFilter value={city} setValue={setCity} />
        </Col>
        <Col md={4}>
          <OfficeFilter value={office} setValue={setOffice} city={city} />
        </Col>
        <Col md={2}>
          <TypeFilter value={typeV} setValue={setTypeV} />
        </Col>
        <Col md={2}>
          <BrandFilter value={brand} setValue={setBrand} />
        </Col>
        <Col md={2}>
          <ModelFilter value={model} setValue={setModel} />
        </Col>
      </Row>
    </>
  );
};

export default FilterBar;
