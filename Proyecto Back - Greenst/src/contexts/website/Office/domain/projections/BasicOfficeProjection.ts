import Coordinate from "../../../../shared/domain/Coordinate";

export default interface BasicOfficeProjection{
    _id:string;
    city_id?:string;
    city?:string;
    locationName:string;
    location:Coordinate;
}