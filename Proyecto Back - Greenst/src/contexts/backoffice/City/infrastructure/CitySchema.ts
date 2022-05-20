import { plugin, prop, Ref } from "@typegoose/typegoose";
import paginationPlugin from 'typegoose-cursor-pagination';

export class CitySchema{
    @prop({required:true})
    public cityName!:string;
}