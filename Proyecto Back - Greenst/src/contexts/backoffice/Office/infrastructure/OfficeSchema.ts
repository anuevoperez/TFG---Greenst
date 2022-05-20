import { index, prop, Ref } from "@typegoose/typegoose";
import GeoJSONSchema from "../../../shared/infrastructure/GeoJSONSchema";
import { CitySchema } from "../../City/infrastructure/CitySchema";

@index({location:'2dsphere'})
export class OfficeSchema {
  @prop({ required: true, ref: () => CitySchema })
  public city!: Ref<CitySchema>;

  @prop({ required: true })
  public locationName!: string;

  @prop({ required: true })
  public postalCode!: string;

  @prop({ required: true })
  public fullLocation!: string;

  @prop({ required: true })
  public telephone!: string;

  @prop({ required: true })
  public location!: GeoJSONSchema;

  @prop({required:true})
  public status!:boolean;
}
