import Model from "./Model";
import BasicModelProjection from "./projections/BasicModelProjection";
import DetailedModelProjection from "./projections/DetailedModelProjection";

export default interface ModelRepository{
    save(model:Model):Promise<void>;
    findAll(brand_id?:string):Promise<BasicModelProjection[]|null>;
    findById(id:string):Promise<DetailedModelProjection|null>;
}