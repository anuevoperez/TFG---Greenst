import { EmployeeRoles } from "./EmployeeRoles";

export default interface Employee{
    _id?:string,
    email:string,
    password?:string,
    role:EmployeeRoles,
    enabled:boolean,
    employee_id:string,
    name:string,
    lastName:string,
    dni:string,
    office_id:string,
    registrationDate: Date,
}