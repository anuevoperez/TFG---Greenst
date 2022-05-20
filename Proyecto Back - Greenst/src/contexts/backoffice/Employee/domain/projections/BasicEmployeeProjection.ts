import { EmployeeRoles } from "../EmployeeRoles";

export default interface BasicEmployeeProjection{
    _id:string,
    employee_id:string,
    email:string,
    role:EmployeeRoles,
    name:string,
    lastName:string,
    enabled:boolean,
}