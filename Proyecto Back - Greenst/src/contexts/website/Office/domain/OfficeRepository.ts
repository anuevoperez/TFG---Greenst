
import BasicOfficeProjection from "./projections/BasicOfficeProjection";

export default interface OfficeRepository{
    findAll():Promise<BasicOfficeProjection[]|null>;
}