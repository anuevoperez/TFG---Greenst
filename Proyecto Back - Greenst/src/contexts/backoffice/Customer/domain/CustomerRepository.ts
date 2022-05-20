import Pagination from "../../../shared/domain/Pagination";
import Customer from "./Customer";
import CustomerFilters from "./CustomerFilters";
import BasicPagedCustomerProjection from "./projections/BasicPagedCustomerProjection";
import DetailedCustomerProjection from "./projections/DetailedCustomerProjection";

export default interface CustomerRepository{
    save(customer:Customer):Promise<void>;
    insertMany(customers:Customer[]):Promise<void>;
    findById(id:string):Promise<DetailedCustomerProjection|null>;
    findAll(filter:CustomerFilters,pagination:Pagination):Promise<BasicPagedCustomerProjection|null>;
}