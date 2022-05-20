import Coordinate from "../../../shared/domain/Coordinate";
import Office from "./Office";
import BasicOfficeProjection from "./projections/BasicOfficeProjection";
import DetailedOfficeProjection from "./projections/DetailedOfficeProjection";

export default interface OfficeRepository{
    save(office:Office):Promise<void>;
    insertMany(offices:Office[]):Promise<void>;
    findAll():Promise<BasicOfficeProjection[]|null>;
    findById(id:string):Promise<DetailedOfficeProjection|null>;
    deleteById(id:string):Promise<void>;
}