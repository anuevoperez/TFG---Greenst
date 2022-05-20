import PaginationResponse from "../../../../shared/domain/PaginationResponse";
import BasicCustomerProjection from "./BasicCustomerProjection";

export default interface BasicPagedCustomerProjection extends PaginationResponse{
    docs:BasicCustomerProjection[];
}