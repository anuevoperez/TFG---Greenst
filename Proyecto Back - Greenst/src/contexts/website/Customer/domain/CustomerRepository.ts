import Customer from "./Customer";

import DetailedCustomerProjection from "./projections/DetailedCustomerProjection";

export default interface CustomerRepository{
    save(customer:Customer):Promise<void>;
    findById(id:string):Promise<DetailedCustomerProjection|null>;
}