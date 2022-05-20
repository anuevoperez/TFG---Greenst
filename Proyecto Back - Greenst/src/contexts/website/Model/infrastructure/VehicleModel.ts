import {PaginateModel} from 'typegoose-cursor-pagination';
import { getModelForClass } from "@typegoose/typegoose";
import VehicleSchema from './VehicleSchema';

export const VehicleModel= getModelForClass(VehicleSchema,{schemaOptions:{collection:"vehicles"}}) as PaginateModel<VehicleSchema, typeof VehicleSchema> ;