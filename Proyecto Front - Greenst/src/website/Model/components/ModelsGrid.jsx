import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardImg,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import ModelService from "../../Model/services/ModelService";

const ModelsGrid = ({ type, city_id, office_id, brand_id, modelName }) => {
  const service = useMemo(() => new ModelService(), []);
  const [models, setModels] = useState();

  useEffect(() => {
    const fetchModels = async () => {
      const response = await service.findAll({
        type: type || "",
        city_id: city_id || "",
        office_id: office_id || "",
        brand_id: brand_id || "",
        modelName: modelName || "",
      });
      setModels(response);
    };
    fetchModels();
  }, [brand_id, city_id, modelName, office_id, service, type]);
  return (
    <>
      <CardGroup>
        {models?.map(({ _id, img, brandName, modelName, count }) => (
          <div key={_id} style={{ display: "block", width: 400, padding: 30 }}>
            <Card >
              <CardImg
                alt="Card image cap"
                src="img"
                top
                width="400px"
              />
              <CardBody>
                <CardTitle tag="h5">{brandName + " " + modelName}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Disponibles : {count}
                </CardSubtitle>
                <Button>Reservar</Button>
              </CardBody>
            </Card>
          </div>
        ))}
      </CardGroup>
    </>
  );
};

export default ModelsGrid;
