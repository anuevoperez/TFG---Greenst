import Pagination from "../../../shared/domain/Pagination";
import BasicPagedVehicleProjection from "./projections/BasicPagedVehicleProjection";
import FullVehicleProjection from "./projections/FullVehicleProjection";
import Vehicle from "./Vehicle";
import VehicleFilters from "./VehicleFilters";

export default interface VehicleRepository {
  save(vehicle: Vehicle): Promise<void>;
  insertMany(vehicles: Vehicle[]): Promise<void>;
  findAll(
    filter: VehicleFilters,
    pagination: Pagination
  ): Promise<BasicPagedVehicleProjection>;
  findById(id:string):Promise<FullVehicleProjection|null>;
  deleteById(id:string):Promise<void>;
}
