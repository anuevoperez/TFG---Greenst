import { plugin, prop, Ref } from "@typegoose/typegoose";
import paginationPlugin from "typegoose-cursor-pagination";
import BrandSchema from "../../Brand/infrastructure/BrandSchema";
import { CitySchema } from "../../City/infrastructure/CitySchema";

import ModelSchema from "../../Model/infrastructure/ModelSchema";
import { OfficeSchema } from "../../Office/infrastructure/OfficeSchema";
import { VehicleTypes } from "../../Model/domain/VehicleTypes";
import { VehicleStatus } from "../../../backoffice/Vehicle/domain/VehicleStatus";

@plugin(paginationPlugin)
export default class VehicleSchema {
  @prop({ required: true, enum: VehicleTypes })
  public type!: VehicleTypes;

  @prop({ required: true })
  public plate!: string;

  @prop({ required: true, ref: () => CitySchema })
  public city!: Ref<CitySchema>;

  @prop({ required: true, ref: () => OfficeSchema })
  public office!: Ref<OfficeSchema>;

  @prop({ required: true, ref: () => ModelSchema })
  public v_model!: Ref<ModelSchema>;

  @prop({ required: true, ref: () => BrandSchema })
  public brand!: Ref<BrandSchema>;

  @prop({ required: true })
  public brandName!: string;

  @prop({ required: true })
  public modelName!: string;

  @prop({ required: true })
  public vin!: string;

  @prop({ required: true, enum:VehicleStatus })
  public status!: VehicleStatus;

  @prop({ required: true })
  public registrationDate!: Date;

  @prop()
  public lastRevision!: Date;
}
