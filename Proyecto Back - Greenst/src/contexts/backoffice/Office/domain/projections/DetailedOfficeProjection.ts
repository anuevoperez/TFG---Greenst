import Coordinate from "../../../../shared/domain/Coordinate";
import { EmployeeRoles } from "../../../Employee/domain/EmployeeRoles";
import { VehicleStatus } from "../../../Vehicle/domain/VehicleStatus";


export default interface DetailedOfficeProjection{
    city:string;
    locationName:string;
    postalCode:string;
    fullLocation:string;
    telephone:string;
    location:Coordinate;
    status:boolean;
}