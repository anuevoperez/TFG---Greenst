import ModelFilters from "./ModelFilters";
import BasicModelProjection from "./projections/BasicModelProjection";
import DetailedModelProjection from "./projections/DetailedModelProjection";

export default interface ModelRepository{
    findAll(modelFilters:ModelFilters):Promise<BasicModelProjection[]|null>;
    findById(id:string):Promise<DetailedModelProjection|null>;
}