import { prop, Ref } from "@typegoose/typegoose";
import BrandSchema from "../../Brand/infrastructure/BrandSchema";
import VehicleSchema from "../../Vehicle/infrastructure/VehicleSchema";

export default class ModelSchema{
    @prop({required:true, ref:()=>BrandSchema})
    public brand:Ref<BrandSchema>

    @prop({required:true})
    public img!:string;

    @prop({required:true})
    public modelName!:string;

    @prop({required:true})
    public price!:number;
}