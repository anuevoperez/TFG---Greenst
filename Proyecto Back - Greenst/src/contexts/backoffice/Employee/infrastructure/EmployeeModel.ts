import { getModelForClass } from "@typegoose/typegoose";
import EmployeeSchema from "./EmployeeSchema";
import { PaginateModel } from "typegoose-cursor-pagination";

export const EmployeeModel = getModelForClass(EmployeeSchema,{schemaOptions:{collection:"employees"}}) as PaginateModel<EmployeeSchema, typeof EmployeeSchema> ;