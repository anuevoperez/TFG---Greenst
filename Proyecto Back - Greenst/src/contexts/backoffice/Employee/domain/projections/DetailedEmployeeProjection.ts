import { EmployeeRoles } from "../EmployeeRoles";

export default interface DetailedEmployeeProjection{
    _id:string,
    employee_id:string,
    city:string,
    officeLocationName:string,
    name:string,
    lastName:string,
    dni:string,
    registrationDate:Date,
    email:string,
    role:EmployeeRoles,
    enabled:boolean
}