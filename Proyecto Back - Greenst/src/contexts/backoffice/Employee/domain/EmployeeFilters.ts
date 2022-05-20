import { EmployeeRoles } from "./EmployeeRoles";

export default interface EmployeeFilters{
    email?:string,
    role?:EmployeeRoles
    enabled?:boolean,
    employee_id?:string,
    office_id?:string,
    name?:string,
    lastName?:string,
    dni?:string,
}