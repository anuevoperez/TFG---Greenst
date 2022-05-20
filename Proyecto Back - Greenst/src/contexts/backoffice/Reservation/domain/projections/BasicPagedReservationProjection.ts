import PaginationResponse from "../../../../shared/domain/PaginationResponse";
import BasicReservationProjection from "./BasicReservationProjection";

export default interface BasicPagedReservationProjection extends PaginationResponse{
    docs:BasicReservationProjection[];
}