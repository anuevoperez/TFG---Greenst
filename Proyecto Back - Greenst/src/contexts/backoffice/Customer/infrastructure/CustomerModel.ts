import { getModelForClass } from "@typegoose/typegoose";
import { PaginateModel } from "typegoose-cursor-pagination";
import CustomerSchema from "./CustomerSchema";

export const CustomerModel= getModelForClass(CustomerSchema,{schemaOptions:{collection:"customers"}}) as PaginateModel<CustomerSchema, typeof CustomerSchema>