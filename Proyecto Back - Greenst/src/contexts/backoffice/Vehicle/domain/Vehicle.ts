import { VehicleStatus } from "./VehicleStatus";
import { VehicleTypes } from "./VehicleTypes";

export default interface Vehicle {
  _id?: string,
  type: VehicleTypes,
  plate: string,
  office_id:string,
  model_id: string,
  vin: string,
  status: VehicleStatus,
  registrationDate: Date,
  lastRevision?: Date|null,
}
