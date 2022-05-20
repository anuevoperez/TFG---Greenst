import { prop, Ref,plugin } from "@typegoose/typegoose";
import paginationPlugin from "typegoose-cursor-pagination";

import GeoJSONSchema from "../../../shared/infrastructure/GeoJSONSchema";
import BrandSchema from "../../Brand/infrastructure/BrandSchema";
import CustomerSchema from "../../Customer/infrastructure/CustomerSchema";
import ModelSchema from "../../Model/infrastructure/ModelSchema";
import { OfficeSchema } from "../../Office/infrastructure/OfficeSchema";
import VehicleSchema from "../../Model/infrastructure/VehicleSchema";
import { PaymentMethods } from "../domain/PaymentMethods";
import { ReservationStatus } from "../domain/ReservationStatus";

@plugin(paginationPlugin)
export default class ReservationSchema {
  @prop({ required: true, ref: () => VehicleSchema })
  public vehicle!: Ref<VehicleSchema>;

  @prop({ required: true, ref:()=>BrandSchema })
  public vehicle_brand!: Ref<BrandSchema>;
  
  @prop({required:true})
  public vehicle_brandName!:string

  @prop({ required: true, ref:()=>ModelSchema })
  public vehicle_model!: Ref<ModelSchema>;

  @prop({required:true})
  public vehicle_modelName!:string

  @prop({ required: true })
  public vehicle_plate!: string;

  @prop({ required: true, ref: () => CustomerSchema })
  public customer: Ref<CustomerSchema>;

  @prop({ required: true })
  public customer_name!: string;

  @prop({ required: true })
  public customer_lastName!: string;

  @prop({ required: true })
  public customer_dni!: string;


  @prop({ required: true, ref: () => OfficeSchema })
  public departure_office: Ref<OfficeSchema>;
  @prop({ required: true })
  public departure_office_locationName!: string;
  @prop({ required: true })
  public departure_office_location!: GeoJSONSchema;

  @prop({ required: true, ref: () => OfficeSchema })
  public arrival_office: Ref<OfficeSchema>;
  @prop({ required: true })
  public arrival_office_locationName!: string;
  @prop({ required: true })
  public arrival_office_location!: GeoJSONSchema;

  @prop({ required: true })
  public reservationTimestamp!: Date;
  @prop()
  public departureTimestamp!: Date;
  @prop()
  public arrivalTimestamp!: Date;
  @prop()
  public updated!: Date;
  

  @prop({ required: true })
  public amount!: number;
  @prop({ required: true, enum: PaymentMethods })
  public payment_method!: PaymentMethods;
  @prop({ required: true, enum: ReservationStatus })
  public status!: ReservationStatus;
}
