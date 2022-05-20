import Brand from "../../../Brand/domain/Brand";
import BasicModelProjection from "../../../Model/domain/projections/BasicModelProjection";
import BasicOfficeProjection from "../../../Office/domain/projections/BasicOfficeProjection";
import { VehicleStatus } from "../VehicleStatus";
import { VehicleTypes } from "../VehicleTypes";

export default interface FullVehicleProjection {
  type: VehicleTypes;
  plate: string;
  brand: Brand;
  model: BasicModelProjection;
  office: BasicOfficeProjection;
  vin:string;
  status:VehicleStatus;
  registrationDate:Date;
  lastRevision?:Date|null;
}
