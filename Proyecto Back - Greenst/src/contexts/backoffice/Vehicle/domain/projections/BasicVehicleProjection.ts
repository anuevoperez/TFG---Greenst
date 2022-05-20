import { VehicleStatus } from "../VehicleStatus";
import { VehicleTypes } from "../VehicleTypes";

export default interface BasicVehicleProjection{
    _id:string;
    type:VehicleTypes;
    plate:string;
    brandName:string;
    modelName:string;
    status:VehicleStatus;
}