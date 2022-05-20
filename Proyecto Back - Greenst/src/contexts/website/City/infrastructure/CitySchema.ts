import { prop } from "@typegoose/typegoose";

export class CitySchema{
    @prop({required:true})
    public cityName!:string;
}