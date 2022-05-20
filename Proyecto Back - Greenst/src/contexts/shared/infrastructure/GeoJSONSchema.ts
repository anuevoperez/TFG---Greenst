import { prop } from "@typegoose/typegoose";
import Coordinate from "../domain/Coordinate";

enum Point{
    point="Point"
}
export default class GeoJSONSchema{
    @prop({required:true,enum:Point})
    type!:Point
    @prop({required:true, type:[Number]})
    coordinates!:number[]
}