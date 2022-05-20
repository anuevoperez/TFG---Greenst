import React, { useState } from "react";
import FilterBar from "../components/FilterBar";
import ModelsGrid from "../components/ModelsGrid";

const ModelsPage = () => {
  const [filters, setFilters] = useState({
    city: "",
    brand: "",
    model: "",
    office: "",
    typeV: "",
  });
  console.log(filters);
  return (
    <>
      <FilterBar value={filters} setValue={setFilters} />
      <ModelsGrid
        type={filters.typeV}
        city_id={filters.city}
        brand_id={filters.brand}
        office_id={filters.office}
        modelName={filters.model}
      />
    </>
  );
};

export default ModelsPage;
