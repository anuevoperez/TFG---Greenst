import { VehicleStatus } from "./VehicleStatus"
import { VehicleTypes } from "./VehicleTypes"

export default interface VehicleFilters{
    type?:VehicleTypes;
    office_id?:string;
    plate?:string;
    brand_id?:string;
    modelName?:string;
    status?:VehicleStatus;
    minRegistrationDate?:Date;
    maxRegistrationDate?:Date;
    minRevisionDate?:Date;
    maxRevisionDate?:Date;
}