import Coordinate from "../../../shared/domain/Coordinate";

export default interface Office{
    _id?:string,
    city_id:string,
    locationName:string,
    postalCode:string,
    fullLocation:string,
    telephone:String,
    location: Coordinate,
    status:boolean,
}