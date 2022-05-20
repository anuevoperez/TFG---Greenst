import { prop } from "@typegoose/typegoose";

export default class BrandSchema{
    @prop({required:true})
    public img!:string
    
    @prop({required:true})
    public brandName!:string
}