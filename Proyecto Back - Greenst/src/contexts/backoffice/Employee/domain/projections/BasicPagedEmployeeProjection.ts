import PaginationResponse from "../../../../shared/domain/PaginationResponse";
import BasicEmployeeProjection from "./BasicEmployeeProjection";

export default interface BasicPagedEmployeeProjection
  extends PaginationResponse {
  docs: BasicEmployeeProjection[];
}
