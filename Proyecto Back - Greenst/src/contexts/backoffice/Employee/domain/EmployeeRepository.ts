import Pagination from "../../../shared/domain/Pagination";
import Employee from "./Employee";
import EmployeeFilters from "./EmployeeFilters";
import BasicPagedEmployeeProjection from "./projections/BasicPagedEmployeeProjection";
import DetailedEmployeeProjection from "./projections/DetailedEmployeeProjection";

export default interface EmployeeRepository{
    save(employee:Employee):Promise<void>;
    insertMany(employees:Employee[]):Promise<void>;
    findAll(filter:EmployeeFilters,pagination:Pagination):Promise<BasicPagedEmployeeProjection|null>
    findById(id:string):Promise<DetailedEmployeeProjection|null>;
}