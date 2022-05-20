import Brand from "../../../Brand/domain/Brand";

export default interface DetailedModelProjection{
    _id:string,
    img:string;
    modelName:string,
    brand:Brand,
    price:number
}