import { VehicleTypes } from "./VehicleTypes";

export default interface ModelFilters{
    type?: VehicleTypes,
    city_id?:string,
    office_id?:string,
    brand_id?:string,
    modelName?:string,
}