import PaginationResponse from "../../../../shared/domain/PaginationResponse";
import BasicVehicleProjection from "./BasicVehicleProjection";

export default interface BasicPagedVehicleProjection extends PaginationResponse{
    docs:BasicVehicleProjection[];
}